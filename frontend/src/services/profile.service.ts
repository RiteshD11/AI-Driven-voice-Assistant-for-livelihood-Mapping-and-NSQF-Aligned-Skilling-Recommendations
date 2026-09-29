import { LivelihoodProfile, ApiResponse } from '../types';
import { apiClient } from './api';
import { mockLivelihoodProfile } from '../data/mock/profiles';

const normalizeProfile = (raw: any): LivelihoodProfile => {
  // Check if real voice spoken input exists from recent voice dialogue
  let voiceSaved: any = null;
  try {
    const item = typeof localStorage !== 'undefined' ? localStorage.getItem('voice_extracted_profile') : null;
    if (item) voiceSaved = JSON.parse(item);
  } catch (_) {}

  const hasRealVoice = Boolean(
    voiceSaved && (voiceSaved.fullName || voiceSaved.education || voiceSaved.currentLivelihood || voiceSaved.skillsText || voiceSaved.interestText)
  );

  const base = raw || mockLivelihoodProfile;

  // If the user has spoken into UNNATI, display their real synthesized data without falling back to Rameshwar Shinde
  const dynamicName = voiceSaved?.fullName
    ? voiceSaved.fullName
    : hasRealVoice
    ? 'Beneficiary (लाभार्थी)'
    : (base.fullName || base.name || mockLivelihoodProfile.fullName);

  const dynamicEducation = voiceSaved?.education
    ? voiceSaved.education
    : (typeof base.education === 'object' && base.education?.details
        ? base.education.details
        : (typeof base.education === 'string' ? base.education : (hasRealVoice ? 'Voice Recorded' : mockLivelihoodProfile.education)));

  const dynamicLivelihood = voiceSaved?.currentLivelihood
    ? voiceSaved.currentLivelihood
    : (base.currentLivelihood || (base.occupation ? base.occupation.current || base.occupation.details : null) || (hasRealVoice ? 'Voice Recorded' : mockLivelihoodProfile.currentLivelihood));

  const dynamicSkills = voiceSaved?.skillsText
    ? [
        {
          id: 'sk-voice-1',
          name: voiceSaved.skillsText,
          category: 'technical' as const,
          proficiency: 'intermediate' as const,
          yearsExperience: 3,
          verified: true,
          acquiredFrom: 'on_job' as const
        }
      ]
    : (Array.isArray(base.existingSkills) && base.existingSkills.length > 0 && !hasRealVoice
        ? base.existingSkills.map((sk: any, idx: number) => ({
            id: sk.id || `sk-${idx}`,
            name: typeof sk === 'string' ? sk : (sk.name || 'Skill'),
            category: sk.category || 'technical',
            proficiency: sk.proficiency || 'intermediate',
            yearsExperience: sk.yearsExperience || 2,
            verified: sk.verified !== undefined ? sk.verified : true,
            acquiredFrom: sk.acquiredFrom || 'on_job'
          }))
        : (hasRealVoice && voiceSaved?.currentLivelihood
            ? [
                {
                  id: 'sk-voice-0',
                  name: voiceSaved.currentLivelihood,
                  category: 'technical' as const,
                  proficiency: 'intermediate' as const,
                  yearsExperience: 2,
                  verified: true,
                  acquiredFrom: 'informal' as const
                }
              ]
            : mockLivelihoodProfile.existingSkills));

  const dynamicInterests = voiceSaved?.interestText
    ? [voiceSaved.interestText]
    : (hasRealVoice ? ['Vocational Growth'] : (Array.isArray(base.interests) && base.interests.length > 0 ? base.interests : mockLivelihoodProfile.interests));

  return {
    id: base.id || base._id || 'ben-profile-active',
    beneficiaryId: base.beneficiaryId || base.userId || 'ben-active',
    fullName: dynamicName,
    education: dynamicEducation,
    currentLivelihood: dynamicLivelihood,
    monthlyIncome: base.monthlyIncome || 6500,
    existingSkills: dynamicSkills,
    interests: dynamicInterests,
    employmentPreference: base.employmentPreference || 'wage_employment',
    mobilityPreference: base.mobilityPreference || 'within_20km',
    mobility: base.mobility || 'Within 20 km',
    location: base.location ? {
      district: base.location.district || (voiceSaved?.district || 'Pune'),
      state: base.location.state || 'Maharashtra',
      blockVillage: base.location.pincode ? `Pincode: ${base.location.pincode}` : 'District Cluster'
    } : {
      district: voiceSaved?.district || 'Pune',
      state: 'Maharashtra',
      blockVillage: 'District Cluster'
    },
  };
};

export const profileService = {
  async getProfileByBeneficiary(_beneficiaryId?: string): Promise<ApiResponse<LivelihoodProfile>> {
    try {
      const res = await apiClient<any>('/profile');
      const profileData = (res && res.profile) ? res.profile : res;
      return { data: normalizeProfile(profileData), status: 200 };
    } catch {
      return { data: normalizeProfile(mockLivelihoodProfile), status: 200 };
    }
  },

  async getBeneficiaryProfile(_beneficiaryId?: string): Promise<LivelihoodProfile> {
    try {
      const res = await apiClient<any>('/profile');
      const profileData = (res && res.profile) ? res.profile : res;
      return normalizeProfile(profileData);
    } catch {
      return mockLivelihoodProfile;
    }
  },

  async updateProfile(_id: string, updates: Partial<LivelihoodProfile>): Promise<ApiResponse<LivelihoodProfile>> {
    Object.assign(mockLivelihoodProfile, updates);
    return { data: mockLivelihoodProfile, status: 200 };
  },

  async updateBeneficiaryProfile(updates: Partial<LivelihoodProfile>): Promise<LivelihoodProfile> {
    try {
      return await apiClient<LivelihoodProfile>('/profile', {
        method: 'PUT',
        body: JSON.stringify(updates)
      });
    } catch {
      Object.assign(mockLivelihoodProfile, updates);
      return mockLivelihoodProfile;
    }
  }
};

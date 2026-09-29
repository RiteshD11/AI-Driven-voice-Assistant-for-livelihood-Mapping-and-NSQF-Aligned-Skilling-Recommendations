import { LivelihoodProfile } from '../../types';

export const mockLivelihoodProfile: LivelihoodProfile = {
  id: 'prof-ben-001',
  beneficiaryId: 'ben-001',
  fullName: 'Rameshwar Shinde (रामेश्वर शिंदे)',
  education: '10th Pass (SSC Certified)',
  currentLivelihood: 'Agriculture & Informal Electrical Repair',
  monthlyIncome: 6500,
  existingSkills: [
    {
      id: 'sk-1',
      name: 'Basic Electrical Work',
      category: 'technical',
      proficiency: 'intermediate',
      yearsExperience: 2,
      verified: true,
      acquiredFrom: 'on_job'
    },
    {
      id: 'sk-2',
      name: 'Equipment Handling',
      category: 'technical',
      proficiency: 'intermediate',
      yearsExperience: 3,
      verified: true,
      acquiredFrom: 'informal'
    },
    {
      id: 'sk-3',
      name: 'Farm Machinery Operation',
      category: 'agricultural',
      proficiency: 'intermediate',
      yearsExperience: 4,
      verified: false,
      acquiredFrom: 'hereditary'
    },
    {
      id: 'sk-4',
      name: 'Smartphone & UPI Digital Tools',
      category: 'digital',
      proficiency: 'beginner',
      yearsExperience: 1,
      verified: true,
      acquiredFrom: 'on_job'
    }
  ],
  interests: [
    'Machines & Mechanical Systems',
    'Solar Photovoltaic & Clean Energy',
    'Electrical Installation & Troubleshooting',
    'Agricultural Solar Pumps'
  ],
  employmentPreference: 'wage_employment',
  mobilityPreference: 'within_20km',
  location: {
    district: 'Pune',
    state: 'Maharashtra',
    blockVillage: 'Haveli Block, Pune Peri-Urban'
  },
  completenessScore: 88,
  aiConfidenceScore: 94,
  profiledAt: '2026-03-29T10:05:00Z'
};

import { Beneficiary, ApiResponse } from '../types';
import { apiClient } from './api';
import { activeBeneficiary, mockBeneficiaries } from '../data/mock/beneficiaries';

export const beneficiaryService = {
  async getProfile(id?: string): Promise<ApiResponse<Beneficiary>> {
    let voiceSaved: any = null;
    try {
      const item = typeof localStorage !== 'undefined' ? localStorage.getItem('voice_extracted_profile') : null;
      if (item) voiceSaved = JSON.parse(item);
    } catch (_) {}

    const hasRealVoice = Boolean(
      voiceSaved && (voiceSaved.fullName || voiceSaved.education || voiceSaved.currentLivelihood || voiceSaved.skillsText || voiceSaved.interestText)
    );

    const benBase = (id ? mockBeneficiaries.find(b => b.id === id) : null) || activeBeneficiary;
    const dynamicBen: Beneficiary = {
      ...benBase,
      name: voiceSaved?.fullName ? voiceSaved.fullName : (hasRealVoice ? 'Beneficiary (लाभार्थी)' : benBase.name),
      district: voiceSaved?.district || benBase.district,
    };

    return { data: dynamicBen, status: 200 };
  },

  async getActiveBeneficiary(): Promise<Beneficiary> {
    try {
      return await apiClient<Beneficiary>('/beneficiary/active');
    } catch {
      return activeBeneficiary;
    }
  },

  async getBeneficiaryById(id: string): Promise<Beneficiary | undefined> {
    try {
      return await apiClient<Beneficiary>(`/beneficiary/${id}`);
    } catch {
      return mockBeneficiaries.find(b => b.id === id) || activeBeneficiary;
    }
  },

  async getAllBeneficiaries(): Promise<Beneficiary[]> {
    try {
      return await apiClient<Beneficiary[]>('/beneficiary/list');
    } catch {
      return mockBeneficiaries;
    }
  },

  async updateBeneficiary(id: string, updates: Partial<Beneficiary>): Promise<Beneficiary> {
    try {
      return await apiClient<Beneficiary>(`/beneficiary/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      });
    } catch {
      Object.assign(activeBeneficiary, updates);
      return activeBeneficiary;
    }
  }
};

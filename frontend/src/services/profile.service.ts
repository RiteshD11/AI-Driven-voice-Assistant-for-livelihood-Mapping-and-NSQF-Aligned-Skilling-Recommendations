import { LivelihoodProfile, ApiResponse } from '../types';
import { apiClient } from './api';
import { mockLivelihoodProfile } from '../data/mock/profiles';

export const profileService = {
  async getProfileByBeneficiary(_beneficiaryId?: string): Promise<ApiResponse<LivelihoodProfile>> {
    try {
      const res = await apiClient<LivelihoodProfile>('/profile');
      return { data: res, status: 200 };
    } catch {
      return { data: mockLivelihoodProfile, status: 200 };
    }
  },

  async getBeneficiaryProfile(_beneficiaryId?: string): Promise<LivelihoodProfile> {
    try {
      return await apiClient<LivelihoodProfile>('/profile');
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

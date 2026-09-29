/**
 * Kaushal Saathi - Admin Service Layer
 * SIH26097: Livelihood Intelligence for PM-AJAY Administrators
 */

import { apiClient } from './api';
import {
  AdminOverview,
  Beneficiary,
  RegionalSkillData,
  TrainingDemandData,
  OutcomeAnalytics,
  SkillGapAnalytics,
  ApiResponse,
} from '../types';
import {
  mockAdminOverview,
  mockSkillGapAnalytics,
  mockTrainingDemandData,
  mockRegionalSkillData,
  mockOutcomeAnalytics,
} from '../data/mock/admin';
import { mockBeneficiaries } from '../data/mock/beneficiaries';

class AdminService {
  /**
   * Fetches top-level system stats and pipeline metrics
   */
  async getOverview(): Promise<ApiResponse<AdminOverview>> {
    return apiClient.get<AdminOverview>('/admin/overview', mockAdminOverview);
  }

  /**
   * Fetches skill gap distribution analytics
   */
  async getSkillGapAnalytics(): Promise<ApiResponse<SkillGapAnalytics[]>> {
    return apiClient.get<SkillGapAnalytics[]>('/admin/analytics/skill-gaps', mockSkillGapAnalytics);
  }

  /**
   * Fetches regional skilling demand and density
   */
  async getRegionalData(): Promise<ApiResponse<RegionalSkillData[]>> {
    return apiClient.get<RegionalSkillData[]>('/admin/analytics/regional', mockRegionalSkillData);
  }

  /**
   * Fetches demand vs enrollment statistics
   */
  async getTrainingDemand(): Promise<ApiResponse<TrainingDemandData[]>> {
    return apiClient.get<TrainingDemandData[]>('/admin/analytics/training-demand', mockTrainingDemandData);
  }

  /**
   * Fetches outcome and retention tracking metrics
   */
  async getOutcomeAnalytics(): Promise<ApiResponse<OutcomeAnalytics>> {
    return apiClient.get<OutcomeAnalytics>('/admin/analytics/outcomes', mockOutcomeAnalytics);
  }

  /**
   * Fetches paginated/filterable list of all registered beneficiaries
   */
  async getBeneficiaries(district?: string, status?: string): Promise<ApiResponse<Beneficiary[]>> {
    let filtered = [...mockBeneficiaries];
    if (district) {
      filtered = filtered.filter(b => b.district.toLowerCase() === district.toLowerCase());
    }
    if (status) {
      filtered = filtered.filter(b => b.status === status);
    }
    return apiClient.get<Beneficiary[]>('/admin/beneficiaries', filtered);
  }

  /**
   * Fetch specific beneficiary drilldown data
   */
  async getBeneficiaryDetail(id: string): Promise<ApiResponse<Beneficiary | null>> {
    const found = mockBeneficiaries.find(b => b.id === id) || null;
    return apiClient.get<Beneficiary | null>(`/admin/beneficiaries/${id}`, found);
  }
}

export const adminService = new AdminService();

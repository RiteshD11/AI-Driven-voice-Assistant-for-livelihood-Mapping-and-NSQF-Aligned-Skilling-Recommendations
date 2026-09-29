import { Opportunity } from '../types';
import { apiClient } from './api';
import { mockOpportunities, mockEmploymentPipeline, mockSelfEmploymentRoadmap } from '../data/mock/opportunities';

export const opportunityService = {
  async getOpportunities(filter?: { type?: 'employment' | 'self_employment'; maxDistanceKm?: number }): Promise<Opportunity[]> {
    try {
      const query = new URLSearchParams();
      if (filter?.type) query.set('type', filter.type);
      if (filter?.maxDistanceKm) query.set('maxDistance', String(filter.maxDistanceKm));
      return await apiClient<Opportunity[]>(`/opportunities?${query.toString()}`);
    } catch {
      let filtered = [...mockOpportunities];
      if (filter?.type) {
        filtered = filtered.filter(o => o.type === filter.type);
      }
      if (filter?.maxDistanceKm) {
        filtered = filtered.filter(o => o.distanceKm <= filter.maxDistanceKm!);
      }
      return filtered;
    }
  },

  async getOpportunityById(id: string): Promise<Opportunity | undefined> {
    try {
      return await apiClient<Opportunity>(`/opportunities/${id}`);
    } catch {
      return mockOpportunities.find(o => o.id === id) || mockOpportunities[0];
    }
  },

  async getEmploymentPipelineStatus(_beneficiaryId?: string) {
    try {
      return await apiClient('/opportunities/pipeline');
    } catch {
      return mockEmploymentPipeline;
    }
  },

  async getSelfEmploymentRoadmap(_beneficiaryId?: string) {
    try {
      return await apiClient('/opportunities/self-employment-roadmap');
    } catch {
      return mockSelfEmploymentRoadmap;
    }
  }
};

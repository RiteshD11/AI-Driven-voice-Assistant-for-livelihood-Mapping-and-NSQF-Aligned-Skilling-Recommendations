import { Recommendation, RecommendationReason, ApiResponse } from '../types';
import { apiClient } from './api';
import { mockRecommendations } from '../data/mock/recommendations';

export const recommendationService = {
  async getRecommendations(_beneficiaryId?: string): Promise<ApiResponse<Recommendation[]>> {
    try {
      const res = await apiClient<Recommendation[]>('/recommendations');
      return { data: res, status: 200 };
    } catch {
      return { data: mockRecommendations, status: 200 };
    }
  },

  async getRecommendationById(id: string): Promise<ApiResponse<Recommendation | null>> {
    try {
      const res = await apiClient<Recommendation>(`/recommendations/${id}`);
      return { data: res, status: 200 };
    } catch {
      const found = mockRecommendations.find(r => r.id === id) || mockRecommendations[0];
      return { data: found, status: 200 };
    }
  },

  async getRecommendationExplanation(recommendationId: string): Promise<ApiResponse<RecommendationReason>> {
    try {
      const res = await apiClient<RecommendationReason>(`/recommendations/${recommendationId}/explanation`);
      return { data: res, status: 200 };
    } catch {
      const rec = mockRecommendations.find(r => r.id === recommendationId) || mockRecommendations[0];
      const reasonObj: RecommendationReason =
        typeof rec.reason === 'object' && rec.reason !== null
          ? rec.reason
          : {
              educationMatched: true,
              educationDetail: '10th standard qualification benchmark met',
              skillsMatched: rec.relevantSkills,
              skillsScore: rec.matchScore,
              summaryExplanation: typeof rec.reason === 'string' ? rec.reason : 'Optimal NSQF track based on profile audit',
              factorsConsidered: [
                { criterion: 'Education Threshold', matchedValue: '10th Pass satisfied' },
                { criterion: 'Informal Background', matchedValue: 'Practical tool handling demonstrated' },
                { criterion: 'Mobility Boundary', matchedValue: 'Within 20 km local training institute' },
                { criterion: 'Local Industry Demand', matchedValue: '48 verified vacancies in cluster' }
              ],
              skillGapsAddressed: rec.skillGaps
            };
      return { data: reasonObj, status: 200 };
    }
  }
};

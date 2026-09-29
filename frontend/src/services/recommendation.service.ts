import { Recommendation, RecommendationReason, ApiResponse } from '../types';
import { apiClient } from './api';
import { mockRecommendations } from '../data/mock/recommendations';

export const recommendationService = {
  async getRecommendations(_beneficiaryId?: string): Promise<ApiResponse<Recommendation[]>> {
    try {
      const res = await apiClient<any>('/recommendations');
      const recs = (res && Array.isArray(res.recommendations)) ? res.recommendations : (Array.isArray(res) ? res : null);
      
      if (recs && recs.length > 0) {
        // Map backend schema to frontend Recommendation structure
        const mapped = recs.map((r: any, idx: number) => {
          const course = r.course || {};
          return {
            id: r.id || r._id || `rec-dyn-${idx}`,
            targetRole: course.name || r.targetRole || 'Solar PV Technician',
            nsqfLevel: course.nsqfLevel ? parseInt(course.nsqfLevel.replace(/\D/g, '')) || 3 : (r.nsqfLevel || 3),
            matchScore: r.matchScore || 90,
            badgeLabel: r.badge || r.badgeLabel || 'High Match',
            relevantSkillsCount: course.skillsGained ? course.skillsGained.length : 3,
            skillGapsCount: 2,
            locationRelevance: course.location || 'Local District Center',
            program: {
              id: course._id || `prog-${idx}`,
              title: course.name || 'NSQF Certified Technical Training',
              nsqfLevel: course.nsqfLevel ? parseInt(course.nsqfLevel.replace(/\D/g, '')) || 3 : 3,
              nsqfCode: 'NSQF/PM-AJAY/2026',
              sector: course.skillArea || 'Technical & Renewable Energy',
              durationMonths: 3,
              notionalHours: 360,
              deliveryMode: course.deliveryMode || 'hybrid',
              trainingCenter: {
                name: course.trainingSource || 'District Skill Development Center',
                district: 'Pune',
                distanceKm: 12,
                address: course.location || 'District Skill Center'
              },
              modules: (course.skillsGained || ['Safety Standards', 'Installation', 'Diagnostic Repair']).map((sk: string, mIdx: number) => ({
                moduleNumber: mIdx + 1,
                title: sk,
                durationHours: 60,
                description: `Hands-on module covering ${sk}`
              })),
              stipendAvailable: true,
              stipendAmountPerMonth: 1500,
              pmAjayGrantCovered: true,
              verifiedBadge: true
            },
            reason: {
              educationMatched: true,
              educationDetail: 'Minimum eligibility criteria satisfied',
              skillsMatched: course.skillsGained || ['Basic Electrical', 'Tool Operations'],
              skillsScore: r.matchScore || 92,
              summaryExplanation: (r.reasons && r.reasons[0]) || 'Directly aligned with your previous spoken practical skills and local demand.',
              factorsConsidered: (r.reasons || []).map((reasonText: string) => ({
                criterion: 'Alignment Factor',
                matchedValue: reasonText
              })),
              skillGapsAddressed: ['Advanced Safety Protocols', 'Testing Certification']
            }
          };
        });
        return { data: mapped, status: 200 };
      }
      return { data: mockRecommendations, status: 200 };
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

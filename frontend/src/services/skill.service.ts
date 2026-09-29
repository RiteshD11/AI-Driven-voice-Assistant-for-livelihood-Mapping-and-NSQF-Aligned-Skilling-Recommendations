import { Skill, SkillGap, SkillAssessment, ApiResponse } from '../types';
import { apiClient } from './api';
import { mockCurrentSkills, mockSkillGaps, mockTargetRoleAssessment } from '../data/mock/skills';

export const skillService = {
  async getAssessment(beneficiaryId?: string): Promise<ApiResponse<SkillAssessment>> {
    try {
      const res = await apiClient<SkillAssessment>('/skills/assessment');
      return { data: res, status: 200 };
    } catch {
      return {
        data: {
          id: 'sa-001',
          beneficiaryId: beneficiaryId || 'ben-sc-2026-001',
          targetRole: mockTargetRoleAssessment.targetRole,
          targetNSQFLevel: `NSQF Level ${mockTargetRoleAssessment.nsqfLevel}`,
          readinessScore: mockTargetRoleAssessment.readinessPercentage,
          currentSkills: mockCurrentSkills,
          skillGaps: mockSkillGaps.map(g => ({
            id: g.id,
            name: g.skillName,
            skillName: g.skillName,
            priority: g.importance === 'critical' ? 'high' : 'medium',
            bridgeModule: g.bridgedByModule || 'Solar Installation Bridge',
            description: `Requires ${g.requiredLevel} certification.`
          }))
        },
        status: 200
      };
    }
  },

  async getSkillAssessment(_beneficiaryId?: string): Promise<{
    currentSkills: Skill[];
    targetAssessment: typeof mockTargetRoleAssessment;
  }> {
    try {
      return await apiClient('/skills/assessment');
    } catch {
      return {
        currentSkills: mockCurrentSkills,
        targetAssessment: mockTargetRoleAssessment
      };
    }
  },

  async getSkillGaps(_targetRoleCode?: string): Promise<SkillGap[]> {
    try {
      return await apiClient<SkillGap[]>('/skills/gaps');
    } catch {
      return mockSkillGaps;
    }
  },

  async addSkill(skillName: string, category: Skill['category'] = 'technical'): Promise<Skill> {
    const newSkill: Skill = {
      id: `sk-custom-${Date.now()}`,
      name: skillName,
      category,
      proficiency: 'intermediate',
      verified: false,
      acquiredFrom: 'informal'
    };
    mockCurrentSkills.push(newSkill);
    return newSkill;
  }
};

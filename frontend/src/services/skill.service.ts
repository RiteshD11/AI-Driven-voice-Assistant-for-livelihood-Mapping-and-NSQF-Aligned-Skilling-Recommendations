import { Skill, SkillGap, SkillAssessment, ApiResponse } from '../types';
import { apiClient } from './api';
import { mockCurrentSkills, mockSkillGaps, mockTargetRoleAssessment } from '../data/mock/skills';

export const skillService = {
  async getAssessment(beneficiaryId?: string): Promise<ApiResponse<SkillAssessment>> {
    let voiceSaved: any = null;
    try {
      const item = typeof localStorage !== 'undefined' ? localStorage.getItem('voice_extracted_profile') : null;
      if (item) voiceSaved = JSON.parse(item);
    } catch (_) {}

    // If user spoke custom skills, display their exact real skills
    let dynamicCurrentSkills = mockCurrentSkills;
    if (voiceSaved?.skillsText && voiceSaved?.currentLivelihood) {
      dynamicCurrentSkills = [
        {
          id: 'sk-user-1',
          name: voiceSaved.skillsText,
          category: 'technical',
          proficiency: 'intermediate',
          yearsExperience: 3,
          verified: true,
          acquiredFrom: 'on_job'
        },
        {
          id: 'sk-user-0',
          name: voiceSaved.currentLivelihood,
          category: 'technical',
          proficiency: 'intermediate',
          yearsExperience: 2,
          verified: true,
          acquiredFrom: 'informal'
        }
      ];
    } else if (voiceSaved?.skillsText) {
      dynamicCurrentSkills = [
        {
          id: 'sk-user-1',
          name: voiceSaved.skillsText,
          category: 'technical',
          proficiency: 'intermediate',
          yearsExperience: 3,
          verified: true,
          acquiredFrom: 'on_job'
        }
      ];
    } else if (voiceSaved?.currentLivelihood) {
      dynamicCurrentSkills = [
        {
          id: 'sk-user-0',
          name: voiceSaved.currentLivelihood,
          category: 'technical',
          proficiency: 'intermediate',
          yearsExperience: 2,
          verified: true,
          acquiredFrom: 'informal'
        }
      ];
    }

    try {
      const res = await apiClient<SkillAssessment>('/skills/assessment');
      if (res && res.currentSkills) {
        return { data: res, status: 200 };
      }
    } catch (_) {}

    return {
      data: {
        id: 'sa-001',
        beneficiaryId: beneficiaryId || 'ben-sc-2026-001',
        targetRole: mockTargetRoleAssessment.targetRole,
        targetNSQFLevel: `NSQF Level ${mockTargetRoleAssessment.nsqfLevel}`,
        readinessScore: mockTargetRoleAssessment.readinessPercentage,
        currentSkills: dynamicCurrentSkills,
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

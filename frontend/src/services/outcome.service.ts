import { EmploymentOutcome, FollowUp } from '../types';
import { apiClient } from './api';
import { mockEmploymentOutcome, mockFollowUps, mockMilestoneTimeline } from '../data/mock/outcomes';

export const outcomeService = {
  async getEmploymentOutcome(_beneficiaryId?: string): Promise<EmploymentOutcome> {
    try {
      return await apiClient<EmploymentOutcome>('/outcomes/employment');
    } catch {
      return mockEmploymentOutcome;
    }
  },

  async getFollowUpHistory(_beneficiaryId?: string): Promise<FollowUp[]> {
    try {
      return await apiClient<FollowUp[]>('/outcomes/followups');
    } catch {
      return mockFollowUps;
    }
  },

  async submitVoiceFollowUp(beneficiaryId: string, voiceTranscript: string): Promise<FollowUp> {
    try {
      return await apiClient<FollowUp>('/outcomes/followup/voice', {
        method: 'POST',
        body: JSON.stringify({ beneficiaryId, voiceTranscript })
      });
    } catch {
      const updated: FollowUp = {
        id: `fol-${Date.now()}`,
        beneficiaryId,
        beneficiaryName: mockEmploymentOutcome.beneficiaryName,
        milestone: '30_days',
        dueDate: new Date().toISOString(),
        completedDate: new Date().toISOString(),
        status: 'submitted',
        recordedVoiceText: voiceTranscript,
        aiExtractedOutcome: {
          currentStatus: 'employed',
          incomeMaintained: true,
          jobSatisfactionRating: 5,
          needsUpskilling: false
        }
      };
      mockFollowUps.unshift(updated);
      return updated;
    }
  },

  async getMilestoneTimeline(): Promise<typeof mockMilestoneTimeline> {
    try {
      return await apiClient('/outcomes/timeline');
    } catch {
      return mockMilestoneTimeline;
    }
  }
};

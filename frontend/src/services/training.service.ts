import { LivelihoodPathway, TrainingProgram, TrainingProgress } from '../types';
import { apiClient } from './api';
import { mockLivelihoodPathway } from '../data/mock/pathways';
import { mockTrainingDetail, mockActiveTrainingProgress, mockSkillBridgeMappings } from '../data/mock/training';

export const trainingService = {
  async getLivelihoodPathway(_pathwayId?: string): Promise<LivelihoodPathway> {
    try {
      return await apiClient<LivelihoodPathway>('/pathway');
    } catch {
      return mockLivelihoodPathway;
    }
  },

  async getTrainingDetails(programId?: string): Promise<TrainingProgram> {
    try {
      return await apiClient<TrainingProgram>(`/training/${programId || 'default'}`);
    } catch {
      return mockTrainingDetail;
    }
  },

  async getTrainingProgress(_beneficiaryId?: string): Promise<TrainingProgress> {
    try {
      return await apiClient<TrainingProgress>('/training/progress');
    } catch {
      return mockActiveTrainingProgress;
    }
  },

  async getSkillBridgeMappings(): Promise<typeof mockSkillBridgeMappings> {
    try {
      return await apiClient('/training/bridge-mappings');
    } catch {
      return mockSkillBridgeMappings;
    }
  }
};

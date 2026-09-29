/**
 * Kaushal Saathi - Pathway & Livelihood Progression Hook
 * Manages full lifecycle from training modules to local placement and post-placement tracking
 */

import { useState, useEffect, useCallback } from 'react';
import {
  LivelihoodPathway,
  TrainingProgram,
  Opportunity,
  EmploymentOutcome,
} from '../types';
import { trainingService } from '../services/training.service';
import { opportunityService } from '../services/opportunity.service';
import { outcomeService } from '../services/outcome.service';
import { mockPathway } from '../data/mock/pathways';

export function usePathway(beneficiaryId: string = 'ben-sc-2026-001') {
  const [pathway, setPathway] = useState<LivelihoodPathway | null>(mockPathway);
  const [training, setTraining] = useState<TrainingProgram | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [outcome, setOutcome] = useState<EmploymentOutcome | null>(null);
  const [activeTab, setActiveTab] = useState<'wage' | 'self_employed'>('wage');
  const [selectedStageId, setSelectedStageId] = useState<string>('stg-02');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPathwayData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [pathRes, trainRes, oppRes, outRes] = await Promise.all([
        trainingService.getLivelihoodPathway(beneficiaryId),
        trainingService.getTrainingDetails('tp-solar-pv-01'),
        opportunityService.getOpportunities({ maxDistanceKm: 25 }),
        outcomeService.getEmploymentOutcome(beneficiaryId),
      ]);

      if (pathRes) setPathway(pathRes);
      if (trainRes) setTraining(trainRes);
      if (oppRes) setOpportunities(oppRes);
      if (outRes) setOutcome(outRes);
    } catch (err: unknown) {
      setError('Unable to load pathway. Displaying simulated offline pathway.');
    } finally {
      setLoading(false);
    }
  }, [beneficiaryId]);

  useEffect(() => {
    loadPathwayData();
  }, [loadPathwayData]);

  return {
    pathway,
    training,
    opportunities,
    outcome,
    activeTab,
    setActiveTab,
    selectedStageId,
    setSelectedStageId,
    loading,
    error,
    refresh: loadPathwayData,
  };
}

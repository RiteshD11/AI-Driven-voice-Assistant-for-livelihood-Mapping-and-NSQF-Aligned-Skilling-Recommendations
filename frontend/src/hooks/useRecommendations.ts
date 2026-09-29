/**
 * Kaushal Saathi - Recommendations & Skill Gap Hook
 * Retrieves NSQF pathway options, detailed skill gap analysis, and explainability reasoning
 */

import { useState, useEffect, useCallback } from 'react';
import { Recommendation, SkillAssessment, RecommendationReason } from '../types';
import { recommendationService } from '../services/recommendation.service';
import { skillService } from '../services/skill.service';

export function useRecommendations(beneficiaryId: string = 'ben-sc-2026-001') {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [skillAssessment, setSkillAssessment] = useState<SkillAssessment | null>(null);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const [selectedReason, setSelectedReason] = useState<RecommendationReason | null>(null);
  const [isReasonDrawerOpen, setIsReasonDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [recRes, skillRes] = await Promise.all([
        recommendationService.getRecommendations(beneficiaryId),
        skillService.getAssessment(beneficiaryId),
      ]);

      if (recRes.data) {
        setRecommendations(recRes.data);
        if (recRes.data.length > 0) {
          setSelectedRecommendation(recRes.data[0]);
        }
      }
      if (skillRes.data) {
        setSkillAssessment(skillRes.data);
      }
    } catch (err: unknown) {
      setError('Unable to load recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [beneficiaryId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openReasonDrawer = async (rec: Recommendation) => {
    setSelectedRecommendation(rec);
    try {
      const res = await recommendationService.getRecommendationExplanation(rec.id);
      if (res.data) {
        setSelectedReason(res.data);
      }
    } catch (err: unknown) {
      // Reason fallback
    }
    setIsReasonDrawerOpen(true);
  };

  const closeReasonDrawer = () => {
    setIsReasonDrawerOpen(false);
  };

  return {
    recommendations,
    skillAssessment,
    selectedRecommendation,
    setSelectedRecommendation,
    selectedReason,
    isReasonDrawerOpen,
    openReasonDrawer,
    closeReasonDrawer,
    loading,
    error,
    refresh: fetchData,
  };
}

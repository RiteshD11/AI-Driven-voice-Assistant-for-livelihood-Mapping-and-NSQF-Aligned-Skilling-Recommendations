import React from 'react';
import { useRecommendations } from '../hooks/useRecommendations';
import { SkillGapCard } from '../components/SkillGapCard';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { ProgressIndicator } from '../components/ProgressIndicator';

interface SkillGapPageProps {
  onExploreRecommendations: () => void;
}

export const SkillGapPage: React.FC<SkillGapPageProps> = ({ onExploreRecommendations }) => {
  const { skillAssessment, loading, error, refresh } = useRecommendations('ben-sc-2026-001');

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-12">
        <LoadingState
          message="Running NSQF Skill Gap Alignment Engine..."
          subtext="Comparing informal competencies against National Occupational Standards (NOS)."
        />
      </div>
    );
  }

  if (error || !skillAssessment) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-12">
        <ErrorState
          title="Skill gap analysis could not be retrieved"
          message={error || 'Unable to compute occupational gap matrix.'}
          onRetry={refresh}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col items-center">
      <SkillGapCard
        assessment={skillAssessment}
        onExploreRecommendations={onExploreRecommendations}
      />
    </div>
  );
};

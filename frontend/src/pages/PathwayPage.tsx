import React from 'react';
import { usePathway } from '../hooks/usePathway';
import { PathwayTimeline } from '../components/PathwayTimeline';
import { TrainingCard } from '../components/TrainingCard';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { PathwayStage } from '../types';

interface PathwayPageProps {
  onStartTraining: () => void;
  onExploreOpportunities: () => void;
}

export const PathwayPage: React.FC<PathwayPageProps> = ({
  onStartTraining,
  onExploreOpportunities,
}) => {
  const {
    pathway,
    training,
    selectedStageId,
    setSelectedStageId,
    loading,
    error,
    refresh,
  } = usePathway('ben-sc-2026-001');

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-12">
        <LoadingState
          message="Constructing personalized livelihood pathway..."
          subtext="Configuring 7-stage roadmap under PM-AJAY Grant-in-Aid guidelines."
        />
      </div>
    );
  }

  if (error || !pathway) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-12">
        <ErrorState
          title="Could not load livelihood pathway"
          message={error || 'Unable to retrieve roadmap progression.'}
          onRetry={refresh}
        />
      </div>
    );
  }

  const handleSelectStage = (stage: PathwayStage) => {
    setSelectedStageId(stage.id);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-12">
      {/* Progress Step */}
      <div className="w-full max-w-xl mx-auto">
        <ProgressIndicator
          current={6}
          total={8}
          label="Livelihood Pathway & Skilling"
          variant="amber"
        />
      </div>

      {/* Vertical Interactive Timeline */}
      <PathwayTimeline
        stages={pathway.stages || []}
        activeStageId={selectedStageId}
        onSelectStage={handleSelectStage}
      />

      {/* Associated Training Curriculum Card */}
      {training && (
        <div className="pt-6">
          <TrainingCard
            training={training}
            onStartTraining={onStartTraining}
          />
        </div>
      )}
    </div>
  );
};

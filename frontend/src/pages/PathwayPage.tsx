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
  onExploreEcosystem?: () => void;
}

export const PathwayPage: React.FC<PathwayPageProps> = ({
  onStartTraining,
  onExploreOpportunities,
  onExploreEcosystem,
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
      {/* Vertical Interactive Timeline */}
      <PathwayTimeline
        stages={pathway.stages || []}
        activeStageId={selectedStageId}
        onSelectStage={handleSelectStage}
      />

      {/* Official Ecosystem Gateway Banner */}
      {onExploreEcosystem && (
        <div className="w-full max-w-3xl mx-auto rounded-[24px] bg-gradient-to-br from-amber-50/90 via-white to-sky-50/70 border border-amber-200/80 p-6 sm:p-7 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-5 text-left">
          <div className="space-y-1 max-w-lg">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-800">
                Official Next Step
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-[#181818]">
              Continue to Official Ecosystem Platforms
            </h4>
            <p className="text-xs text-[#666666] leading-relaxed">
              Explore external government & skilling portals (Skill India Digital, NCS, NSDC, BHASHINI, PM-AJAY) to enroll in courses or apply for certified jobs.
            </p>
          </div>

          <button
            onClick={onExploreEcosystem}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#181818] hover:bg-neutral-800 text-white font-bold text-xs tracking-wider transition-all duration-200 shadow-sm active:scale-95 shrink-0"
          >
            <span>OFFICIAL ECOSYSTEM CONNECT</span>
            <span>→</span>
          </button>
        </div>
      )}

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

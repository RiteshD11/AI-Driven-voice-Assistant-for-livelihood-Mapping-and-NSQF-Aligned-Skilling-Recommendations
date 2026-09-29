import React from 'react';
import { Sparkles, ArrowRight, Filter, ShieldCheck } from 'lucide-react';
import { useRecommendations } from '../hooks/useRecommendations';
import { RecommendationCard } from '../components/RecommendationCard';
import { RecommendationReasonDrawer } from '../components/RecommendationReasonDrawer';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { Recommendation } from '../types';

interface RecommendationsPageProps {
  onSelectPathway: (rec: Recommendation) => void;
  autoOpenReason?: boolean;
}

export const RecommendationsPage: React.FC<RecommendationsPageProps> = ({ onSelectPathway, autoOpenReason = false }) => {
  const {
    recommendations,
    selectedRecommendation,
    selectedReason,
    isReasonDrawerOpen,
    openReasonDrawer,
    closeReasonDrawer,
    loading,
    error,
    refresh,
  } = useRecommendations('ben-sc-2026-001');

  // If autoOpenReason is requested (e.g. from demo tour step 6), open drawer once recommendation is ready
  React.useEffect(() => {
    if (autoOpenReason && selectedRecommendation && !loading) {
      openReasonDrawer(selectedRecommendation);
    }
  }, [autoOpenReason, selectedRecommendation, loading]);

  if (loading) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-12">
        <LoadingState
          message="Loading NSQF-aligned skilling pathways..."
          subtext="Matching wage requirements, mobility boundaries, and verified local employer vacancies."
        />
      </div>
    );
  }

  if (error || recommendations.length === 0) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-12">
        <ErrorState
          title="Unable to load recommendations"
          message={error || 'No verified qualification packs available at this moment.'}
          onRetry={refresh}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col items-center">
      {/* Header section */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Tailored NSQF Recommendations</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#181818] tracking-tight">
          Paths that fit your profile
        </h2>
        <p className="text-xs sm:text-sm text-[#666666] mt-2 leading-relaxed">
          Curated opportunities matching your electrical experience, mobility radius, and wage aspirations.
        </p>
      </div>

      {/* 3 Recommendation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
        {recommendations.slice(0, 3).map(rec => (
          <RecommendationCard
            key={rec.id}
            recommendation={rec}
            onWhyThis={openReasonDrawer}
            onExplorePathway={onSelectPathway}
            isSelected={selectedRecommendation?.id === rec.id}
          />
        ))}
      </div>

      {/* Explainable AI Modal / Drawer */}
      <RecommendationReasonDrawer
        isOpen={isReasonDrawerOpen}
        onClose={closeReasonDrawer}
        recommendation={selectedRecommendation}
        reason={selectedReason}
        onProceedToPathway={onSelectPathway}
      />
    </div>
  );
};

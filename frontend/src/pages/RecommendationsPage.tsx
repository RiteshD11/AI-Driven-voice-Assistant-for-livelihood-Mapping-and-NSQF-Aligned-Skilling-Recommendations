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
}

export const RecommendationsPage: React.FC<RecommendationsPageProps> = ({ onSelectPathway }) => {
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
      {/* Progress Step */}
      <div className="w-full max-w-xl mb-6">
        <ProgressIndicator
          current={5}
          total={8}
          label="NSQF Recommendations"
          variant="amber"
        />
      </div>

      {/* Header section */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Intelligence Layer · 3 Tailored Pathways</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Paths That Fit Your Profile
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
          आपकी शिक्षा, अनुभव और प्राथमिकताओं के आधार पर चुने गए 3 प्रमाणित कौशल मार्ग।
        </p>
      </div>

      {/* 3 Recommendation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
        {recommendations.map(rec => (
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

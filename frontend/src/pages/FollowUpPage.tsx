import React, { useState } from 'react';
import { usePathway } from '../hooks/usePathway';
import { OutcomeCard } from '../components/OutcomeCard';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { CheckCircle2, Award, ArrowRight } from 'lucide-react';

interface FollowUpPageProps {
  onCompleteJourney: () => void;
}

export const FollowUpPage: React.FC<FollowUpPageProps> = ({ onCompleteJourney }) => {
  const { outcome, loading, error, refresh } = usePathway('ben-sc-2026-001');

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-12">
        <LoadingState
          message="Retrieving longitudinal outcome records..."
          subtext="Checking 30-day and 90-day retention status under PM-AJAY monitoring protocols."
        />
      </div>
    );
  }

  if (error || !outcome) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-12">
        <ErrorState
          title="Could not load follow-up record"
          message={error || 'Unable to retrieve placement verification.'}
          onRetry={refresh}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col items-center">
      {/* Progress Step */}
      <div className="w-full max-w-xl mb-6">
        <ProgressIndicator
          current={8}
          total={8}
          label="Outcome Tracking & Retention"
          variant="emerald"
        />
      </div>

      <OutcomeCard
        outcome={outcome}
      />

      {/* Completion Banner */}
      <div className="mt-8 p-6 rounded-3xl glass-card border border-emerald-500/30 text-center max-w-2xl w-full">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white">Full Livelihood Cycle Verified</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
          You have experienced the complete PS97 journey: Voice → Profile → Skill Gap → NSQF Training → Opportunity → Placement → Outcome Tracking.
        </p>

        <button
          onClick={onCompleteJourney}
          className="mt-6 inline-flex items-center gap-2 px-8 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-amber-500/40 transition-all active:scale-95"
        >
          <span>Return to Dashboard or Restart Journey</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

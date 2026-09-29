import React from 'react';
import { usePathway } from '../hooks/usePathway';
import { OutcomeCard } from '../components/OutcomeCard';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { CheckCircle2, ArrowRight } from 'lucide-react';

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
      <OutcomeCard outcome={outcome} />

      {/* Completion Banner */}
      <div className="mt-8 p-6 rounded-[24px] bg-white border border-[#E7E7E3] text-center max-w-2xl w-full shadow-card">
        <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-[#181818]">Full Livelihood Cycle Complete</h3>
        <p className="text-xs text-[#666666] mt-1 max-w-md mx-auto">
          You have experienced the complete UNNATI journey: Voice → Profile → Skill Gap → NSQF Training → Opportunity → Placement → Outcome Tracking.
        </p>

        <button
          onClick={onCompleteJourney}
          className="mt-6 inline-flex items-center gap-2 px-8 py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 text-[#181818] font-bold text-xs transition-all active:scale-95"
        >
          <span>Return to Homepage (होमपेज पर जाएं)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Zap,
  Layers,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Recommendation, RecommendationReason } from '../types';
import { StatusBadge } from './StatusBadge';

interface RecommendationReasonDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  recommendation: Recommendation | null;
  reason: RecommendationReason | null;
  onProceedToPathway?: (rec: Recommendation) => void;
}

export const RecommendationReasonDrawer: React.FC<RecommendationReasonDrawerProps> = ({
  isOpen,
  onClose,
  recommendation,
  reason,
  onProceedToPathway,
}) => {
  if (!isOpen || !recommendation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl glass-card border border-amber-500/40 p-6 sm:p-8 shadow-2xl shadow-amber-500/10 text-left"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Accent Gradient */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-cyan-400" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Explainable AI Drawer"
          className="absolute top-5 right-5 p-2 rounded-full glass-card hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Drawer Header */}
        <div className="mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase">
              Explainable AI (XAI) Recommendation Audit
            </span>
          </div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            Why this recommendation?
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Understanding why <span className="text-amber-300 font-semibold">{recommendation.title}</span> is tailored to your profile.
          </p>
        </div>

        {/* Section 1: We Considered (Input Parameters) */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              1. Factors We Considered (हमारे विचारणीय पहलू)
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {reason?.factorsConsidered ? (
              reason.factorsConsidered.map((factor, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5 text-xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-200 block">{factor.criterion}</span>
                    <span className="text-slate-400 text-[11px]">{factor.matchedValue}</span>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Education: 10th Pass minimum threshold met</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Existing Skills: Prior manual wiring and tool familiarity</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Mobility: Within 20 km travel radius</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Local Opportunity: 48 active solar installer vacancies</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Section 2: Skill Gaps to Address */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              2. Skill Gaps to Address (संबोधित किए जाने वाले कौशल अंतर)
            </h4>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 space-y-2">
            {reason?.skillGapsAddressed?.map((gap, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{gap}</span>
              </div>
            )) || (
              <>
                <div className="text-xs text-amber-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Solar rooftop inverter wiring & DC power safety standards</span>
                </div>
                <div className="text-xs text-amber-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Multimeter diagnostics & earth leakage testing</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Section 3: Recommended NSQF Pathway */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              3. Recommended NSQF Pathway (प्रमाणित योग्यता मार्ग)
            </h4>
          </div>

          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-white">{recommendation.title}</div>
              <div className="text-xs text-cyan-300 font-mono mt-0.5">
                Qualification Pack: {recommendation.qualificationCode || 'SGJ/Q0101'} · {recommendation.nsqfLevel}
              </div>
            </div>
            <StatusBadge label="100% GIA FUNDED" variant="success" size="sm" />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full glass-card hover:bg-slate-800 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>
          {onProceedToPathway && (
            <button
              onClick={() => {
                onClose();
                onProceedToPathway(recommendation);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-xs font-bold transition-all shadow-lg active:scale-95"
            >
              <span>Explore This Pathway</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

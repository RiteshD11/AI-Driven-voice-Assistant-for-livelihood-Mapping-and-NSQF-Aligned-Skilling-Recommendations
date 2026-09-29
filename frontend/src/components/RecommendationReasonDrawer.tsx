import React from 'react';
import {
  X,
  CheckCircle2,
  Circle,
  ArrowDown,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  Target,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Recommendation, RecommendationReason } from '../types';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[24px] bg-white border border-[#E7E7E3] p-6 sm:p-8 shadow-modal text-left"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close explainability modal"
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-[#8A8A8A] hover:text-[#181818] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 pb-4 border-b border-[#E7E7E3]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Explainable AI (XAI) Recommendation</span>
          </div>
          <h3 className="text-2xl font-extrabold text-[#181818] tracking-tight">
            Why this recommendation?
          </h3>
          <p className="text-xs sm:text-sm text-[#666666] mt-1">
            Understanding why <span className="text-[#181818] font-bold">{recommendation.title || 'Solar PV Technician'}</span> was chosen for you.
          </p>
        </div>

        {/* 3-Tier Explainability Flow */}
        <div className="space-y-3 mb-6">
          {/* 1. YOUR PROFILE */}
          <div className="p-4 rounded-[18px] bg-neutral-50 border border-[#E7E7E3]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#666666] block mb-2.5">
              YOUR PROFILE
            </span>
            <div className="space-y-1.5 text-xs text-[#181818]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Electrical experience & tool handling</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Interested in machinery & clean technology</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Prefers wage employment with steady monthly income</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Can travel up to 20 km for skilling and placement</span>
              </div>
            </div>
          </div>

          {/* Connector Down Arrow */}
          <div className="flex justify-center">
            <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-[#8A8A8A]">
              <ArrowDown className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 2. SKILL GAP */}
          <div className="p-4 rounded-[18px] bg-amber-50/70 border border-amber-200">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block mb-2.5">
              SKILL GAP
            </span>
            <div className="space-y-1.5 text-xs text-[#181818]">
              <div className="flex items-center gap-2">
                <Circle className="w-3.5 h-3.5 text-amber-600 stroke-[2.5] shrink-0" />
                <span>Solar PV panel installation & rooftop mounting</span>
              </div>
              <div className="flex items-center gap-2">
                <Circle className="w-3.5 h-3.5 text-amber-600 stroke-[2.5] shrink-0" />
                <span>DC electrical safety & surge protection standards</span>
              </div>
            </div>
          </div>

          {/* Connector Down Arrow */}
          <div className="flex justify-center">
            <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-[#8A8A8A]">
              <ArrowDown className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 3. RECOMMENDATION */}
          <div className="p-4 rounded-[18px] bg-neutral-50 border border-[#E7E7E3] flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
                RECOMMENDATION
              </span>
              <div className="text-base font-bold text-[#181818]">{recommendation.title || 'Solar PV Technician'}</div>
              <div className="text-xs text-[#666666] mt-0.5">
                Accredited NSQF Level {recommendation.nsqfLevel || '3'} · 3 Months · Free PM-AJAY GIA
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Award className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#E7E7E3] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full hover:bg-neutral-100 text-xs font-semibold text-[#666666] hover:text-[#181818] transition-colors"
          >
            Close
          </button>

          {onProceedToPathway && (
            <button
              onClick={() => {
                onClose();
                onProceedToPathway(recommendation);
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <span>Explore Pathway</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

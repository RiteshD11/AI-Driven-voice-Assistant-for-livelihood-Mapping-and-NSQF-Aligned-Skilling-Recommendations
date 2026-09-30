import React from 'react';
import { Target, AlertTriangle, GraduationCap, Briefcase, Sparkles, ArrowRight } from 'lucide-react';

interface PathwaySummaryProps {
  recommendedRole?: string;
  skillGap?: string;
  suggestedNextStep?: string;
  goal?: string;
  onExplorePathway?: () => void;
  hasCustomPathway?: boolean;
}

export const PathwaySummary: React.FC<PathwaySummaryProps> = ({
  recommendedRole = 'Electrician / Solar PV Technician',
  skillGap = 'Advanced Wiring & Rooftop Solar Inverter Diagnostics',
  suggestedNextStep = 'NSQF-aligned training (Level 3 Rooftop Specialist)',
  goal = 'Employment / Self-Employment (₹16,000 – ₹38,000/mo)',
  onExplorePathway,
  hasCustomPathway = true,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto rounded-[24px] bg-white border border-[#E7E7E3] p-6 sm:p-8 shadow-card relative overflow-hidden text-left">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-sky-500 to-emerald-500" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-[#E7E7E3] gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-amber-800">
              UNNATIAI Roadmap Synthesis
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#181818] tracking-tight">
            YOUR UNNATIAI PATHWAY
          </h2>
        </div>

        {onExplorePathway && (
          <button
            onClick={onExplorePathway}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 transition-colors"
          >
            <span>View Full 7-Stage Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {!hasCustomPathway ? (
        <div className="p-4 rounded-[16px] bg-neutral-50 border border-[#E7E7E3] text-xs text-[#666666] flex items-center justify-between">
          <span>Complete your UNNATIAI assessment to see a personalized pathway. Showing standard benchmark below:</span>
        </div>
      ) : null}

      {/* 4 Compact Pathway Summary Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
        {/* Recommended Role */}
        <div className="p-4 rounded-[18px] bg-neutral-50 border border-[#E7E7E3] flex flex-col justify-between hover:bg-white hover:shadow-subtle transition-all">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8A8A8A] mb-1.5">
              <span className="text-base">🎯</span>
              <span>Recommended Role</span>
            </div>
            <div className="text-base font-bold text-[#181818] leading-snug">
              {recommendedRole}
            </div>
          </div>
          <span className="text-[10px] font-mono font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md mt-3 self-start border border-sky-200/60">
            NSQF Level 3
          </span>
        </div>

        {/* Skill Gap */}
        <div className="p-4 rounded-[18px] bg-neutral-50 border border-[#E7E7E3] flex flex-col justify-between hover:bg-white hover:shadow-subtle transition-all">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8A8A8A] mb-1.5">
              <span className="text-base">⚠</span>
              <span>Skill Gap</span>
            </div>
            <div className="text-base font-bold text-amber-900 leading-snug">
              {skillGap}
            </div>
          </div>
          <span className="text-[10px] font-mono font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md mt-3 self-start border border-amber-200/60">
            Competency Bridge
          </span>
        </div>

        {/* Suggested Next Step */}
        <div className="p-4 rounded-[18px] bg-neutral-50 border border-[#E7E7E3] flex flex-col justify-between hover:bg-white hover:shadow-subtle transition-all">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8A8A8A] mb-1.5">
              <span className="text-base">🎓</span>
              <span>Suggested Next Step</span>
            </div>
            <div className="text-base font-bold text-[#181818] leading-snug">
              {suggestedNextStep}
            </div>
          </div>
          <span className="text-[10px] font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md mt-3 self-start border border-emerald-200/60">
            100% GIA Subsidy
          </span>
        </div>

        {/* Goal */}
        <div className="p-4 rounded-[18px] bg-neutral-50 border border-[#E7E7E3] flex flex-col justify-between hover:bg-white hover:shadow-subtle transition-all">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8A8A8A] mb-1.5">
              <span className="text-base">💼</span>
              <span>Goal</span>
            </div>
            <div className="text-base font-bold text-[#181818] leading-snug">
              {goal}
            </div>
          </div>
          <span className="text-[10px] font-mono font-semibold text-purple-800 bg-purple-50 px-2 py-0.5 rounded-md mt-3 self-start border border-purple-200/60">
            Livelihood Uplift
          </span>
        </div>
      </div>
    </div>
  );
};

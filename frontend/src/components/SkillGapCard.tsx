import React from 'react';
import {
  CheckCircle2,
  Circle,
  ArrowDown,
  ArrowRight,
  Sparkles,
  Target,
  Award,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { SkillAssessment } from '../types';

interface SkillGapCardProps {
  assessment: SkillAssessment;
  onExploreRecommendations?: () => void;
  className?: string;
}

export const SkillGapCard: React.FC<SkillGapCardProps> = ({
  assessment,
  onExploreRecommendations,
  className,
}) => {
  return (
    <div className={cn('w-full max-w-3xl mx-auto space-y-6', className)}>
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Stage 03 · Skill Gap Assessment</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#181818] tracking-tight">
          Where You Are <span className="text-amber-600">→</span> Where You Can Go
        </h2>
        <p className="text-xs sm:text-sm text-[#666666] mt-1.5">
          Identifying the exact skilling bridge between your current abilities and certified employment.
        </p>
      </div>

      {/* Main Flow Card */}
      <div className="rounded-[24px] bg-white border border-[#E7E7E3] p-6 sm:p-9 shadow-card relative overflow-hidden">
        {/* Step 1: YOUR CURRENT SKILLS */}
        <div className="p-5 rounded-[20px] bg-neutral-50/80 border border-[#E7E7E3]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#181818]">
              YOUR CURRENT SKILLS
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Verified from voice dialog
            </span>
          </div>

          <div className="space-y-2.5">
            {assessment.currentSkills.map(skill => (
              <div
                key={skill.id}
                className="flex items-center gap-3 p-3 rounded-[14px] bg-white border border-[#E7E7E3] text-[#181818]"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-semibold">{skill.name}</span>
                  {skill.description && (
                    <span className="text-xs text-[#8A8A8A] block">{skill.description}</span>
                  )}
                </div>
                <span className="text-xs font-medium text-[#666666] capitalize">
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center my-3">
          <div className="w-9 h-9 rounded-full bg-neutral-100 border border-[#E7E7E3] flex items-center justify-center text-[#666666]">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Step 2: SKILL GAPS */}
        <div className="p-5 rounded-[20px] bg-amber-50/50 border border-amber-200/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
              SKILL GAPS TO BRIDGE
            </span>
            <span className="text-xs font-semibold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-full border border-amber-300/60">
              {assessment.skillGaps.length} targeted modules
            </span>
          </div>

          <div className="space-y-2.5">
            {assessment.skillGaps.map(gap => (
              <div
                key={gap.id}
                className="flex items-start gap-3 p-3 rounded-[14px] bg-white border border-amber-200 text-[#181818]"
              >
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Circle className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">{gap.name}</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      {gap.priority} priority
                    </span>
                  </div>
                  {gap.bridgeModule && (
                    <p className="text-xs text-[#666666] mt-0.5">
                      Required module: {gap.bridgeModule}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Down Arrow Connector */}
        <div className="flex justify-center my-3">
          <div className="w-9 h-9 rounded-full bg-neutral-100 border border-[#E7E7E3] flex items-center justify-center text-[#666666]">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Step 3: TARGET PATH */}
        <div className="p-5 rounded-[20px] bg-neutral-50 border border-[#E7E7E3]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">
              TARGET PATHWAY
            </span>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
              100% PM-AJAY GIA Subsidized
            </span>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 rounded-[16px] bg-white border border-[#E7E7E3]">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-sm">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#181818]">
                {assessment.targetRole}
              </h3>
              <p className="text-xs text-[#666666] mt-0.5">
                Accredited NSQF Level {assessment.targetNSQFLevel} · 3 Months · Stipend Eligible
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA to explore recommendations */}
        {onExploreRecommendations && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-6 border-t border-[#E7E7E3]">
            <div className="text-xs text-[#666666]">
              Aligned with National Skills Qualification Framework (NSQF).
            </div>
            <button
              onClick={onExploreRecommendations}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Explore NSQF Recommendations (सिफारिशें देखें)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

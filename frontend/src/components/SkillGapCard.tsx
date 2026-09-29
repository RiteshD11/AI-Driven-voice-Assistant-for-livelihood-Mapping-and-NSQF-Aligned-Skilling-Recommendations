import React from 'react';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { SkillAssessment } from '../types';
import { StatusBadge } from './StatusBadge';

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
    <div className={cn('w-full max-w-4xl mx-auto space-y-6', className)}>
      {/* Title & Concept Header */}
      <div className="text-center max-w-2xl mx-auto mb-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Skill-Gap Assessment Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Where You Are <span className="text-amber-400">→</span> Where You Can Go
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
          आपकी वर्तमान क्षमताओं और उच्च आय वाले कौशल के बीच का अंतर।
        </p>
      </div>

      {/* Main Visual Comparison Panel */}
      <div className="rounded-3xl glass-card border border-slate-700/80 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Top Target Badge Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-md">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Target Role</span>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>{assessment.targetRole}</span>
                <StatusBadge label={assessment.targetNSQFLevel} variant="warning" size="sm" />
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <StatusBadge label="DEMO DATA" variant="neutral" size="sm" />
            <div className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono text-emerald-400 font-semibold">
              Readiness: {assessment.readinessScore}%
            </div>
          </div>
        </div>

        {/* 2-Column Split: Current Skills vs. Skill Gaps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Left Column: Current Skills */}
          <div className="rounded-2xl bg-slate-900/80 border border-emerald-500/30 p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wider font-mono">
                  Current Skills (मौजूदा हुनर)
                </h4>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {assessment.currentSkills.length} Identified
              </span>
            </div>

            <div className="space-y-3">
              {assessment.currentSkills.map(skill => (
                <div
                  key={skill.id}
                  className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-start gap-3 hover:bg-emerald-950/30 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-100">{skill.name}</span>
                      <span className="text-[11px] font-mono text-emerald-400 capitalize">
                        {skill.level}
                      </span>
                    </div>
                    {skill.description && (
                      <p className="text-xs text-slate-400 mt-0.5">{skill.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Skill Gaps */}
          <div className="rounded-2xl bg-slate-900/80 border border-amber-500/30 p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
                <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider font-mono">
                  Skill Gaps to Bridge (कौशल अंतर)
                </h4>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">
                {assessment.skillGaps.length} Modules Needed
              </span>
            </div>

            <div className="space-y-3">
              {assessment.skillGaps.map(gap => (
                <div
                  key={gap.id}
                  className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 flex items-start gap-3 hover:bg-amber-950/30 transition-colors"
                >
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-100">{gap.name}</span>
                      <span className={cn(
                        'text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold',
                        gap.priority === 'high' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                        gap.priority === 'medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      )}>
                        {gap.priority} priority
                      </span>
                    </div>
                    {gap.description && (
                      <p className="text-xs text-slate-400 mt-0.5">{gap.description}</p>
                    )}
                    <div className="text-[11px] text-amber-300/80 font-mono mt-1">
                      Bridge: {gap.bridgeModule}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Pathway Flow: Current Skills -> Skill Gap -> Training -> Certification -> Opportunity */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 mb-8">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-3 text-center sm:text-left">
            Linear Progression Pipeline (कौशल से रोजगार तक का मार्ग)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center text-center">
            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
              <div className="text-xs font-bold text-white">Current Skills</div>
              <div className="text-[10px] text-emerald-400 font-mono">Equipment & Wire</div>
            </div>
            <div className="flex justify-center text-slate-500">
              <ArrowRight className="w-4 h-4 hidden sm:block text-amber-400" />
              <ChevronDown className="w-4 h-4 sm:hidden text-amber-400" />
            </div>
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="text-xs font-bold text-amber-300">Skill Gap</div>
              <div className="text-[10px] text-amber-400/80 font-mono">3 Targeted Modules</div>
            </div>
            <div className="flex justify-center text-slate-500">
              <ArrowRight className="w-4 h-4 hidden sm:block text-amber-400" />
              <ChevronDown className="w-4 h-4 sm:hidden text-amber-400" />
            </div>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
              <div className="text-xs font-bold text-cyan-300">NSQF Certified</div>
              <div className="text-[10px] text-cyan-400/80 font-mono">Level 3 · ₹18k/mo Job</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA to explore 3 recommendations */}
        {onExploreRecommendations && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="text-xs text-slate-400">
              Data verified against National Skills Qualification Framework repository.
            </div>
            <button
              onClick={onExploreRecommendations}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Explore NSQF Recommendations (सिफारिशें देखें)</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

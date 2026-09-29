import React from 'react';
import {
  Award,
  Clock,
  MapPin,
  TrendingUp,
  HelpCircle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Recommendation } from '../types';
import { StatusBadge } from './StatusBadge';

interface RecommendationCardProps {
  recommendation: Recommendation;
  onWhyThis: (rec: Recommendation) => void;
  onExplorePathway: (rec: Recommendation) => void;
  isSelected?: boolean;
  className?: string;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onWhyThis,
  onExplorePathway,
  isSelected = false,
  className,
}) => {
  return (
    <div
      className={cn(
        'group relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300',
        isSelected
          ? 'glass-card-active border-amber-500/80 ring-2 ring-amber-400/40 shadow-2xl shadow-amber-500/10 -translate-y-1'
          : 'glass-card-hover border-slate-700/80',
        className
      )}
    >
      {/* Top badges bar */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <StatusBadge
              label={String(recommendation.nsqfLevel)}
              variant="warning"
              size="sm"
              icon={<Award className="w-3.5 h-3.5" />}
            />
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {recommendation.duration}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <TrendingUp className="w-3 h-3" />
            <span>{recommendation.matchScore}% Match</span>
          </div>
        </div>

        {/* Course Title */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-amber-300 transition-colors">
          {recommendation.title}
        </h3>
        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
          {recommendation.description}
        </p>

        {/* Reason snippet */}
        <div className="mt-4 p-3 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            {typeof recommendation.reason === 'string'
              ? recommendation.reason
              : recommendation.reason.summaryExplanation || 'Optimal NSQF track matched to your profile.'}
          </span>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/5 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Estimated Wage</span>
            <span className="text-sm font-bold text-white mt-0.5 block">{recommendation.salaryRange}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Local Vacancies</span>
            <span className="text-sm font-bold text-emerald-400 mt-0.5 block flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {recommendation.opportunityAvailability}
            </span>
          </div>
        </div>

        {/* Relevant Skills vs Skill Gaps */}
        <div className="mt-4 space-y-2">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Leveraged Skills
            </span>
            <div className="flex flex-wrap gap-1.5">
              {recommendation.relevantSkills?.map((s, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-[11px] flex items-center gap-1"
                >
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Bridge Gaps
            </span>
            <div className="flex flex-wrap gap-1.5">
              {recommendation.skillGaps?.map((g, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-amber-950/40 border border-amber-800/40 text-amber-300 text-[11px] flex items-center gap-1"
                >
                  <AlertCircle className="w-2.5 h-2.5 text-amber-400" />
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons: Why This? & Explore Pathway */}
      <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-3">
        <button
          onClick={() => onWhyThis(recommendation)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full glass-card hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-all active:scale-95 border-slate-700"
        >
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>Why this?</span>
        </button>

        <button
          onClick={() => onExplorePathway(recommendation)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-amber-500/10 active:scale-95"
        >
          <span>Explore Pathway</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

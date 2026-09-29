import React from 'react';
import {
  CheckCircle2,
  Clock,
  CircleDot,
  ArrowRight,
  Sparkles,
  MapPin,
  Award,
  Briefcase,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { PathwayStage } from '../types';
import { StatusBadge } from './StatusBadge';

interface PathwayTimelineProps {
  stages: PathwayStage[];
  activeStageId?: string;
  onSelectStage?: (stage: PathwayStage) => void;
  className?: string;
}

export const PathwayTimeline: React.FC<PathwayTimelineProps> = ({
  stages,
  activeStageId,
  onSelectStage,
  className,
}) => {
  return (
    <div className={cn('w-full max-w-4xl mx-auto space-y-4', className)}>
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-mono font-semibold tracking-wider text-amber-300 uppercase">
              Action Layer · 7-Stage Livelihood Progression
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Your Livelihood Pathway
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            नामांकन से लेकर दीर्घकालिक रोजगार सत्यापन तक का स्पष्ट रोडमैप।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge label="GIA COMPONENT OF PM-AJAY" variant="info" size="sm" />
        </div>
      </div>

      {/* Interactive Vertical Timeline Nodes */}
      <div className="relative pl-6 sm:pl-10 space-y-6 before:absolute before:left-3.5 sm:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-emerald-400 before:via-amber-400 before:to-slate-700">
        {stages.map((stage, idx) => {
          const isCompleted = stage.status === 'completed';
          const isCurrent = stage.status === 'current';
          const isUpcoming = stage.status === 'upcoming';
          const isSelected = activeStageId === stage.id;

          return (
            <div
              key={stage.id}
              onClick={() => onSelectStage && onSelectStage(stage)}
              className={cn(
                'relative group cursor-pointer rounded-2xl p-5 sm:p-6 transition-all duration-300 border text-left',
                isSelected
                  ? 'bg-slate-900/90 border-amber-400 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/40'
                  : 'glass-card border-slate-800/80 hover:border-slate-600 hover:bg-slate-900/70',
                isCurrent && 'ring-1 ring-amber-400/30'
              )}
            >
              {/* Left Pin Indicator */}
              <div
                className={cn(
                  'absolute -left-6 sm:-left-10 top-6 w-7 h-7 rounded-full flex items-center justify-center border-2 shadow-lg transition-transform duration-200 group-hover:scale-110',
                  isCompleted
                    ? 'bg-emerald-500 border-emerald-300 text-slate-950 font-bold'
                    : isCurrent
                    ? 'bg-amber-400 border-amber-200 text-slate-950 font-extrabold pulse-mic-glow'
                    : 'bg-slate-900 border-slate-700 text-slate-500'
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                ) : isCurrent ? (
                  <CircleDot className="w-4 h-4 animate-spin" />
                ) : (
                  <span className="text-[11px] font-mono font-bold">{idx + 1}</span>
                )}
              </div>

              {/* Stage Content */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-slate-400">
                    STAGE {String(idx + 1).padStart(2, '0')}
                  </span>
                  {isCurrent && (
                    <StatusBadge
                      label="YOU ARE HERE"
                      variant="warning"
                      size="sm"
                      pulse
                    />
                  )}
                  {isCompleted && (
                    <StatusBadge label="COMPLETED" variant="success" size="sm" />
                  )}
                  {isUpcoming && (
                    <StatusBadge label="UPCOMING" variant="neutral" size="sm" />
                  )}
                </div>

                {stage.duration && (
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {stage.duration}
                  </span>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                {stage.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                {stage.description}
              </p>

              {/* Stage Key Milestones */}
              {stage.milestones && stage.milestones.length > 0 && (
                <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-2">
                  {stage.milestones.map((m, mIdx) => (
                    <span
                      key={mIdx}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{m}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

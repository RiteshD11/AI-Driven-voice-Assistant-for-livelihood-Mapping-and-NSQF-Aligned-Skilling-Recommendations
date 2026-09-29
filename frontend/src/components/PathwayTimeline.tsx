import React from 'react';
import {
  CheckCircle2,
  Clock,
  CircleDot,
  Circle,
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
    <div className={cn('w-full max-w-3xl mx-auto space-y-4', className)}>
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-5 border-b border-[#E7E7E3]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-amber-800 uppercase">
              Stage 05 · Guided Milestone Progression
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#181818] tracking-tight">
            YOUR LIVELIHOOD PATHWAY
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] mt-1">
            Step-by-step progression from profiling to long-term certified employment.
          </p>
        </div>

        <span className="self-start sm:self-auto text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
          PM-AJAY GIA Component
        </span>
      </div>

      {/* Interactive Vertical Timeline Nodes */}
      <div className="relative pl-7 sm:pl-10 space-y-5 before:absolute before:left-3.5 sm:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#E7E7E3]">
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
                'relative group cursor-pointer rounded-[20px] p-5 sm:p-6 transition-all duration-300 border text-left bg-white',
                isCurrent
                  ? 'border-amber-400 shadow-md ring-1 ring-amber-300'
                  : 'border-[#E7E7E3] hover:border-neutral-300 shadow-subtle',
                isSelected && 'border-amber-500'
              )}
            >
              {/* Left Pin Indicator */}
              <div
                className={cn(
                  'absolute -left-7 sm:-left-10 top-5 w-7 h-7 rounded-full flex items-center justify-center border-2 shadow-sm transition-transform duration-200 group-hover:scale-110',
                  isCompleted
                    ? 'bg-emerald-500 border-emerald-300 text-white font-bold'
                    : isCurrent
                    ? 'bg-amber-500 border-amber-200 text-white font-extrabold pulse-mic-glow'
                    : 'bg-white border-[#E7E7E3] text-[#8A8A8A]'
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                ) : isCurrent ? (
                  <CircleDot className="w-4 h-4" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-[#8A8A8A]" />
                )}
              </div>

              {/* Stage Content Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#8A8A8A]">
                    STAGE {String(idx + 1).padStart(2, '0')}
                  </span>
                  {isCurrent && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                      YOU ARE HERE
                    </span>
                  )}
                  {isCompleted && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      COMPLETED
                    </span>
                  )}
                  {isUpcoming && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-100 text-[#8A8A8A]">
                      UPCOMING
                    </span>
                  )}
                </div>

                {stage.duration && (
                  <span className="text-xs font-mono text-[#666666] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#8A8A8A]" />
                    {stage.duration}
                  </span>
                )}
              </div>

              {/* Stage Title */}
              <h3 className="text-base sm:text-lg font-bold text-[#181818] group-hover:text-amber-800 transition-colors">
                {stage.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#666666] mt-1 leading-relaxed">
                {stage.description}
              </p>

              {/* Stage Key Milestones */}
              {stage.milestones && stage.milestones.length > 0 && (
                <div className="mt-4 pt-3 border-t border-[#E7E7E3] flex flex-wrap gap-2">
                  {stage.milestones.map((m, mIdx) => (
                    <span
                      key={mIdx}
                      className="px-2.5 py-1 rounded-lg bg-neutral-50 border border-[#E7E7E3] text-[#181818] text-xs font-medium flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
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

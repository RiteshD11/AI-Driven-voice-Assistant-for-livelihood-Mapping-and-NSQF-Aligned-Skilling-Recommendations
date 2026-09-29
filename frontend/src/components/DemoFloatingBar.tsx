import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { DEMO_STEPS } from '../hooks/useDemoMode';

interface DemoFloatingBarProps {
  currentStepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onGoToStep: (index: number) => void;
  onClose: () => void;
  className?: string;
}

export const DemoFloatingBar: React.FC<DemoFloatingBarProps> = ({
  currentStepIndex,
  totalSteps,
  onNext,
  onPrev,
  onGoToStep,
  onClose,
  className,
}) => {
  const currentStep = DEMO_STEPS[currentStepIndex] || DEMO_STEPS[0];
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  return (
    <div className={cn('fixed bottom-4 left-0 right-0 z-50 px-4 max-w-4xl mx-auto', className)}>
      <div className="rounded-3xl glass-pill border border-amber-500/50 shadow-2xl p-4 sm:p-5 relative overflow-hidden backdrop-blur-2xl">
        {/* Top subtle progress bar line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-cyan-400 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: Step Info */}
          <div className="flex-1 text-left w-full sm:w-auto">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-[11px] font-mono font-bold text-amber-300 uppercase tracking-wider">
                EVALUATOR DEMO TOUR · STEP {currentStepIndex + 1} OF {totalSteps}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-[11px] font-mono text-cyan-300">{currentStep.stageName}</span>
            </div>

            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
              {currentStep.title}
            </h4>
            <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
              {currentStep.sihObjective}
            </p>
          </div>

          {/* Center / Right: Nav Controls */}
          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <button
              onClick={onPrev}
              disabled={currentStepIndex === 0}
              className="p-2 rounded-full glass-card hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none text-slate-300 transition-all"
              title="Previous Step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Quick Step Indicators (Dots) */}
            <div className="hidden md:flex items-center gap-1.5 px-2">
              {DEMO_STEPS.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => onGoToStep(idx)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-200',
                    idx === currentStepIndex
                      ? 'w-6 bg-amber-400'
                      : idx < currentStepIndex
                      ? 'bg-emerald-400'
                      : 'bg-slate-700 hover:bg-slate-500'
                  )}
                  title={`Jump to: ${step.title}`}
                />
              ))}
            </div>

            <button
              onClick={onNext}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              <span>{currentStepIndex === totalSteps - 1 ? 'Finish Tour' : 'Next Step'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors ml-1"
              title="Exit Demo Tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

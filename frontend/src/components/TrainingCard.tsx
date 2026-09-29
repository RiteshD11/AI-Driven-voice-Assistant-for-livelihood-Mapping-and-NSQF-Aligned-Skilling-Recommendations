import React from 'react';
import {
  Award,
  Clock,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { TrainingProgram } from '../types';

interface TrainingCardProps {
  training: TrainingProgram;
  onStartTraining?: () => void;
  className?: string;
}

export const TrainingCard: React.FC<TrainingCardProps> = ({
  training,
  onStartTraining,
  className,
}) => {
  return (
    <div
      className={cn(
        'w-full max-w-3xl mx-auto rounded-[24px] bg-white border border-[#E7E7E3] p-6 sm:p-9 shadow-card relative overflow-hidden text-left',
        className
      )}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#E7E7E3]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
              {String(training.nsqfLevel)}
            </span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              100% GIA Subsidy + Stipend
            </span>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8A8A8A] block">
            YOUR RECOMMENDED TRAINING
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#181818] tracking-tight mt-0.5">
            {training.title}
          </h2>
          <p className="text-xs text-[#666666] mt-1 font-mono">
            {training.sector} · Qualification Pack: {training.qualificationCode}
          </p>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-[16px] bg-neutral-50 border border-[#E7E7E3] shrink-0">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#8A8A8A] uppercase">Duration</span>
            <div className="text-sm font-bold text-[#181818]">{training.duration}</div>
          </div>
        </div>
      </div>

      {/* What You'll Build (Core Modules) */}
      <div className="mb-6">
        <h4 className="text-xs font-bold text-[#181818] uppercase tracking-wider mb-3">
          You'll build core capabilities:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            'Solar PV module mounting & rooftop installation',
            'Electrical safety & DC surge protection',
            'Inverter troubleshooting & maintenance',
            'Grid synchronisation & diagnostic testing',
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-[14px] bg-neutral-50 border border-[#E7E7E3] text-xs font-semibold text-[#181818] flex items-center gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Gap Bridge */}
      <div className="p-4 rounded-[18px] bg-amber-50/60 border border-amber-200/80 mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block mb-2">
          Your skill gap bridge:
        </span>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="p-2.5 rounded-xl bg-white border border-amber-200 flex-1">
            <span className="text-[10px] text-[#8A8A8A] uppercase block">Current Capability</span>
            <span className="font-bold text-[#181818]">Basic residential wiring & motor maintenance</span>
          </div>
          <ArrowRight className="w-4 h-4 text-amber-600 hidden sm:block shrink-0" />
          <div className="p-2.5 rounded-xl bg-white border border-amber-200 flex-1">
            <span className="text-[10px] text-[#8A8A8A] uppercase block">Required Competency</span>
            <span className="font-bold text-amber-800">Certified Solar PV Technician (Level 3)</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA to continue */}
      {onStartTraining && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#E7E7E3]">
          <div className="flex items-center gap-2 text-xs text-[#666666]">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Zero out-of-pocket cost. PM-AJAY covers 100% course fee and monthly stipend.</span>
          </div>
          <button
            onClick={onStartTraining}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Continue Pathway (आगे बढ़ें)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

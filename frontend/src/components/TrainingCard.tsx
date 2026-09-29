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
  ChevronDown,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { TrainingProgram } from '../types';
import { StatusBadge } from './StatusBadge';

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
        'w-full max-w-4xl mx-auto rounded-3xl glass-card border border-slate-700/80 p-6 sm:p-8 shadow-2xl relative overflow-hidden',
        className
      )}
    >
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-amber-400 to-emerald-400" />

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <StatusBadge label={String(training.nsqfLevel)} variant="warning" size="sm" />
            <StatusBadge label="GIA STIPEND ELIGIBLE" variant="success" size="sm" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {training.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {training.sector} · Qualification Pack: <span className="text-amber-300 font-mono">{training.qualificationCode}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/80 border border-slate-700 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">Duration</span>
            <div className="text-sm font-bold text-white">{training.duration}</div>
          </div>
        </div>
      </div>

      {/* Program Description & Key Highlights */}
      <p className="text-sm text-slate-300 mb-6 leading-relaxed">
        {training.description}
      </p>

      {/* Structured Bridge Flow: Current Skill -> Required Skill -> Training Module */}
      <div className="mb-8">
        <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
          Skill Bridge Architecture (हुनर से योग्यता तक की कड़ी)
        </h4>

        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
          {training.moduleBridgeMappings?.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2 md:w-1/3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span className="text-slate-300 font-medium">{item.currentSkill}</span>
              </div>
              <div className="flex items-center justify-center text-slate-500 md:w-12">
                <ArrowRight className="w-4 h-4 text-amber-400 hidden md:block" />
                <ChevronDown className="w-4 h-4 text-amber-400 md:hidden" />
              </div>
              <div className="flex items-center gap-2 md:w-1/3">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span className="text-amber-200 font-medium">{item.requiredSkill}</span>
              </div>
              <div className="flex items-center gap-2 md:w-1/3 p-2 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-200 font-mono text-[11px]">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{item.trainingModule}</span>
              </div>
            </div>
          )) || (
            <div className="text-xs text-slate-400">Loading module bridge mappings...</div>
          )}
        </div>
      </div>

      {/* Curriculum Modules Grid */}
      <div className="mb-8">
        <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
          Accredited Curriculum Modules (पाठ्यक्रम विवरण)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {training.modules.map(mod => (
            <div
              key={mod.id}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-white">{mod.title}</span>
                <span className="font-mono text-slate-400">{mod.hours} hrs</span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2">{mod.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA to enroll / start training */}
      {onStartTraining && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>PM-AJAY GIA coverage: 100% course fee subsidy + monthly attendance stipend.</span>
          </div>
          <button
            onClick={onStartTraining}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Start Training Path (प्रशिक्षण मार्ग शुरू करें)</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import {
  Mic,
  Volume2,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Calendar,
  Briefcase,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { EmploymentOutcome, FollowUp } from '../types';
import { StatusBadge } from './StatusBadge';

interface OutcomeCardProps {
  outcome: EmploymentOutcome;
  onVoiceFollowUp?: () => void;
  className?: string;
}

export const OutcomeCard: React.FC<OutcomeCardProps> = ({
  outcome,
  onVoiceFollowUp,
  className,
}) => {
  const [isSimulatingVoice, setIsSimulatingVoice] = useState(false);
  const [recordedSpokenText, setRecordedSpokenText] = useState(
    '“मी आता सोलर पॅनल इंस्टॉलेशनचं काम करतो. दरमहा १८,००० रुपये मिळतात.”'
  );

  const handleSimulateVoice = () => {
    setIsSimulatingVoice(true);
    setTimeout(() => {
      setIsSimulatingVoice(false);
      setRecordedSpokenText('“मी आता सोलर पॅनल इंस्टॉलेशनचं काम करतो. दरमहा १८,००० रुपये मिळतात.”');
      if (onVoiceFollowUp) onVoiceFollowUp();
    }, 1500);
  };

  return (
    <div
      className={cn(
        'w-full max-w-4xl mx-auto rounded-3xl glass-card border border-slate-700/80 p-6 sm:p-8 shadow-2xl relative overflow-hidden',
        className
      )}
    >
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-400" />

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
              Impact Layer · Longitudinal Outcome Verification
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            How is your new livelihood going?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            प्रशिक्षणानंतर तुमचा रोजगार कसा चालू आहे? आवाजात सांगून पडताळणी पूर्ण करा.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge label="VERIFIED PLACEMENT" variant="success" size="md" />
        </div>
      </div>

      {/* Primary Voice Action Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-transparent border border-amber-500/30 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center shrink-0 shadow-lg">
            <Mic className={cn('w-6 h-6', isSimulatingVoice && 'animate-pulse text-amber-200')} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Share Your Experience by Voice</h4>
            <p className="text-xs text-slate-300 mt-0.5 max-w-md">
              Tap the button to speak in Marathi, Hindi, or English. Our AI will automatically verify your livelihood status.
            </p>
          </div>
        </div>

        <button
          onClick={handleSimulateVoice}
          disabled={isSimulatingVoice}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 font-bold text-xs tracking-wide shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all shrink-0"
        >
          <Mic className="w-4 h-4" />
          <span>{isSimulatingVoice ? 'Listening...' : '🎙 Respond by Voice'}</span>
        </button>
      </div>

      {/* Voice Transcript & AI Extraction Card */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-700/80 p-5 mb-8">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            Recorded Beneficiary Voice Response (मराठी)
          </span>
          <StatusBadge label="SPEECH-TO-TEXT VERIFIED" variant="info" size="sm" />
        </div>
        <blockquote className="text-base font-medium text-amber-200 italic mb-4">
          {recordedSpokenText}
        </blockquote>

        {/* AI-Extracted Key Attributes */}
        <div className="pt-3 border-t border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
              AI-Extracted Outcome Parameters
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Employment Status</span>
              <span className="text-sm font-bold text-emerald-400 mt-0.5 block flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>{outcome.status}</span>
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Current Livelihood</span>
              <span className="text-sm font-bold text-white mt-0.5 block">
                {outcome.role}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Monthly Income</span>
              <span className="text-sm font-bold text-amber-300 mt-0.5 block">
                ₹{outcome.monthlyIncome.toLocaleString('en-IN')}/mo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Outcome Progression Timeline: Training -> Certification -> Job -> 30-day Follow-up -> 90-day Follow-up */}
      <div>
        <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-4">
          Outcome Milestones & Retention Audit
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
          <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/40">
            <div className="text-[10px] font-mono text-emerald-400 uppercase">Phase 1</div>
            <div className="text-xs font-bold text-white mt-0.5">Training Enrolled</div>
            <span className="text-[10px] text-slate-400">Completed</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/40">
            <div className="text-[10px] font-mono text-emerald-400 uppercase">Phase 2</div>
            <div className="text-xs font-bold text-white mt-0.5">Certification</div>
            <span className="text-[10px] text-slate-400">NSQF L3 Passed</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/40">
            <div className="text-[10px] font-mono text-emerald-400 uppercase">Phase 3</div>
            <div className="text-xs font-bold text-white mt-0.5">Job Placed</div>
            <span className="text-[10px] text-slate-400">SunPower Tech</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/40">
            <div className="text-[10px] font-mono text-emerald-400 uppercase">Phase 4</div>
            <div className="text-xs font-bold text-white mt-0.5">30-Day Check</div>
            <span className="text-[10px] text-emerald-400 font-semibold">Active & Retained</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700">
            <div className="text-[10px] font-mono text-amber-400 uppercase">Phase 5</div>
            <div className="text-xs font-bold text-slate-300 mt-0.5">90-Day Follow-up</div>
            <span className="text-[10px] text-slate-500">Scheduled in 45d</span>
          </div>
        </div>
      </div>
    </div>
  );
};

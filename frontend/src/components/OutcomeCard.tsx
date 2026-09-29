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
  ArrowRight,
  CircleDot,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { EmploymentOutcome } from '../types';

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
        'w-full max-w-3xl mx-auto rounded-[24px] bg-white border border-[#E7E7E3] p-6 sm:p-9 shadow-card relative overflow-hidden text-left',
        className
      )}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#E7E7E3]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-emerald-800 uppercase">
              Stage 08 · Post-Placement Verification
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#181818] tracking-tight">
            How is your new livelihood going?
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] mt-1">
            Speak to UNNATI in Marathi, Hindi, or English to confirm your current job status and earnings.
          </p>
        </div>

        <span className="self-start sm:self-auto text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          Verified Placement
        </span>
      </div>

      {/* Conversational Voice Action: 🎙 Tell UNNATI */}
      <div className="p-5 rounded-[20px] bg-neutral-50 border border-[#E7E7E3] mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Mic className={cn('w-6 h-6', isSimulatingVoice && 'animate-pulse')} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#181818]">Tell UNNATI about your work</h4>
            <p className="text-xs text-[#666666] mt-0.5">
              Press the button and share how your new job is going.
            </p>
          </div>
        </div>

        <button
          onClick={handleSimulateVoice}
          disabled={isSimulatingVoice}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs tracking-wide shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0"
        >
          <Mic className="w-4 h-4" />
          <span>{isSimulatingVoice ? 'Listening...' : '🎙 Tell UNNATI'}</span>
        </button>
      </div>

      {/* Beneficiary Voice Quote */}
      <div className="p-4 rounded-[18px] bg-amber-50/60 border border-amber-200/80 mb-6">
        <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block mb-1.5">
          User Voice (मराठी)
        </span>
        <p className="text-sm font-medium text-[#181818] italic">
          {recordedSpokenText}
        </p>
      </div>

      {/* UNNATI Understood Extraction Card */}
      <div className="p-5 rounded-[20px] bg-neutral-50/80 border border-[#E7E7E3] mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#181818]">
            UNNATI Understood
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-[14px] bg-white border border-[#E7E7E3]">
            <span className="text-[10px] uppercase font-bold text-[#8A8A8A] block">Employment</span>
            <span className="text-sm font-bold text-emerald-700 mt-0.5 block flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Employed</span>
            </span>
          </div>

          <div className="p-3 rounded-[14px] bg-white border border-[#E7E7E3]">
            <span className="text-[10px] uppercase font-bold text-[#8A8A8A] block">Role</span>
            <span className="text-sm font-bold text-[#181818] mt-0.5 block">
              {outcome.role || 'Solar Technician'}
            </span>
          </div>

          <div className="p-3 rounded-[14px] bg-white border border-[#E7E7E3]">
            <span className="text-[10px] uppercase font-bold text-[#8A8A8A] block">Status</span>
            <span className="text-sm font-bold text-[#181818] mt-0.5 block flex items-center gap-1.5">
              <CircleDot className="w-3.5 h-3.5 text-amber-600" />
              <span>Working (Active)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Next Follow-up Milestone */}
      <div className="flex items-center justify-between text-xs text-[#666666] pt-3 border-t border-[#E7E7E3]">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#8A8A8A]" />
          <span>Next automated voice check-in: <strong>30 days</strong></span>
        </div>
        <span className="font-mono text-[11px] text-emerald-700">Audit Code: AJAY-VER-901</span>
      </div>
    </div>
  );
};

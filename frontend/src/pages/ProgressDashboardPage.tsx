import React from 'react';
import {
  CheckCircle2,
  CircleDot,
  Clock,
  Award,
  Briefcase,
  BookOpen,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { cn } from '../lib/utils';

interface ProgressDashboardPageProps {
  onNavigateToVoice?: () => void;
  onNavigateToOpportunities?: () => void;
}

export const ProgressDashboardPage: React.FC<ProgressDashboardPageProps> = ({
  onNavigateToVoice,
  onNavigateToOpportunities,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Beneficiary Outcome Status
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#181818] tracking-tight mt-3">
          YOUR PROGRESS
        </h1>
        <p className="text-xs sm:text-sm text-[#666666] mt-1.5">
          Outcome-oriented view of your NSQF skilling, certification, and livelihood placement.
        </p>
      </div>

      {/* Main Clean Outcome-Oriented Card */}
      <div className="rounded-[24px] bg-white border border-[#E7E7E3] p-6 sm:p-9 shadow-card text-left space-y-4">
        {/* Item 1: Training */}
        <div className="p-4 sm:p-5 rounded-[18px] bg-neutral-50 border border-[#E7E7E3] flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A8A8A] block">
                Training
              </span>
              <span className="text-base font-bold text-[#181818]">
                Solar PV Technician (NSQF Level 3)
              </span>
              <span className="text-xs text-[#666666] block mt-0.5">
                3 months duration · Center: Hadapsar Industrial Skill Hub
              </span>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full shrink-0">
            ✓ Completed
          </span>
        </div>

        {/* Item 2: Certification */}
        <div className="p-4 sm:p-5 rounded-[18px] bg-neutral-50 border border-[#E7E7E3] flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
              <Award className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A8A8A] block">
                Certification
              </span>
              <span className="text-base font-bold text-[#181818]">
                NCVET National Skill Certificate
              </span>
              <span className="text-xs text-[#666666] block mt-0.5">
                Credential ID: NSQF-2026-SGJ-4982 · Digitally Verified
              </span>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full shrink-0">
            ✓ Certified
          </span>
        </div>

        {/* Item 3: Employment */}
        <div className="p-4 sm:p-5 rounded-[18px] bg-amber-50/60 border border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
                Employment
              </span>
              <span className="text-base font-bold text-[#181818]">
                Solar Technician at SunPower Tech Pune
              </span>
              <span className="text-xs text-[#666666] block mt-0.5">
                ₹18,000 / month · Wage Employment · 18 km from residence
              </span>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full shrink-0 flex items-center gap-1.5">
            <CircleDot className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>● Working</span>
          </span>
        </div>

        {/* Item 4: Follow-up */}
        <div className="p-4 sm:p-5 rounded-[18px] bg-neutral-50 border border-[#E7E7E3] flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-200">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A8A8A] block">
                Follow-up
              </span>
              <span className="text-base font-bold text-[#181818]">
                Next Automated Check-in: 30 Days
              </span>
              <span className="text-xs text-[#666666] block mt-0.5">
                UNNATI regional voice call to verify workplace retention & wage credit
              </span>
            </div>
          </div>
          <span className="text-xs font-bold text-sky-800 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full shrink-0">
            Scheduled
          </span>
        </div>
      </div>
    </div>
  );
};

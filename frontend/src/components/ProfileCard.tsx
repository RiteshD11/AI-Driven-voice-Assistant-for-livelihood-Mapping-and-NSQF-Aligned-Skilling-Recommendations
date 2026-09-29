import React from 'react';
import {
  GraduationCap,
  Briefcase,
  Wrench,
  Heart,
  Navigation,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { LivelihoodProfile, Beneficiary } from '../types';

interface ProfileCardProps {
  beneficiary?: Beneficiary | null;
  profile: LivelihoodProfile;
  onAnalyzeSkills?: () => void;
  className?: string;
  isDemo?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  beneficiary,
  profile,
  onAnalyzeSkills,
  className,
  isDemo = true,
}) => {
  return (
    <div
      className={cn(
        'w-full max-w-3xl mx-auto rounded-[24px] bg-white border border-[#E7E7E3] p-6 sm:p-9 shadow-card relative overflow-hidden',
        className
      )}
    >
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#E7E7E3]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-emerald-800 uppercase">
              Voice AI Profile Synthesized
            </span>
            {isDemo && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 text-[#666666] border border-[#E7E7E3] font-semibold">
                DEMO PROFILE
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#181818] tracking-tight">
            YOUR PROFILE
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] mt-1">
            Synthesized directly from your spoken conversation with UNNATI
          </p>
        </div>

        {beneficiary && (
          <div className="flex items-center gap-3 p-3 rounded-[16px] bg-neutral-50 border border-[#E7E7E3] shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
              {beneficiary.name.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-bold text-[#181818] flex items-center gap-1.5">
                <span>{beneficiary.name}</span>
                <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              </div>
              <div className="text-[11px] text-[#8A8A8A] font-mono">
                {beneficiary.category} · {beneficiary.age} Yrs · {beneficiary.district}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Human-Readable Profile Details */}
      <div className="space-y-4 mb-8">
        {/* Education & Current Livelihood */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-[16px] bg-neutral-50/70 border border-[#E7E7E3]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A8A8A]">
              Education
            </span>
            <div className="text-base font-bold text-[#181818] mt-1">{profile.education}</div>
            <span className="text-[11px] text-[#666666]">Formal schooling completed</span>
          </div>

          <div className="p-4 rounded-[16px] bg-neutral-50/70 border border-[#E7E7E3]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A8A8A]">
              Current Livelihood
            </span>
            <div className="text-base font-bold text-[#181818] mt-1">{profile.currentLivelihood}</div>
            <span className="text-[11px] text-[#666666]">Primary daily earning activity</span>
          </div>
        </div>

        {/* Existing Skills */}
        <div className="p-4 rounded-[16px] bg-neutral-50/70 border border-[#E7E7E3]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A8A8A] block mb-2">
            Skills (Innate & Practical)
          </span>
          <div className="flex flex-wrap gap-2">
            {profile.existingSkills.map((skill, idx) => {
              const skillName = typeof skill === 'string' ? skill : skill.name;
              return (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full bg-white border border-[#E7E7E3] text-[#181818] text-xs font-semibold flex items-center gap-1.5 shadow-subtle"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{skillName}</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Interests & Employment Preference */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-[16px] bg-neutral-50/70 border border-[#E7E7E3]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A8A8A]">
              Interests
            </span>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {profile.interests.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-md bg-white border border-[#E7E7E3] text-[#181818] text-xs font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-[16px] bg-neutral-50/70 border border-[#E7E7E3]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A8A8A]">
              Employment Preference
            </span>
            <div className="text-sm font-bold text-[#181818] mt-1.5 capitalize">
              {profile.employmentPreference === 'wage' ? 'Wage Employment' : 'Self-Employment'}
            </div>
            <span className="text-[11px] text-[#666666]">Monthly wage stability</span>
          </div>

          <div className="p-4 rounded-[16px] bg-neutral-50/70 border border-[#E7E7E3]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A8A8A]">
              Mobility
            </span>
            <div className="text-sm font-bold text-[#181818] mt-1.5">
              {profile.mobility || 'Up to 20 km'}
            </div>
            <span className="text-[11px] text-[#666666]">Acceptable commute distance</span>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      {onAnalyzeSkills && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-[#E7E7E3]">
          <div className="flex items-center gap-2 text-xs text-[#666666]">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Ready for NSQF Skill Gap Alignment Engine</span>
          </div>
          <button
            onClick={onAnalyzeSkills}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Analyze Skill Gap (कौशल अंतर देखें)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

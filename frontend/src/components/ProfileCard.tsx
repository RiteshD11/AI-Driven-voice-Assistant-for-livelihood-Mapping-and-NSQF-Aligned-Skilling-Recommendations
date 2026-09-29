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
} from 'lucide-react';
import { cn } from '../lib/utils';
import { LivelihoodProfile, Beneficiary } from '../types';
import { StatusBadge } from './StatusBadge';

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
        'w-full max-w-3xl mx-auto rounded-3xl glass-card border border-slate-700/80 p-6 sm:p-8 shadow-2xl relative overflow-hidden',
        className
      )}
    >
      {/* Decorative top accent gradient */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-cyan-400" />

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
              Voice AI Profile Synthesized
            </span>
            {isDemo && (
              <StatusBadge label="DEMO PROFILE" variant="warning" size="sm" />
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            We Understood Your Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            हमने आपकी बातचीत के आधार पर आपकी यह आजीविका प्रोफ़ाइल तैयार की है।
          </p>
        </div>

        {beneficiary && (
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 shrink-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 font-extrabold flex items-center justify-center text-base shadow-md">
              {beneficiary.name.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>{beneficiary.name}</span>
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {beneficiary.category} · {beneficiary.age} Yrs · {beneficiary.district}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Structured Key-Value Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-8">
        {/* Education */}
        <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Education (शिक्षा)</span>
            <div className="text-sm font-bold text-white mt-0.5">{profile.education}</div>
            <span className="text-[11px] text-slate-500">Formal schooling completed</span>
          </div>
        </div>

        {/* Current Livelihood */}
        <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Current Livelihood (वर्तमान कार्य)</span>
            <div className="text-sm font-bold text-white mt-0.5">{profile.currentLivelihood}</div>
            <span className="text-[11px] text-slate-500">Primary livelihood activity</span>
          </div>
        </div>

        {/* Existing Skills */}
        <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-3.5 sm:col-span-2">
          <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
            <Wrench className="w-5 h-5" />
          </div>
          <div className="w-full">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Existing Skills (मौजूदा हुनर)</span>
            <div className="flex flex-wrap gap-2 mt-1.5">
              {profile.existingSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-sky-950/60 border border-sky-700/40 text-sky-200 text-xs font-medium flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>{typeof skill === 'string' ? skill : skill.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Interests & Aspirations (रुचि)</span>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {profile.interests.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-md bg-rose-950/40 border border-rose-800/40 text-rose-200 text-xs"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Mobility Preference */}
        <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Mobility Tolerance (दूरी)</span>
            <div className="text-sm font-bold text-white mt-0.5">{profile.mobility}</div>
            <span className="text-[11px] text-slate-500">Commute preference for skilling</span>
          </div>
        </div>

        {/* Employment Preference */}
        <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Work Preference (रोजगार का प्रकार)</span>
            <div className="text-sm font-bold text-white mt-0.5 capitalize">
              {profile.employmentPreference === 'wage' ? 'Wage Employment (नौकरी)' : 'Self Employment (स्वरोजगार)'}
            </div>
            <span className="text-[11px] text-slate-500">Consistent monthly income priority</span>
          </div>
        </div>

        {/* Location */}
        <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Location (स्थान)</span>
            <div className="text-sm font-bold text-white mt-0.5">
              {typeof profile.location === 'string' ? profile.location : `${profile.location.district}, ${profile.location.state}`}
            </div>
            <span className="text-[11px] text-slate-500">PM-AJAY beneficiary cluster</span>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      {onAnalyzeSkills && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Ready for NSQF Skill Gap Alignment Engine</span>
          </div>
          <button
            onClick={onAnalyzeSkills}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Analyze My Skills (कौशल विश्लेषण करें)</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      )}
    </div>
  );
};

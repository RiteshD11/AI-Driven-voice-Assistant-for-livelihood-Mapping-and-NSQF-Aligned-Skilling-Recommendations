import React from 'react';
import {
  Mic,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Compass,
  Award,
  Briefcase,
  Users,
  ChevronDown,
  Volume2,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Play,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Language } from '../types';
import { translations } from '../hooks/useLanguage';
import { LanguageSelector } from '../components/LanguageSelector';
import { StatusBadge } from '../components/StatusBadge';

interface LandingPageProps {
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  onStartJourney: () => void;
  onExploreHowItWorks: () => void;
  onStartDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  currentLanguage,
  onSelectLanguage,
  onStartJourney,
  onExploreHowItWorks,
  onStartDemo,
}) => {
  const t = translations[currentLanguage];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-20 text-center flex flex-col items-center">
        {/* Subtle top badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold mb-6 animate-in fade-in duration-300">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>PM-AJAY GIA LIVELIHOOD ASSISTANT · SIH26097</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mb-6">
          Your skills have a story.{' '}
          <span className="gradient-text-gold block sm:inline">
            Let’s discover where they can take you.
          </span>
        </h1>

        {/* Hero Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          A voice-first livelihood assistant that helps SC beneficiaries discover their innate skills, bridge gaps with NSQF-aligned skilling, and connect to dignified local employment.
        </p>

        {/* Primary and Secondary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mb-12">
          <button
            onClick={onStartJourney}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 font-extrabold text-base tracking-wide shadow-2xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all"
          >
            <Mic className="w-5 h-5 stroke-[2.5]" />
            <span>{t.startJourney}</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            onClick={onStartDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full glass-card hover:bg-slate-800 text-slate-200 text-sm font-bold border border-slate-700 transition-all active:scale-95"
          >
            <Play className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>Try 2-Min Demo</span>
          </button>
        </div>

        {/* Flow Representation: Person -> Voice -> Skills -> Training -> Opportunity */}
        <div className="w-full max-w-4xl p-5 sm:p-6 rounded-3xl glass-card border border-slate-800/80 mb-16">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-4 text-center">
            The Livelihood Transformation Journey
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 items-center">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white">01. Beneficiary</span>
              <span className="text-[10px] text-slate-400 mt-0.5">SC Community</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-2">
                <Mic className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white">02. Voice AI</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Vernacular Dialog</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white">03. Skill Gap</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Target Assessment</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-2">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white">04. NSQF Skilling</span>
              <span className="text-[10px] text-slate-400 mt-0.5">100% GIA Funded</span>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-gradient-to-b from-amber-500/20 to-orange-500/10 border border-amber-500/40 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center mb-2 font-bold shadow-md">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-amber-300">05. Opportunity</span>
              <span className="text-[10px] text-slate-300 mt-0.5">₹18,000+/mo Job</span>
            </div>
          </div>
        </div>

        {/* Section 2: Multilingual Onboarding Card */}
        <div className="w-full max-w-3xl my-8">
          <LanguageSelector
            currentLanguage={currentLanguage}
            onSelectLanguage={onSelectLanguage}
            onProceed={onStartJourney}
          />
        </div>

        {/* Section 3: PM-AJAY High Impact Metrics */}
        <div className="w-full max-w-5xl mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="p-5 rounded-2xl glass-card border border-slate-800">
            <span className="text-[11px] font-mono uppercase text-slate-400">Target Coverage</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-mono">100%</div>
            <span className="text-xs text-slate-400 mt-0.5 block">SC Beneficiaries</span>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-slate-800">
            <span className="text-[11px] font-mono uppercase text-slate-400">NSQF Alignment</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1 font-mono">Levels 3-6</div>
            <span className="text-xs text-slate-400 mt-0.5 block">Accredited Tracks</span>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-slate-800">
            <span className="text-[11px] font-mono uppercase text-slate-400">GIA Subsidy</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1 font-mono">Zero Fee</div>
            <span className="text-xs text-slate-400 mt-0.5 block">+ Monthly Stipend</span>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-slate-800">
            <span className="text-[11px] font-mono uppercase text-slate-400">Outcome Auditing</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 mt-1 font-mono">30 & 90 Days</div>
            <span className="text-xs text-slate-400 mt-0.5 block">Voice-based Tracking</span>
          </div>
        </div>
      </section>
    </div>
  );
};

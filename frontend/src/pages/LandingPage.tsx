import React from 'react';
import {
  Mic,
  ArrowRight,
  Sparkles,
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
  Layers,
  ShieldCheck,
  Building2,
  FileCheck,
  Headphones,
  Check,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Language } from '../types';
import { translations } from '../hooks/useLanguage';
import { LanguageSelector } from '../components/LanguageSelector';
import { VoiceInteractionPreview } from '../components/VoiceInteractionPreview';

interface LandingPageProps {
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  onStartJourney: () => void;
  onExploreHowItWorks?: () => void;
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

  const workflowSteps = [
    {
      num: '01',
      title: 'LISTEN',
      subtitle: 'Natural Voice Dialogue',
      desc: 'Beneficiaries speak naturally in Hindi or Marathi about their existing skills, work history, and daily livelihood without typing.',
      icon: Headphones,
    },
    {
      num: '02',
      title: 'UNDERSTAND',
      subtitle: 'Aspiration & Mobility',
      desc: 'Extracts informal competencies, machinery familiarity, willingness to travel (up to 20 km), and wage vs self-employment preference.',
      icon: Users,
    },
    {
      num: '03',
      title: 'ASSESS',
      subtitle: 'Innate Capability Mapping',
      desc: 'Analyzes what the beneficiary can already do and maps capabilities against formal industry skill frameworks.',
      icon: Layers,
    },
    {
      num: '04',
      title: 'DISCOVER',
      subtitle: 'Skill Gap Bridge',
      desc: 'Transparently pinpoints the precise missing modules (e.g. electrical safety, solar inverters) needed for certified employment.',
      icon: Sparkles,
    },
    {
      num: '05',
      title: 'TRAIN',
      subtitle: 'NSQF Accredited Courses',
      desc: 'Recommends 100% GIA-subsidized training courses (NSQF Levels 3–6) with verified training centers, duration, and monthly stipends.',
      icon: Award,
    },
    {
      num: '06',
      title: 'CONNECT',
      subtitle: 'Local Livelihoods',
      desc: 'Connects directly with verified wage employment openings and self-employment toolkits located near the beneficiary.',
      icon: Briefcase,
    },
    {
      num: '07',
      title: 'TRACK',
      subtitle: '30 & 90-Day Follow-Up',
      desc: 'Automated regional voice calls check in after placement to verify wage retention, workplace dignity, and career progression.',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-16 text-center flex flex-col items-center">
        {/* Context label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E7E3] text-[#666666] text-xs font-semibold mb-6 shadow-subtle">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="tracking-wide">PM-AJAY · GIA · SIH26097</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#181818] tracking-tight leading-[1.12] max-w-4xl mb-6">
          Your skills have a story.{' '}
          <span className="text-amber-600 block sm:inline">
            Let’s discover where they can take you.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg md:text-xl text-[#666666] max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          A voice-first livelihood assistant that helps you discover your skills, identify suitable NSQF-aligned training, and connect with local livelihood opportunities.
        </p>

        {/* Primary and Secondary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md mb-14">
          <button
            onClick={onStartJourney}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-base tracking-wide shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Mic className="w-5 h-5 stroke-[2.2]" />
            <span>🎙 Start My Journey</span>
            <ArrowRight className="w-4 h-4 stroke-[2.2]" />
          </button>

          <button
            onClick={onStartDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white text-[#181818] text-sm font-bold border border-[#E7E7E3] shadow-subtle hover:bg-neutral-50 hover:border-neutral-300 transition-all active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>▶ Try 2-Minute Demo</span>
          </button>
        </div>

        {/* Voice-First Visual Centerpiece (Interactive Voice Simulation) */}
        <div className="w-full flex justify-center mb-16">
          <VoiceInteractionPreview
            currentLanguage={currentLanguage}
            onStartRealVoice={onStartJourney}
          />
        </div>

        {/* Visual Storytelling Flow: VOICE ↓ PROFILE ↓ SKILL GAP ↓ RECOMMENDATION ↓ TRAINING ↓ OPPORTUNITY ↓ OUTCOME */}
        <div className="w-full max-w-5xl bg-white border border-[#E7E7E3] rounded-[24px] p-6 sm:p-8 shadow-card mb-16 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#E7E7E3] gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                End-to-End Beneficiary Architecture
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#181818] mt-0.5">
                The Livelihood Transformation Journey
              </h2>
            </div>
            <div className="text-xs text-[#666666]">
              From first spoken word to sustainable income & 90-day tracking
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { step: 'VOICE', sub: 'Regional Speech', icon: Mic, color: 'text-amber-600 bg-amber-50' },
              { step: 'PROFILE', sub: 'Innate Skills', icon: Users, color: 'text-sky-600 bg-sky-50' },
              { step: 'SKILL GAP', sub: 'Bridge Analysis', icon: Layers, color: 'text-indigo-600 bg-indigo-50' },
              { step: 'RECOMMEND', sub: 'Explainable AI', icon: Sparkles, color: 'text-purple-600 bg-purple-50' },
              { step: 'TRAINING', sub: 'NSQF Accredited', icon: Award, color: 'text-emerald-600 bg-emerald-50' },
              { step: 'OPPORTUNITY', sub: 'Local Employment', icon: Briefcase, color: 'text-orange-600 bg-orange-50' },
              { step: 'OUTCOME', sub: 'Retention Audit', icon: TrendingUp, color: 'text-rose-600 bg-rose-50' },
            ].map((node, idx) => {
              const NodeIcon = node.icon;
              return (
                <div
                  key={node.step}
                  className="p-3.5 rounded-[18px] bg-neutral-50/70 border border-[#E7E7E3] flex flex-col items-center text-center hover:bg-white hover:shadow-subtle transition-all"
                >
                  <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center mb-2', node.color)}>
                    <NodeIcon className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span className="text-[11px] font-bold text-[#181818]">{node.step}</span>
                  <span className="text-[10px] text-[#8A8A8A] mt-0.5">{node.sub}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* "HOW UNNATI WORKS" SECTION: One conversation. One pathway. */}
        <div className="w-full max-w-5xl my-10 text-left">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
              How UNNATI Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#181818] tracking-tight mt-3">
              One conversation. One pathway.
            </h2>
            <p className="text-[#666666] text-sm sm:text-base mt-2">
              From informal experience to certified NSQF skilling and dignified local employment under PM-AJAY GIA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workflowSteps.map(st => {
              const StIcon = st.icon;
              return (
                <div
                  key={st.num}
                  className="bg-white border border-[#E7E7E3] rounded-[22px] p-6 shadow-subtle hover:shadow-card hover:border-neutral-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-[14px] bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200/60">
                        <StIcon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#8A8A8A]">
                        {st.num}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#181818]">{st.title}</h3>
                    <h4 className="text-xs font-semibold text-amber-700 mb-2">{st.subtitle}</h4>
                    <p className="text-xs text-[#666666] leading-relaxed">{st.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section: Multilingual Onboarding Selector */}
        <div className="w-full max-w-3xl my-12">
          <LanguageSelector
            currentLanguage={currentLanguage}
            onSelectLanguage={onSelectLanguage}
            onProceed={onStartJourney}
          />
        </div>

        {/* Section: PM-AJAY High Impact Metrics */}
        <div className="w-full max-w-5xl mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="p-5 rounded-[20px] bg-white border border-[#E7E7E3] shadow-subtle">
            <span className="text-[11px] font-bold uppercase text-[#8A8A8A]">Target Coverage</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#181818] mt-1 font-mono">100%</div>
            <span className="text-xs text-[#666666] mt-0.5 block">SC Beneficiaries</span>
          </div>

          <div className="p-5 rounded-[20px] bg-white border border-[#E7E7E3] shadow-subtle">
            <span className="text-[11px] font-bold uppercase text-[#8A8A8A]">NSQF Alignment</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1 font-mono">Levels 3–6</div>
            <span className="text-xs text-[#666666] mt-0.5 block">NCVET Accredited</span>
          </div>

          <div className="p-5 rounded-[20px] bg-white border border-[#E7E7E3] shadow-subtle">
            <span className="text-[11px] font-bold uppercase text-[#8A8A8A]">GIA Component</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1 font-mono">100% Subsidy</div>
            <span className="text-xs text-[#666666] mt-0.5 block">Zero Course Fees</span>
          </div>

          <div className="p-5 rounded-[20px] bg-white border border-[#E7E7E3] shadow-subtle">
            <span className="text-[11px] font-bold uppercase text-[#8A8A8A]">Outcome Auditing</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 mt-1 font-mono">30 & 90 Days</div>
            <span className="text-xs text-[#666666] mt-0.5 block">Voice-based Retention</span>
          </div>
        </div>
      </section>
    </div>
  );
};

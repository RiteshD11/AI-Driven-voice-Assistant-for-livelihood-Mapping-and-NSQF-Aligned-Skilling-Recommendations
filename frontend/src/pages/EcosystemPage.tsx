import React from 'react';
import {
  GraduationCap,
  Briefcase,
  Layers,
  Globe,
  Landmark,
  Compass,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { usePathway } from '../hooks/usePathway';
import { useRecommendations } from '../hooks/useRecommendations';
import { ECOSYSTEM_PLATFORMS, EcosystemPlatform } from '../data/ecosystemLinks';
import { EcosystemCard } from '../components/EcosystemCard';
import { PathwaySummary } from '../components/PathwaySummary';
import { WhyThesePlatforms } from '../components/WhyThesePlatforms';
import { NextStepsTimeline } from '../components/NextStepsTimeline';
import { TrustNotice } from '../components/TrustNotice';
import { LoadingState } from '../components/LoadingState';

interface EcosystemPageProps {
  onNavigateToPathway?: () => void;
  onNavigateToOpportunities?: () => void;
}

export const EcosystemPage: React.FC<EcosystemPageProps> = ({
  onNavigateToPathway,
  onNavigateToOpportunities,
}) => {
  const { pathway, training, loading: pathwayLoading } = usePathway('ben-sc-2026-001');
  const { recommendations, skillAssessment, loading: recsLoading } = useRecommendations('ben-sc-2026-001');

  // Determine current pathway characteristics for Section 3 context-aware actions
  const primaryRec = recommendations && recommendations.length > 0 ? recommendations[0] : null;
  const recommendedRole = pathway?.targetRole || primaryRec?.targetRole || 'Solar PV Technician';
  const skillGap = skillAssessment?.skillGaps?.[0]?.name || 'Advanced Wiring & Inverter Diagnostics';
  const suggestedNextStep = pathway?.stages?.find(s => s.status === 'current')?.title || 'NSQF-aligned training (Level 3)';
  const goal = pathway?.wageEmploymentOption?.roleTitle 
    ? `${pathway.wageEmploymentOption.roleTitle} (${pathway.wageEmploymentOption.salaryRange})`
    : 'Employment / Self-Employment (₹16,000 – ₹38,000/mo)';

  // Determine pathway orientation: training vs employment vs general
  const isTrainingOriented = Boolean(training || suggestedNextStep.toLowerCase().includes('training'));
  const isEmploymentOriented = Boolean(pathway?.wageEmploymentOption || pathway?.selfEmploymentOption);

  // Platform specific icon mapping
  const getPlatformIcon = (id: string) => {
    switch (id) {
      case 'sidh':
        return GraduationCap;
      case 'ncs':
        return Briefcase;
      case 'nsdc':
        return Layers;
      case 'bhashini':
        return Globe;
      case 'pmajay':
        return Landmark;
      default:
        return ExternalLink;
    }
  };

  // Section 3: Context-aware action text based on pathway state
  const getContextAwareActionLabel = (platform: EcosystemPlatform): string => {
    if (platform.id === 'sidh') {
      if (isTrainingOriented) return 'EXPLORE RELEVANT TRAINING →';
      return 'EXPLORE COURSES →';
    }
    if (platform.id === 'ncs') {
      if (isEmploymentOriented) return 'EXPLORE EMPLOYMENT OPPORTUNITIES →';
      return 'FIND OPPORTUNITIES →';
    }
    if (platform.id === 'nsdc') {
      return 'VIEW STANDARDS →';
    }
    if (platform.id === 'bhashini') {
      return 'EXPLORE BHASHINI →';
    }
    if (platform.id === 'pmajay') {
      return 'LEARN ABOUT PM-AJAY →';
    }
    return platform.defaultActionLabel;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col items-center space-y-10">
      {/* Page Title & Subtitle */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-semibold mb-3">
          <Compass className="w-3.5 h-3.5 text-amber-600" />
          <span>External Ecosystem Gateway</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#181818] tracking-tight uppercase">
          OFFICIAL ECOSYSTEM CONNECT
        </h1>

        <p className="text-sm sm:text-base text-[#666666] mt-3 font-medium leading-relaxed">
          Continue your personalized pathway through trusted official skilling, employment and language platforms.
        </p>

        <p className="text-xs text-[#8A8A8A] mt-1.5 italic">
          “UNNATIAI provides the personalized pathway. External services open on their official platforms.”
        </p>
      </div>

      {/* SECTION 1: Pathway Summary */}
      <PathwaySummary
        recommendedRole={recommendedRole}
        skillGap={skillGap}
        suggestedNextStep={suggestedNextStep}
        goal={goal}
        onExplorePathway={onNavigateToPathway}
        hasCustomPathway={Boolean(pathway || primaryRec)}
      />

      {/* SECTION 2: Official Ecosystem Cards (3 + 2 Grid) */}
      <div className="w-full max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-6 border-b border-[#E7E7E3] gap-2 text-left">
          <div>
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-amber-800">
              TRUSTED PLATFORMS
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#181818] tracking-tight">
              Official Ecosystem Portals
            </h2>
          </div>
          <div className="text-xs text-[#666666]">
            5 Official External Gateways · Opens in New Tab
          </div>
        </div>

        {/* Desktop 3 + 2 layout / Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ECOSYSTEM_PLATFORMS.slice(0, 3).map(platform => (
            <EcosystemCard
              key={platform.id}
              platform={platform}
              icon={getPlatformIcon(platform.id)}
              actionLabel={getContextAwareActionLabel(platform)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {ECOSYSTEM_PLATFORMS.slice(3, 5).map(platform => (
            <EcosystemCard
              key={platform.id}
              platform={platform}
              icon={getPlatformIcon(platform.id)}
              actionLabel={getContextAwareActionLabel(platform)}
            />
          ))}
        </div>
      </div>

      {/* SECTION 4: Why These Platforms? */}
      <WhyThesePlatforms />

      {/* SECTION 6: Optional Your Next Steps Timeline */}
      <NextStepsTimeline />

      {/* SECTION 5: Trust / Disclaimer Notice */}
      <TrustNotice />

      {/* Navigation CTA: Back to Pathway or Opportunities */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E7E7E3]">
        {onNavigateToPathway && (
          <button
            onClick={onNavigateToPathway}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white border border-[#E7E7E3] text-[#181818] font-bold text-xs hover:bg-neutral-50 transition-all shadow-subtle"
          >
            <span>← Return to Livelihood Pathway</span>
          </button>
        )}

        {onNavigateToOpportunities && (
          <button
            onClick={onNavigateToOpportunities}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Explore District Opportunities</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

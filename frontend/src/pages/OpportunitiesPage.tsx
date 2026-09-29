import React, { useState } from 'react';
import {
  MapPin,
  Briefcase,
  Store,
  Navigation,
  Sparkles,
  ArrowRight,
  Filter,
  Info,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { usePathway } from '../hooks/usePathway';
import { OpportunityCard } from '../components/OpportunityCard';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { Opportunity } from '../types';

interface OpportunitiesPageProps {
  onProceedToFollowUp: () => void;
}

export const OpportunitiesPage: React.FC<OpportunitiesPageProps> = ({
  onProceedToFollowUp,
}) => {
  const { opportunities, loading, error, refresh } = usePathway('ben-sc-2026-001');
  const [activeTab, setActiveTab] = useState<'wage' | 'self_employed'>('wage');
  const [distanceFilter, setDistanceFilter] = useState<number>(25);

  if (loading) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-12">
        <LoadingState
          message="Scanning local livelihood opportunities..."
          subtext="Mapping vacancies across Pune and Pimpri-Chinchwad industrial clusters."
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-12">
        <ErrorState
          title="Could not fetch opportunities"
          message={error}
          onRetry={refresh}
        />
      </div>
    );
  }

  const filteredOpportunities = opportunities.filter(opp => {
    const isWage =
      opp.employmentType === 'wage' ||
      opp.employmentType === 'full_time' ||
      opp.employmentType === 'part_time' ||
      opp.employmentType === 'contract';
    const isSelfEmployed =
      opp.employmentType === 'self_employed' || opp.employmentType === 'micro_enterprise';
    const matchType = activeTab === 'wage' ? isWage : isSelfEmployed;
    const matchDistance = (opp.distanceKm || 18) <= distanceFilter;
    return matchType && matchDistance;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col items-center">
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-semibold mb-3">
          <Navigation className="w-3.5 h-3.5 text-amber-600" />
          <span>Hyperlocal Livelihood Matching</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#181818] tracking-tight">
          Opportunities near you
        </h2>
        <p className="text-xs sm:text-sm text-[#666666] mt-2">
          Based on your skills, pathway and preferred travel distance.
        </p>
      </div>

      {/* Demo Simulation Notice */}
      <div className="w-full max-w-4xl p-3.5 rounded-[16px] bg-amber-50/70 border border-amber-200/80 mb-6 flex items-start gap-2.5 text-xs text-amber-900 text-left">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span>
          <strong>DEMO DATA:</strong> The listings below represent simulated opportunities mapped to PM-AJAY GIA partner employers in the Pune cluster within your 20 km travel preference.
        </span>
      </div>

      {/* Dual Mode Switcher: Wage Employment vs Self Employment */}
      <div className="w-full max-w-4xl mb-8 flex items-center justify-between gap-4 p-2 rounded-2xl bg-white border border-[#E7E7E3] shadow-subtle flex-wrap">
        <div className="flex items-center gap-2 px-2 text-xs font-semibold text-[#666666]">
          <MapPin className="w-4 h-4 text-amber-600" />
          <span>Pune Cluster · Radius: Up to 20 km</span>
        </div>

        <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-full">
          <button
            onClick={() => setActiveTab('wage')}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all',
              activeTab === 'wage'
                ? 'bg-white text-[#181818] shadow-sm'
                : 'text-[#666666] hover:text-[#181818]'
            )}
          >
            <Briefcase className="w-3.5 h-3.5 text-amber-600" />
            <span>Wage Employment</span>
          </button>

          <button
            onClick={() => setActiveTab('self_employed')}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all',
              activeTab === 'self_employed'
                ? 'bg-white text-[#181818] shadow-sm'
                : 'text-[#666666] hover:text-[#181818]'
            )}
          >
            <Store className="w-3.5 h-3.5 text-emerald-600" />
            <span>Self-Employment</span>
          </button>
        </div>
      </div>

      {/* Self-Employment Pathway Details (When Selected) */}
      {activeTab === 'self_employed' && (
        <div className="w-full max-w-4xl mb-8 rounded-[22px] bg-white border border-[#E7E7E3] p-6 shadow-subtle text-left animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E7E7E3]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Enterprise & Micro-Business Track
              </span>
              <h3 className="text-xl font-bold text-[#181818]">
                Solar Rooftop Installation & Maintenance Micro-Enterprise
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              GIA Tool Kit & Seed Capital
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-[14px] bg-neutral-50 border border-[#E7E7E3]">
              <span className="text-[#8A8A8A] font-bold uppercase block mb-1">Required Skills</span>
              <p className="text-[#181818]">Rooftop panel alignment, inverter circuit integration, basic bookkeeping.</p>
            </div>
            <div className="p-3.5 rounded-[14px] bg-neutral-50 border border-[#E7E7E3]">
              <span className="text-[#8A8A8A] font-bold uppercase block mb-1">Kit Provided</span>
              <p className="text-[#181818]">Insulated tool kit, digital clamp meter, safety harness, transport allowance.</p>
            </div>
            <div className="p-3.5 rounded-[14px] bg-neutral-50 border border-[#E7E7E3]">
              <span className="text-[#8A8A8A] font-bold uppercase block mb-1">Projected Earnings</span>
              <p className="text-emerald-700 font-bold font-mono text-sm">₹25,000 – ₹35,000 / month</p>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Verified Opportunities */}
      {filteredOpportunities.length === 0 ? (
        <EmptyState
          title="No opportunities found"
          message="No matching roles within your preferred distance radius."
          actionLabel="Reset Filter Radius"
          onAction={() => setDistanceFilter(30)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">
          {filteredOpportunities.map(opp => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      )}

      {/* Bottom CTA to proceed to follow-up */}
      <div className="w-full flex justify-end">
        <button
          onClick={onProceedToFollowUp}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span>Proceed to Outcome Follow-Up (प्रगति सत्यापन)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

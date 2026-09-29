import React, { useState } from 'react';
import {
  MapPin,
  Briefcase,
  Store,
  Navigation,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  Clock,
  Layers,
  Wrench,
  DollarSign,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { usePathway } from '../hooks/usePathway';
import { OpportunityCard } from '../components/OpportunityCard';
import { StatusBadge } from '../components/StatusBadge';
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
          message="Scanning verified local livelihood opportunities..."
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
    const isWage = opp.employmentType === 'wage' || opp.employmentType === 'full_time' || opp.employmentType === 'part_time' || opp.employmentType === 'contract';
    const isSelfEmployed = opp.employmentType === 'self_employed' || opp.employmentType === 'micro_enterprise';
    const matchType = activeTab === 'wage' ? isWage : isSelfEmployed;
    const matchDistance = opp.distanceKm <= distanceFilter;
    return matchType && matchDistance;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col items-center">
      {/* Progress Step */}
      <div className="w-full max-w-xl mb-6">
        <ProgressIndicator
          current={7}
          total={8}
          label="Hyperlocal Opportunities"
          variant="amber"
        />
      </div>

      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-3">
          <Navigation className="w-3.5 h-3.5" />
          <span>Hyperlocal Livelihood Matching Engine</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Opportunities Around You
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          आपके घर के 25 किमी के दायरे में उपलब्ध नौकरी एवं स्वरोजगार के अवसर।
        </p>
      </div>

      {/* Map-Inspired Stylized Radar Bar */}
      <div className="w-full rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>Cluster: Pune & Pimpri-Chinchwad</span>
              <StatusBadge label="ACTIVE CLUSTER" variant="info" size="sm" />
            </div>
            <div className="text-xs text-slate-400">
              Center: Baramati / Hadapsar Sector · 20 km Mobility Tolerance
            </div>
          </div>
        </div>

        {/* Dual Mode Switcher: Wage Employment vs Self Employment */}
        <div className="flex items-center p-1 rounded-full bg-slate-950 border border-slate-800 self-stretch sm:self-auto">
          <button
            onClick={() => setActiveTab('wage')}
            className={cn(
              'flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all',
              activeTab === 'wage'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            )}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Wage Employment (नौकरी)</span>
          </button>

          <button
            onClick={() => setActiveTab('self_employed')}
            className={cn(
              'flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all',
              activeTab === 'self_employed'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            )}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Self-Employment (स्वरोजगार)</span>
          </button>
        </div>
      </div>

      {/* Self-Employment Pathway Details (When Selected) */}
      {activeTab === 'self_employed' && (
        <div className="w-full mb-8 rounded-3xl glass-card border border-cyan-500/30 p-6 sm:p-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300">Enterprise Track</span>
              <h3 className="text-xl font-bold text-white">Solar Rooftop Installation & Maintenance Micro-Enterprise</h3>
            </div>
            <StatusBadge label="GIA SEED CAPITAL ELIGIBLE" variant="success" size="sm" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 uppercase font-mono block mb-1">Required Skills</span>
              <p className="text-slate-200">Rooftop panel alignment, inverter circuit integration, basic bookkeeping.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 uppercase font-mono block mb-1">Setup Requirements</span>
              <p className="text-slate-200">Tool kit (insulated wrenches, multimeter), transport 2-wheeler, GST registration.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 uppercase font-mono block mb-1">Projected Earnings</span>
              <p className="text-emerald-400 font-bold font-mono text-sm">₹25,000 - ₹35,000 / month</p>
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
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
            />
          ))}
        </div>
      )}

      {/* Bottom CTA to proceed to post-placement follow-up */}
      <div className="w-full flex justify-end">
        <button
          onClick={onProceedToFollowUp}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
        >
          <span>Proceed to Post-Placement Follow-up (प्रगति सत्यापन)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

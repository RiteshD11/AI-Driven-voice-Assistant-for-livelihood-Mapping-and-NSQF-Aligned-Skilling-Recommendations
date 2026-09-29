import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  Award,
  Briefcase,
  Store,
  PhoneCall,
  Search,
  Filter,
  Eye,
  X,
  CheckCircle2,
  Calendar,
  MapPin,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  Download,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAdmin } from '../hooks/useAdmin';
import { StatCard } from '../components/StatCard';
import { AnalyticsChart } from '../components/AnalyticsChart';
import { StatusBadge } from '../components/StatusBadge';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { Beneficiary } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const {
    overview,
    skillGapAnalytics,
    trainingDemand,
    regionalData,
    outcomeAnalytics,
    beneficiaries,
    selectedBeneficiary,
    isDetailDrawerOpen,
    openBeneficiaryDetail,
    closeBeneficiaryDetail,
    filterDistrict,
    setFilterDistrict,
    filterStatus,
    setFilterStatus,
    loading,
    error,
    refresh,
  } = useAdmin();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'beneficiaries' | 'analytics'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <LoadingState
          message="Loading PM-AJAY Livelihood Intelligence Platform..."
          subtext="Aggregating skilling statistics, district cluster enrollments, and outcome tracking."
        />
      </div>
    );
  }

  if (error || !overview) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <ErrorState
          title="Could not load admin dashboard"
          message={error || 'Unable to connect to GIA data store.'}
          onRetry={refresh}
        />
      </div>
    );
  }

  const searchedBeneficiaries = beneficiaries.filter(b => {
    return (
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const outcomePieData = [
    { name: 'Employed (Wage)', value: overview.employed },
    { name: 'Self-Employed (Enterprise)', value: overview.selfEmployed },
    { name: 'Currently in Skilling', value: overview.trainingEnrolled - (overview.employed + overview.selfEmployed) },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8 text-left">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
              03 — GOVERN · PM-AJAY Livelihood Intelligence Platform
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Governance & Outcome Oversight
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time monitoring of SC beneficiary enrollment, skill gaps, NSQF certifications, and 90-day retention.
          </p>
        </div>

        {/* Admin Navigation Pills */}
        <div className="flex items-center gap-2 p-1 rounded-full bg-slate-900 border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setActiveAdminTab('overview')}
            className={cn(
              'px-4 py-1.5 rounded-full text-xs font-bold transition-all',
              activeAdminTab === 'overview'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            )}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveAdminTab('beneficiaries')}
            className={cn(
              'px-4 py-1.5 rounded-full text-xs font-bold transition-all',
              activeAdminTab === 'beneficiaries'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            )}
          >
            Beneficiaries ({beneficiaries.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('analytics')}
            className={cn(
              'px-4 py-1.5 rounded-full text-xs font-bold transition-all',
              activeAdminTab === 'analytics'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            )}
          >
            Analytics & Clusters
          </button>
        </div>
      </div>

      {/* Top 6 Standard Metrics as mandated in requirement #24 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <StatCard
          label="Profiled"
          value={overview.totalProfiled}
          subtext="Beneficiaries Profiled"
          icon={<Users className="w-4 h-4" />}
          variant="amber"
          trend={{ value: '+14%', isPositive: true }}
        />

        <StatCard
          label="Enrolled"
          value={overview.trainingEnrolled}
          subtext="Training Enrolled"
          icon={<GraduationCap className="w-4 h-4" />}
          variant="cyan"
          trend={{ value: '+22%', isPositive: true }}
        />

        <StatCard
          label="Certified"
          value={overview.certified}
          subtext="NSQF Certified"
          icon={<Award className="w-4 h-4" />}
          variant="emerald"
          trend={{ value: '+8%', isPositive: true }}
        />

        <StatCard
          label="Employed"
          value={overview.employed}
          subtext="Wage Employed"
          icon={<Briefcase className="w-4 h-4" />}
          variant="purple"
          trend={{ value: '+18%', isPositive: true }}
        />

        <StatCard
          label="Self-Employed"
          value={overview.selfEmployed}
          subtext="Micro-Enterprises"
          icon={<Store className="w-4 h-4" />}
          variant="amber"
          trend={{ value: '+6%', isPositive: true }}
        />

        <StatCard
          label="Follow-up Req."
          value={overview.followUpRequired}
          subtext="Verification Pending"
          icon={<PhoneCall className="w-4 h-4" />}
          variant="slate"
        />
      </div>

      {/* Tab 1: Overview Tab */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnalyticsChart
              title="Skill Gaps Identified vs. Bridged in Training"
              subtitle="Comparison of high-priority vocational gaps across SC clusters"
              type="bar"
              data={skillGapAnalytics}
            />

            <AnalyticsChart
              title="Vocational Training Demand vs. Industry Vacancies"
              subtitle="Alignment between enrolled candidates and market demand"
              type="demand-bar"
              data={trainingDemand}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnalyticsChart
              title="Post-Skilling Livelihood Distribution"
              subtitle="Ratio of wage employment to enterprise creation"
              type="pie"
              data={outcomePieData}
            />

            <AnalyticsChart
              title="Regional Skilling Density (Maharashtra Clusters)"
              subtitle="Enrollment and employment progression by district"
              type="line"
              data={regionalData}
            />
          </div>
        </div>
      )}

      {/* Tab 2: Beneficiaries Table Tab */}
      {activeAdminTab === 'beneficiaries' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-card border border-slate-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name, district, or ID..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={filterDistrict}
                onChange={e => setFilterDistrict(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="all">All Districts</option>
                <option value="pune">Pune</option>
                <option value="solapur">Solapur</option>
                <option value="satara">Satara</option>
                <option value="kolhapur">Kolhapur</option>
              </select>

              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="all">All Statuses</option>
                <option value="profiled">Profiled</option>
                <option value="assessed">Assessed</option>
                <option value="recommended">Recommended</option>
                <option value="enrolled">Enrolled</option>
                <option value="certified">Certified</option>
                <option value="placed">Placed</option>
              </select>
            </div>
          </div>

          {/* Beneficiaries Table */}
          <div className="rounded-3xl glass-card border border-slate-800 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/90 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Beneficiary</th>
                    <th className="py-3.5 px-4">District</th>
                    <th className="py-3.5 px-4">Current Livelihood</th>
                    <th className="py-3.5 px-4">Target NSQF Track</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {searchedBeneficiaries.map(ben => (
                    <tr
                      key={ben.id}
                      className="hover:bg-slate-850/50 transition-colors cursor-pointer"
                      onClick={() => openBeneficiaryDetail(ben)}
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{ben.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{ben.id} · Age {ben.age}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{ben.district}, MH</td>
                      <td className="py-3.5 px-4 text-slate-300">{ben.currentLivelihood || 'Agriculture'}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-amber-300">{ben.targetRole || 'Solar PV Technician'}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge
                          label={ben.status || 'profiled'}
                          variant={
                            ben.status === 'placed' ? 'success' :
                            ben.status === 'certified' ? 'info' :
                            ben.status === 'enrolled' ? 'warning' : 'neutral'
                          }
                          size="sm"
                        />
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            openBeneficiaryDetail(ben);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Detailed Analytics & Clusters */}
      {activeAdminTab === 'analytics' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnalyticsChart
              title="Regional SC Beneficiary Skilling Progress"
              subtitle="Monthly progress across rural clusters"
              type="line"
              data={regionalData}
            />

            <AnalyticsChart
              title="Demand vs. Supply Alignment"
              subtitle="Vacancies vs training batch completions"
              type="demand-bar"
              data={trainingDemand}
            />
          </div>
        </div>
      )}

      {/* Beneficiary Admin Detail Drawer (Requirement #26) */}
      {isDetailDrawerOpen && selectedBeneficiary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl glass-card border border-cyan-500/40 p-6 sm:p-8 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-amber-400 to-emerald-400" />

            <button
              onClick={closeBeneficiaryDetail}
              className="absolute top-5 right-5 p-2 rounded-full glass-card hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 pb-6 mb-6 border-b border-slate-800">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg">
                {selectedBeneficiary.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-extrabold text-white">{selectedBeneficiary.name}</h3>
                  <StatusBadge label={selectedBeneficiary.status || 'profiled'} variant="success" size="sm" />
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  ID: {selectedBeneficiary.id} · {selectedBeneficiary.category} · {selectedBeneficiary.district}, Maharashtra
                </div>
              </div>
            </div>

            {/* Timeline: Profiled ↓ Recommended ↓ Training Enrolled ↓ Certified ↓ Placed ↓ Follow-up */}
            <div className="mb-6">
              <span className="text-xs font-mono uppercase text-slate-400 tracking-wider block mb-3">
                Beneficiary Lifecycle Progression
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                  <div className="text-[10px] text-emerald-400 font-bold">1. PROFILED</div>
                  <div className="text-slate-300 font-medium mt-0.5">Verified</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                  <div className="text-[10px] text-emerald-400 font-bold">2. RECOMMENDED</div>
                  <div className="text-slate-300 font-medium mt-0.5">NSQF L3</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                  <div className="text-[10px] text-emerald-400 font-bold">3. ENROLLED</div>
                  <div className="text-slate-300 font-medium mt-0.5">Batch #42</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                  <div className="text-[10px] text-emerald-400 font-bold">4. CERTIFIED</div>
                  <div className="text-slate-300 font-medium mt-0.5">Grade A</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                  <div className="text-[10px] text-emerald-400 font-bold">5. PLACED</div>
                  <div className="text-slate-300 font-medium mt-0.5">SunPower</div>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30">
                  <div className="text-[10px] text-amber-300 font-bold">6. FOLLOW-UP</div>
                  <div className="text-amber-200 font-medium mt-0.5">Retained</div>
                </div>
              </div>
            </div>

            {/* Sections Grid: Profile, Skills, Skill Gaps, Training, Employment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-6">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 uppercase font-mono block mb-1">Education & Background</span>
                <p className="text-slate-200 font-semibold">{selectedBeneficiary.education || '10th Pass'}</p>
                <span className="text-slate-500 block mt-1">Livelihood: {selectedBeneficiary.currentLivelihood}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 uppercase font-mono block mb-1">Target Qualification</span>
                <p className="text-amber-300 font-semibold">{selectedBeneficiary.targetRole || 'Solar PV Technician'}</p>
                <span className="text-slate-500 block mt-1">NSQF Level 3 · 3 Months Duration</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={closeBeneficiaryDetail}
                className="px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

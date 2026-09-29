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
  AlertTriangle,
  ArrowRight,
  Compass,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAdmin } from '../hooks/useAdmin';
import { StatCard } from '../components/StatCard';
import { AnalyticsChart } from '../components/AnalyticsChart';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { Beneficiary } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const {
    overview,
    skillGapAnalytics,
    trainingDemand,
    regionalData,
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

  const [activeAdminTab, setActiveAdminTab] = useState<
    'overview' | 'beneficiaries' | 'skill_gaps' | 'training' | 'opportunities' | 'outcomes' | 'follow_up'
  >('overview');
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <LoadingState
          message="Loading UNNATI Livelihood Intelligence..."
          subtext="Aggregating skilling statistics, district cluster enrollments, and outcome tracking."
        />
      </div>
    );
  }

  if (error || !overview) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <ErrorState
          title="Could not load admin intelligence"
          message={error || 'Unable to connect to PM-AJAY GIA data store.'}
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
    {
      name: 'Currently in Skilling',
      value: overview.trainingEnrolled - (overview.employed + overview.selfEmployed),
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-7 text-left">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E7E7E3]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-amber-800 uppercase">
              PM-AJAY GIA Component Monitoring & Analytics
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#181818] tracking-tight">
            UNNATI · Livelihood Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
            Real-time governance of SC beneficiary profiling, skill gaps, NSQF certifications, and 90-day retention audits.
          </p>
        </div>

        {/* Admin Navigation Pills */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-neutral-100 border border-[#E7E7E3] self-start md:self-auto overflow-x-auto max-w-full">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'beneficiaries', label: `Beneficiaries (${beneficiaries.length})` },
            { id: 'skill_gaps', label: 'Skill Gaps' },
            { id: 'training', label: 'Training' },
            { id: 'opportunities', label: 'Opportunities' },
            { id: 'outcomes', label: 'Outcomes' },
            { id: 'follow_up', label: 'Follow-up' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={cn(
                'px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all',
                activeAdminTab === tab.id
                  ? 'bg-white text-[#181818] shadow-sm font-bold'
                  : 'text-[#666666] hover:text-[#181818]'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Actionable Intelligence Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-[18px] bg-amber-50 border border-amber-200/80 flex items-center justify-between gap-3 shadow-subtle">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#181818]">
                211 beneficiaries need 30-day follow-up
              </div>
              <div className="text-[11px] text-[#666666]">
                Automated regional voice check-in queue ready for trigger
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveAdminTab('follow_up')}
            className="text-xs font-bold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1 shrink-0"
          >
            <span>View beneficiaries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-4 rounded-[18px] bg-sky-50 border border-sky-200/80 flex items-center justify-between gap-3 shadow-subtle">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#181818]">
                High demand for Solar PV training
              </div>
              <div className="text-[11px] text-[#666666]">
                48 verified vacancies open in Pune cluster vs 32 enrolled
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveAdminTab('training')}
            className="text-xs font-bold text-sky-800 hover:text-sky-900 inline-flex items-center gap-1 shrink-0"
          >
            <span>View training demand</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Top 6 Standard Metrics */}
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

      {/* Tab: Overview & Analytics */}
      {activeAdminTab !== 'beneficiaries' && (
          <div className="space-y-6 animate-in fade-in duration-200">
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

      {/* Tab: Beneficiaries Table */}
      {activeAdminTab === 'beneficiaries' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-[18px] bg-white border border-[#E7E7E3] shadow-subtle">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#8A8A8A]" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name, district, or ID..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-50 border border-[#E7E7E3] text-xs text-[#181818] placeholder-[#8A8A8A] focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={filterDistrict}
                onChange={e => setFilterDistrict(e.target.value)}
                className="px-3 py-2 rounded-xl bg-neutral-50 border border-[#E7E7E3] text-xs text-[#181818] focus:outline-none focus:border-amber-400"
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
                className="px-3 py-2 rounded-xl bg-neutral-50 border border-[#E7E7E3] text-xs text-[#181818] focus:outline-none focus:border-amber-400"
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
          <div className="rounded-[22px] bg-white border border-[#E7E7E3] overflow-hidden shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 text-[#666666] font-bold uppercase tracking-wider border-b border-[#E7E7E3]">
                  <tr>
                    <th className="py-3.5 px-4">Beneficiary</th>
                    <th className="py-3.5 px-4">District</th>
                    <th className="py-3.5 px-4">Current Livelihood</th>
                    <th className="py-3.5 px-4">Target NSQF Track</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E7E3]">
                  {searchedBeneficiaries.map(ben => (
                    <tr
                      key={ben.id}
                      className="hover:bg-neutral-50 transition-colors cursor-pointer"
                      onClick={() => openBeneficiaryDetail(ben)}
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#181818]">{ben.name}</div>
                        <div className="text-[11px] text-[#8A8A8A] font-mono">
                          {ben.id} · Age {ben.age}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-[#666666]">{ben.district}, MH</td>
                      <td className="py-3.5 px-4 text-[#666666]">
                        {ben.currentLivelihood || 'Electrical Repair'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-amber-800">
                          {ben.targetRole || 'Solar PV Technician'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={cn(
                            'text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full',
                            ben.status === 'placed'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : ben.status === 'certified'
                              ? 'bg-sky-50 text-sky-800 border border-sky-200'
                              : ben.status === 'enrolled'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-neutral-100 text-[#666666]'
                          )}
                        >
                          {ben.status || 'profiled'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            openBeneficiaryDetail(ben);
                          }}
                          className="p-1.5 rounded-lg hover:bg-neutral-100 text-[#666666] hover:text-[#181818] transition-colors"
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

      {/* Beneficiary Detail Modal */}
      {isDetailDrawerOpen && selectedBeneficiary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[24px] bg-white border border-[#E7E7E3] p-6 sm:p-8 shadow-modal text-left"
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />

            <button
              onClick={closeBeneficiaryDetail}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-[#8A8A8A] hover:text-[#181818] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 pb-6 mb-6 border-b border-[#E7E7E3]">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-extrabold text-lg flex items-center justify-center shadow-sm">
                {selectedBeneficiary.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-extrabold text-[#181818]">
                    {selectedBeneficiary.name}
                  </h3>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {selectedBeneficiary.status || 'profiled'}
                  </span>
                </div>
                <div className="text-xs text-[#666666] font-mono mt-0.5">
                  ID: {selectedBeneficiary.id} · {selectedBeneficiary.category} ·{' '}
                  {selectedBeneficiary.district}, Maharashtra
                </div>
              </div>
            </div>

            {/* Lifecycle Stages */}
            <div className="mb-6">
              <span className="text-xs font-bold uppercase text-[#8A8A8A] tracking-wider block mb-3">
                Beneficiary Lifecycle Progression
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-neutral-50 border border-[#E7E7E3]">
                  <div className="text-[10px] text-emerald-700 font-bold">1. PROFILED</div>
                  <div className="text-[#181818] font-medium mt-0.5">Verified</div>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-50 border border-[#E7E7E3]">
                  <div className="text-[10px] text-emerald-700 font-bold">2. RECOMMENDED</div>
                  <div className="text-[#181818] font-medium mt-0.5">NSQF L3</div>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-50 border border-[#E7E7E3]">
                  <div className="text-[10px] text-emerald-700 font-bold">3. ENROLLED</div>
                  <div className="text-[#181818] font-medium mt-0.5">Batch #42</div>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-50 border border-[#E7E7E3]">
                  <div className="text-[10px] text-emerald-700 font-bold">4. CERTIFIED</div>
                  <div className="text-[#181818] font-medium mt-0.5">Grade A</div>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-50 border border-[#E7E7E3]">
                  <div className="text-[10px] text-emerald-700 font-bold">5. PLACED</div>
                  <div className="text-[#181818] font-medium mt-0.5">SunPower</div>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                  <div className="text-[10px] text-amber-800 font-bold">6. FOLLOW-UP</div>
                  <div className="text-amber-900 font-medium mt-0.5">Retained</div>
                </div>
              </div>
            </div>

            {/* Grid details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-6">
              <div className="p-4 rounded-xl bg-neutral-50 border border-[#E7E7E3]">
                <span className="text-[#8A8A8A] uppercase font-bold block mb-1">
                  Education & Background
                </span>
                <p className="text-[#181818] font-semibold">
                  {selectedBeneficiary.education || '10th Pass'}
                </p>
                <span className="text-[#666666] block mt-1">
                  Livelihood: {selectedBeneficiary.currentLivelihood || 'Electrical repair work'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-[#E7E7E3]">
                <span className="text-[#8A8A8A] uppercase font-bold block mb-1">
                  Target Qualification
                </span>
                <p className="text-amber-800 font-semibold">
                  {selectedBeneficiary.targetRole || 'Solar PV Technician'}
                </p>
                <span className="text-[#666666] block mt-1">
                  NSQF Level 3 · 3 Months Duration
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={closeBeneficiaryDetail}
                className="px-6 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-[#181818] text-xs font-semibold"
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

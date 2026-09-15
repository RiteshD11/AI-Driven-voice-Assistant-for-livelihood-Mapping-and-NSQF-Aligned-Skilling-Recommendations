import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { 
  Shield, Users, TrendingUp, Award, Layers, MapPin, 
  BarChart2, PieChart, Lock, Sparkles, CheckCircle2 
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const res = await api.getAdminAnalytics();
      if (res && res.analytics) {
        setAnalytics(res.analytics);
      }
      setLoading(false);
    }
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header & Anonymization badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-indigo-100 text-indigo-900 px-3 py-1 rounded-full text-xs font-bold mb-1">
              <Shield className="w-3.5 h-3.5 text-indigo-700" />
              <span>प्रशासनिक निगरानी एवं विश्लेषण (Admin & Policy Dashboard)</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              कौशल मांग एवं आजीविका विश्लेषण
            </h1>
            <p className="text-xs text-slate-500">
              पीएम-अजय (PM-AJAY) के तहत लाभार्थियों की समग्र प्रगति का अनामीकृत अवलोकन
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg font-medium">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>शून्य व्यक्तिगत पहचान डेटा (k-Anonymized)</span>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500">
            <Sparkles className="w-6 h-6 text-amber-500 animate-spin mx-auto mb-2" />
            <p className="text-xs font-semibold">एनालिटिक्स डेटा संकलित हो रहा है...</p>
          </div>
        ) : analytics && (
          <div className="space-y-6">
            {/* Top KPI Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="gov-card p-4 space-y-1 bg-white">
                <span className="text-[11px] font-semibold text-slate-500">कुल पंजीकृत लाभार्थी</span>
                <div className="text-2xl font-black text-slate-900">
                  {analytics.summary.totalBeneficiaries.toLocaleString()}
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold">+18% विगत माह से</span>
              </div>

              <div className="gov-card p-4 space-y-1 bg-white">
                <span className="text-[11px] font-semibold text-slate-500">सक्रिय लाभार्थी (मासिक)</span>
                <div className="text-2xl font-black text-blue-900">
                  {analytics.summary.activeThisMonth.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-400 font-medium">वॉयस व पोर्टल सक्रिय</span>
              </div>

              <div className="gov-card p-4 space-y-1 bg-white">
                <span className="text-[11px] font-semibold text-slate-500">कौशल अंतर मूल्यांकित</span>
                <div className="text-2xl font-black text-indigo-700">
                  {analytics.summary.skillAssessmentsDone.toLocaleString()}
                </div>
                <span className="text-[10px] text-indigo-600 font-semibold">एनएसक्यूएफ स्तर 3-5</span>
              </div>

              <div className="gov-card p-4 space-y-1 bg-white">
                <span className="text-[11px] font-semibold text-slate-500">आजीविका संबंध स्थापित</span>
                <div className="text-2xl font-black text-emerald-700">
                  {analytics.summary.livelihoodLinksCreated.toLocaleString()}
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold">रोजगार व स्वरोजगार</span>
              </div>
            </div>

            {/* Charts Row: Top Skills Identified & Job Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Bar visualization: Top Skills */}
              <div className="gov-card p-5 space-y-3 bg-white">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                    <BarChart2 className="w-4 h-4 text-blue-900" />
                    <span>शीर्ष पहचाने गए कौशल (Top Skills Identified)</span>
                  </h3>
                  <span className="text-[11px] text-slate-400">आवृत्ति %</span>
                </div>

                <div className="space-y-3 pt-1">
                  {analytics.topSkillsIdentified.map((item: any, idx: number) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-slate-800">{item.skill}</span>
                        <span className="font-bold text-slate-900">{item.percentage}% ({item.count})</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div 
                          className="bg-blue-900 h-2 rounded-full" 
                          style={{ width: `${item.percentage * 2.5}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Job Preference & Common Gaps */}
              <div className="space-y-5">
                {/* Livelihood Preference Donut Breakdown */}
                <div className="gov-card p-5 space-y-3 bg-white">
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                    <PieChart className="w-4 h-4 text-amber-600" />
                    <span>आजीविका प्राथमिकता वितरण (Job Preference)</span>
                  </h3>

                  <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="text-xl font-bold text-blue-900">
                        {analytics.jobPreferenceDistribution.employmentOnly}%
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1 font-medium">केवल नौकरी</div>
                    </div>

                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                      <div className="text-xl font-bold text-emerald-800">
                        {analytics.jobPreferenceDistribution.selfEmploymentOnly}%
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1 font-medium">स्वरोजगार</div>
                    </div>

                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                      <div className="text-xl font-bold text-amber-800">
                        {analytics.jobPreferenceDistribution.bothFlexible}%
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1 font-medium">दोनों लचीला</div>
                    </div>
                  </div>
                </div>

                {/* Common Skill Gaps */}
                <div className="gov-card p-5 space-y-3 bg-white">
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                    <Layers className="w-4 h-4 text-rose-600" />
                    <span>सामान्य कौशल अंतर (Common Skill Gaps Identified)</span>
                  </h3>

                  <div className="space-y-2 pt-1 text-xs">
                    {analytics.commonSkillGaps.map((gap: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="font-semibold text-slate-800">{gap.gap}</span>
                        <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded text-[11px]">
                          {gap.affected.toLocaleString()} लाभार्थी प्रभावित
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Geographic/District-wise Table Visualization */}
            <div className="gov-card p-5 bg-white space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>ज़िला-वार आजीविका मांग (District-Wise Demand Mapping)</span>
                </h3>
                <span className="text-xs text-slate-500">पूर्वांचल पायलट ज़ोन</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-semibold">
                    <tr>
                      <th className="p-2.5 rounded-l-lg">ज़िला (District)</th>
                      <th className="p-2.5">पंजीकृत लाभार्थी</th>
                      <th className="p-2.5">प्राथमिक कौशल क्षेत्र</th>
                      <th className="p-2.5 rounded-r-lg">सक्रिय कौशल केंद्र</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {analytics.districtWiseDemand.map((d: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50/80">
                        <td className="p-2.5 font-bold text-slate-900">{d.district}</td>
                        <td className="p-2.5 text-slate-700 font-mono">{d.beneficiaries.toLocaleString()}</td>
                        <td className="p-2.5">
                          <span className="bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded font-semibold text-[11px]">
                            {d.primaryDomain}
                          </span>
                        </td>
                        <td className="p-2.5 font-bold text-emerald-700">{d.skillCentres} केंद्र</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

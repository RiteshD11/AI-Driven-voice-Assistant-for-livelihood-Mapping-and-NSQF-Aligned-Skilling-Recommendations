import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import { api } from '../services/api';
import { 
  Layers, Award, CheckCircle2, Circle, ArrowRight, 
  Sparkles, HelpCircle, BookOpen, AlertCircle, Target
} from 'lucide-react';

export const SkillGapPage: React.FC = () => {
  const { currentProfile, setDemoStep } = useDemo();
  const navigate = useNavigate();

  const [targetRole, setTargetRole] = useState('web_developer');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const roleOptions = [
    { key: 'web_developer', title: 'वेब एवं डिजिटल फ्रंट-एंड डेवलपर (Web & Digital Front-End)' },
    { key: 'digital_agri_operator', title: 'सोलर एवं सूक्ष्म-सिंचाई तकनीशियन (Solar Agri Tech)' },
    { key: 'data_entry_specialist', title: 'कार्यालय एवं बैंकिंग संचालन सहायक (Office & Banking)' }
  ];

  useEffect(() => {
    async function loadGap() {
      setLoading(true);
      const res = await api.analyzeSkillGap(targetRole, currentProfile.existingSkills);
      setAnalysis(res);
      setLoading(false);
    }
    loadGap();
  }, [targetRole, currentProfile.existingSkills]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-indigo-100 text-indigo-900 px-3 py-1 rounded-full text-xs font-bold">
            <Target className="w-3.5 h-3.5 text-indigo-700" />
            <span>कौशल अंतर विश्लेषण (Skill Gap Analysis)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            आपके वर्तमान कौशल बनाम लक्षित कार्य की आवश्यकता
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            सरल भाषा में समझें कि आपको पसंदीदा काम में योग्यता प्राप्त करने के लिए कौन से नए कौशल सीखने हैं।
          </p>
        </div>

        {/* Role Selector */}
        <div className="gov-card p-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white">
          <span className="text-xs font-bold text-slate-700">लक्षित जॉब रोल चुनें:</span>
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full sm:w-auto p-2 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:border-blue-900"
          >
            {roleOptions.map(r => (
              <option key={r.key} value={r.key}>{r.title}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <Sparkles className="w-6 h-6 text-amber-500 animate-spin mx-auto" />
            <p className="text-xs font-semibold">कौशल अंतर का विश्लेषण किया जा रहा है...</p>
          </div>
        ) : analysis && (
          <div className="space-y-6">
            {/* Progress Gauge Banner */}
            <div className="gov-card p-6 bg-gradient-to-r from-slate-900 to-blue-950 text-white space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">
                    {analysis.nsqfLevel} संरेखित लक्ष्य
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold mt-0.5">{analysis.role}</h2>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-amber-400">{analysis.completionPercent}%</div>
                  <div className="text-[10px] text-slate-300 uppercase">कौशल तैयारी</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-amber-400 to-emerald-400 h-3 rounded-full transition-all duration-700"
                  style={{ width: `${analysis.completionPercent}%` }}
                ></div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {analysis.explanation}
              </p>
            </div>

            {/* Side-by-side Competency Comparison as specified */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Left: Mastered Skills */}
              <div className="gov-card p-5 space-y-3 border-t-4 border-t-emerald-600">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>आपके वर्तमान कौशल (Current Skills)</span>
                  </h3>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {analysis.masteredSkills.length} पूर्ण
                  </span>
                </div>

                <div className="space-y-2">
                  {analysis.masteredSkills.map((sk: any, idx: number) => (
                    <div key={idx} className="p-2.5 bg-emerald-50/60 border border-emerald-200 rounded-lg text-xs flex items-center justify-between">
                      <span className="font-semibold text-emerald-950 flex items-center gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        {sk.name}
                      </span>
                      <span className="text-[10px] bg-white text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-300">
                        {sk.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Missing Skills (The Gap) */}
              <div className="gov-card p-5 space-y-3 border-t-4 border-t-amber-500">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                    <Circle className="w-4 h-4 text-amber-600" />
                    <span>कौशल अंतर (Your Skill Gap)</span>
                  </h3>
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                    {analysis.missingSkills.length} शेष
                  </span>
                </div>

                <div className="space-y-2">
                  {analysis.missingSkills.map((sk: any, idx: number) => (
                    <div key={idx} className="p-2.5 bg-amber-50/60 border border-amber-200 rounded-lg text-xs flex items-center justify-between">
                      <span className="font-semibold text-amber-950 flex items-center gap-2">
                        <span className="text-amber-600 font-bold">○</span>
                        {sk.name}
                      </span>
                      <span className="text-[10px] bg-white text-amber-900 px-1.5 py-0.5 rounded border border-amber-300">
                        {sk.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended Next Skill Card */}
            <div className="gov-card p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-indigo-700 uppercase">
                  सुझाया गया अगला कौशल (Recommended Next Skill)
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  {analysis.recommendedNextSkill}
                </h4>
                <p className="text-xs text-slate-600">
                  इस कौशल को सीखकर आप एनएसक्यूएफ स्तर 4 के लिए पूरी तरह तैयार हो जाएंगे।
                </p>
              </div>

              <button
                onClick={() => {
                  setDemoStep(4);
                  navigate('/training');
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold shadow transition flex items-center justify-center gap-2 shrink-0"
              >
                <span>अनुशंसित प्रशिक्षण पाठ्यक्रम देखें</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


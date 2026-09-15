import React from 'react';
import { Link } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import { 
  BarChart3, CheckCircle2, Award, BookOpen, Briefcase, 
  ArrowRight, Shield, Layers, UserCheck, Sparkles, Clock
} from 'lucide-react';

export const ProgressDashboardPage: React.FC = () => {
  const { currentProfile } = useDemo();

  const roadmap = [
    { step: 1, title: 'प्रोफ़ाइल निर्माण (Profile)', status: 'completed', desc: 'शिक्षा, रुचि व स्थान सत्यापित' },
    { step: 2, title: 'कौशल मूल्यांकन (Skill Assessment)', status: 'completed', desc: 'मौजूदा क्षमताओं का सत्यापन' },
    { step: 3, title: 'एनएसक्यूएफ प्रशिक्षण (Training)', status: 'current', desc: 'वेब एवं डिजिटल फ्रंट-एंड कोर्स' },
    { step: 4, title: 'सर्टिफिकेशन (Certification)', status: 'upcoming', desc: 'राष्ट्रीय मूल्यांकन एवं योग्यता प्रमाण' },
    { step: 5, title: 'आजीविका जुड़ाव (Livelihood)', status: 'goal', desc: 'स्थानीय रोजगार या स्वतंत्र सीएससी कियोस्क' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-bold mb-1">
              <BarChart3 className="w-3.5 h-3.5 text-blue-800" />
              <span>लाभार्थी प्रगति डैशबोर्ड (Beneficiary Dashboard)</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              नमस्ते, {currentProfile.name}
            </h1>
            <p className="text-xs text-slate-500">
              आपकी कौशल एवं आजीविका यात्रा की वर्तमान स्थिति
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/assistant"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition"
            >
              वॉयस सहायक से बात करें
            </Link>
          </div>
        </div>

        {/* Dashboard 4 Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="gov-card p-4 space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 block">प्रोफ़ाइल पूर्णता</span>
            <div className="text-2xl font-black text-blue-900">{currentProfile.profileCompletion}%</div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
              <div className="bg-blue-900 h-1.5 rounded-full" style={{ width: `${currentProfile.profileCompletion}%` }}></div>
            </div>
          </div>

          <div className="gov-card p-4 space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 block">पहचाने गए कौशल</span>
            <div className="text-2xl font-black text-emerald-700">{currentProfile.existingSkills.length}</div>
            <span className="text-[10px] text-emerald-600 font-medium">✓ बेसिक कंप्यूटर एवं एमएस ऑफिस</span>
          </div>

          <div className="gov-card p-4 space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 block">कौशल अंतर (Skill Gaps)</span>
            <div className="text-2xl font-black text-amber-600">2</div>
            <span className="text-[10px] text-amber-700 font-medium">एचटीएमएल / सीएसएस शेष</span>
          </div>

          <div className="gov-card p-4 space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 block">अनुशंसित पाठ्यक्रम</span>
            <div className="text-2xl font-black text-indigo-700">3</div>
            <span className="text-[10px] text-indigo-600 font-medium">एनएसक्यूएफ स्तर 4 संरेखित</span>
          </div>
        </div>

        {/* Section 13: 5-Step Visual Roadmap */}
        <div className="gov-card p-6 space-y-4 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-bold text-base text-slate-900">
              आपकी 5-चरणीय आजीविका रूपरेखा (Livelihood Roadmap)
            </h2>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
              चरण 3 जारी
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {roadmap.map((step) => (
              <div key={step.step} className="flex items-start gap-4 p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                  step.status === 'completed'
                    ? 'bg-emerald-600 text-white'
                    : step.status === 'current'
                    ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-100'
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {step.status === 'completed' ? '✓' : step.step}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-slate-900">{step.title}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      step.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : step.status === 'current'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {step.status === 'completed' ? 'पूर्ण' : step.status === 'current' ? 'प्रगति पर' : 'आगामी'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Link to Opportunities */}
        <div className="p-4 bg-blue-900 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div>
            <h4 className="font-bold text-sm">कौशल के साथ रोजगार भी</h4>
            <p className="text-xs text-blue-200 mt-0.5">
              प्रशिक्षण के साथ-साथ स्थानीय नौकरियों व सीएससी उद्यम अवसरों का विवरण देखें।
            </p>
          </div>

          <Link
            to="/jobs"
            className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg shadow transition flex items-center justify-center gap-1.5 shrink-0"
          >
            <span>स्थानीय अवसर खोजें</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

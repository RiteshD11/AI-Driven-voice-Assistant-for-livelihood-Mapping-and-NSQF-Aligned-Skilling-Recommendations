import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { LivelihoodPathway } from '../types';
import { 
  Compass, Briefcase, Building, ArrowRight, CheckCircle2, 
  Circle, Clock, Sparkles, TrendingUp, DollarSign, Shield
} from 'lucide-react';

export const LivelihoodMapPage: React.FC = () => {
  const [pathway, setPathway] = useState<LivelihoodPathway | null>(null);
  const [selectedDomain, setSelectedDomain] = useState('it');
  const navigate = useNavigate();

  useEffect(() => {
    async function loadPathway() {
      const res = await api.getPathway(selectedDomain);
      if (res && res.pathway) {
        setPathway(res.pathway);
      }
    }
    loadPathway();
  }, [selectedDomain]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold">
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            <span>आजीविका मानचित्रण (Livelihood Mapping)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            कौशल से आजीविका तक की संपूर्ण यात्रा
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            प्रशिक्षण केवल प्रमाणपत्र के लिए नहीं, बल्कि सीधे रोजगार अथवा स्वरोजगार की दिशा में बढ़ाया गया ठोस कदम है।
          </p>
        </div>

        {/* Domain Switcher */}
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setSelectedDomain('it')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedDomain === 'it' 
                ? 'bg-blue-900 text-white shadow-md' 
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            डिजिटल एवं आईटी मार्ग (Digital & IT Pathway)
          </button>
          <button
            onClick={() => setSelectedDomain('agriculture')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedDomain === 'agriculture' 
                ? 'bg-blue-900 text-white shadow-md' 
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            आधुनिक कृषि एवं सोलर मार्ग (Solar Agri Pathway)
          </button>
        </div>

        {/* Visual 5-Stage Stepper Roadmap */}
        {pathway && (
          <div className="space-y-6">
            <div className="gov-card p-6 bg-white space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
                <span>{pathway.title}</span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  मार्ग प्रगति चार्ट
                </span>
              </h2>

              {/* Stepper Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-2">
                {pathway.steps.map((step, idx) => (
                  <div key={idx} className="relative flex flex-col space-y-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                        step.status === 'completed'
                          ? 'bg-emerald-600 text-white'
                          : step.status === 'current'
                          ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-100'
                          : 'bg-slate-200 text-slate-600'
                      }`}>
                        {step.status === 'completed' ? '✓' : step.step}
                      </div>
                      <span className="text-xs font-bold text-slate-800">{step.title}</span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed min-h-[75px]">
                      {step.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Two Distinct Destination Pathways: Employment vs Self-Employment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Path 1: Employment */}
              <div className="gov-card p-6 space-y-4 border-t-4 border-t-blue-900">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-900 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded">
                    मार्ग अ: संगठित रोजगार (Employment)
                  </span>
                  <Briefcase className="w-5 h-5 text-blue-900" />
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {pathway.employmentOpportunity}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  प्रशिक्षण और एनएसक्यूएफ प्रमाणपत्र उपरांत स्थानीय आईटी फर्मों, डिजिटल सेवा केंद्रों या सरकारी अनुबंधों में नियुक्ति।
                </p>

                <div className="bg-slate-50 p-3 rounded-xl space-y-1.5 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">अनुमानित मासिक आय:</span>
                    <span className="font-bold text-emerald-700">₹14,000 - ₹18,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">कार्य क्षेत्र:</span>
                    <span className="font-semibold">वाराणसी व स्थानीय जिला</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/jobs?type=employment')}
                  className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold shadow transition flex items-center justify-center gap-1.5"
                >
                  <span>रोजगार अवसर देखें (View Jobs)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Path 2: Self-Employment */}
              <div className="gov-card p-6 space-y-4 border-t-4 border-t-emerald-700">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded">
                    मार्ग ब: स्वरोजगार / सूक्ष्म-उद्यम (Self-Employment)
                  </span>
                  <TrendingUp className="w-5 h-5 text-emerald-700" />
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {pathway.selfEmploymentOpportunity}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  गाँव या कस्बे में डिजिटल ग्राहक सेवा कियोस्क या स्वतंत्र वेब/ग्राफिक कंसल्टेंसी शुरू करने हेतु मार्गदर्शन।
                </p>

                <div className="bg-slate-50 p-3 rounded-xl space-y-1.5 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">अनुमानित मासिक लाभ:</span>
                    <span className="font-bold text-emerald-700">₹18,000 - ₹30,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">सरकारी ऋण/सब्सिडी सहयोग:</span>
                    <span className="font-semibold">मुद्रा योजना / PM-AJAY संरेखित</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/jobs?type=self_employment')}
                  className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow transition flex items-center justify-center gap-1.5"
                >
                  <span>स्वरोजगार मार्गदर्शन देखें (Self-Employment)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


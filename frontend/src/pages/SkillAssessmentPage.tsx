import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import { Award, CheckCircle2, Circle, ArrowRight, Sparkles, BookOpen, Layers, Plus } from 'lucide-react';

export const SkillAssessmentPage: React.FC = () => {
  const { currentProfile, updateProfile } = useDemo();
  const navigate = useNavigate();

  const [skillsList, setSkillsList] = useState(currentProfile.existingSkills);

  const competencyDomains = [
    {
      domain: 'डिजिटल एवं सूचना प्रौद्योगिकी (IT & Digital)',
      skills: ['Basic Computer', 'MS Office & Word', 'Data Entry', 'Internet Browsing', 'Hindi/English Typing']
    },
    {
      domain: 'कृषि एवं संबद्ध कार्य (Agri & Allied)',
      skills: ['Traditional Agriculture', 'Drip Irrigation Basics', 'Organic Compost Making', 'Dairy & Cattle Care']
    },
    {
      domain: 'तकनीकी एवं सेवा क्षेत्र (Technical & Services)',
      skills: ['Domestic Wiring Repair', 'Solar Equipment Handling', 'Two-Wheeler Maintenance', 'Mobile Repair']
    }
  ];

  const toggleSkill = (skillName: string) => {
    const exists = skillsList.some(s => s.name.toLowerCase() === skillName.toLowerCase());
    let updated;
    if (exists) {
      updated = skillsList.filter(s => s.name.toLowerCase() !== skillName.toLowerCase());
    } else {
      updated = [...skillsList, { name: skillName, proficiency: 'intermediate' as const, category: 'general' }];
    }
    setSkillsList(updated);
    updateProfile({ existingSkills: updated });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded">
            कौशल स्व-मूल्यांकन (Skill Assessment)
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            आपके मौजूदा कौशल एवं अनुभव
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            जिन कामों में आपको अनुभव है, उन पर टिक करें। आरोहण आपकी क्षमताओं को उद्योग मानकों से जोड़ेगा।
          </p>
        </div>

        {/* Selected skills summary pill card */}
        <div className="gov-card p-4 bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-bold text-slate-900">
              चयनित कौशल: {skillsList.length}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {skillsList.map((s, idx) => (
              <span key={idx} className="text-xs bg-indigo-50 text-indigo-900 border border-indigo-200 font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {s.name}
              </span>
            ))}
          </div>
        </div>

        {/* Competency Domains Selection */}
        <div className="space-y-4">
          {competencyDomains.map((group, idx) => (
            <div key={idx} className="gov-card p-5 space-y-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Layers className="w-4 h-4 text-blue-900" />
                <span>{group.domain}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {group.skills.map((skName, sIdx) => {
                  const isChecked = skillsList.some(s => s.name.toLowerCase() === skName.toLowerCase());
                  return (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => toggleSkill(skName)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs transition ${
                        isChecked 
                          ? 'bg-blue-900 text-white border-blue-900 font-semibold shadow-sm' 
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <span>{skName}</span>
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Proceed to Gap Analysis */}
        <div className="flex justify-end pt-2">
          <button
            onClick={() => navigate('/skill-gap')}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
          >
            <span>स्किल गैप एनालिसिस पर जाएं</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

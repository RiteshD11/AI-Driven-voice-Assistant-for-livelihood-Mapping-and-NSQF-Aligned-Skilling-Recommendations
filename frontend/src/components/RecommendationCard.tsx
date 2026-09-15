import React, { useState } from 'react';
import { RecommendationItem } from '../types';
import { Award, Clock, MapPin, CheckCircle2, ChevronDown, ChevronUp, Bookmark, Sparkles } from 'lucide-react';

interface RecommendationCardProps {
  item: RecommendationItem;
  onSave?: (id: string) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ item, onSave }) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSaveToggle = () => {
    setSaved(!saved);
    if (onSave) onSave(item._id);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 80) return 'text-blue-700 bg-blue-50 border-blue-200';
    return 'text-amber-700 bg-amber-50 border-amber-200';
  };

  return (
    <div className="gov-card p-5 relative overflow-hidden flex flex-col justify-between">
      {/* Demo tag badge */}
      {item.isDemo && (
        <div className="absolute top-2 right-2">
          <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
            डेमो अनुशंसा (Demo)
          </span>
        </div>
      )}

      <div>
        {/* Match score & Header */}
        <div className="flex items-start justify-between gap-4 mb-3 pt-2">
          <div>
            <span className="text-xs font-bold text-indigo-700 tracking-wide uppercase bg-indigo-50 px-2 py-0.5 rounded">
              {item.course.skillArea}
            </span>
            <h3 className="text-base md:text-lg font-bold text-slate-900 mt-1 leading-snug">
              {item.course.name}
            </h3>
          </div>
          
          <div className={`px-3 py-1.5 rounded-xl border text-center font-bold ${getScoreColor(item.matchScore)}`}>
            <div className="text-lg md:text-xl leading-none">{item.matchScore}%</div>
            <div className="text-[9px] uppercase tracking-wider">मैच स्कोर</div>
          </div>
        </div>

        {/* Course Meta Info */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span className="font-semibold text-slate-800">{item.course.nsqfLevel}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{item.course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{item.course.location}</span>
          </div>
        </div>

        {/* Why Recommended bullet points */}
        <div className="mb-4">
          <h4 className="text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            यह पाठ्यक्रम आपके लिए क्यों उपयुक्त है:
          </h4>
          <ul className="space-y-1">
            {item.reasons.map((reason, idx) => (
              <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{reason.replace(/^✓\s*/, '')}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skills you will gain */}
        <div className="mb-4">
          <span className="text-[11px] font-semibold text-slate-500 block mb-1">
            आप जो कौशल सीखेंगे:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {item.course.skillsGained.map((sk, idx) => (
              <span key={idx} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                {sk}
              </span>
            ))}
          </div>
        </div>

        {/* Transparent algorithm breakdown trigger */}
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="text-xs font-semibold text-indigo-800 hover:text-indigo-900 flex items-center gap-1 mb-2"
        >
          {showBreakdown ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          पारदर्शी स्कोरिंग विश्लेषण देखें (Score Breakdown)
        </button>

        {showBreakdown && (
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2 mb-4 animate-fadeIn">
            <div className="flex justify-between">
              <span>शिक्षा स्तर मैच (20%):</span>
              <span className="font-bold">{item.breakdown.educationMatch} / 20</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5">
              <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${(item.breakdown.educationMatch / 20) * 100}%` }}></div>
            </div>

            <div className="flex justify-between">
              <span>मौजूदा कौशल मैच (30%):</span>
              <span className="font-bold">{item.breakdown.skillMatch} / 30</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5">
              <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${(item.breakdown.skillMatch / 30) * 100}%` }}></div>
            </div>

            <div className="flex justify-between">
              <span>रुचि संरेखण (20%):</span>
              <span className="font-bold">{item.breakdown.interestMatch} / 20</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5">
              <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${(item.breakdown.interestMatch / 20) * 100}%` }}></div>
            </div>

            <div className="flex justify-between">
              <span>स्थान व स्थानीय उपलब्धता (15%):</span>
              <span className="font-bold">{item.breakdown.locationMatch} / 15</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5">
              <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${(item.breakdown.locationMatch / 15) * 100}%` }}></div>
            </div>

            <div className="flex justify-between">
              <span>रोजगार प्राथमिकता (15%):</span>
              <span className="font-bold">{item.breakdown.jobPrefMatch} / 15</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5">
              <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${(item.breakdown.jobPrefMatch / 15) * 100}%` }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Card Actions */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={handleSaveToggle}
          className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1 transition ${
            saved ? 'bg-amber-100 text-amber-900 border-amber-300' : 'hover:bg-slate-100 border-slate-200 text-slate-700'
          }`}
          title="बुकमार्क करें"
        >
          <Bookmark className={`w-4 h-4 ${saved ? 'fill-amber-500 text-amber-500' : ''}`} />
          <span>{saved ? 'सहेजा गया' : 'सहेजें'}</span>
        </button>

        <button 
          onClick={() => alert(`'${item.course.name}' हेतु रुचि दर्ज की गई। डेमो मोड में प्रशिक्षण केंद्र से संपर्क सिमुलेट किया गया।`)}
          className="flex-1 bg-blue-900 hover:bg-blue-800 text-white py-2 px-3 rounded-lg text-xs font-bold shadow-sm transition text-center"
        >
          प्रशिक्षण हेतु आवेदन करें
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { LivelihoodOpportunity } from '../types';
import { Briefcase, MapPin, Building, Calendar, CheckCircle, ArrowRight } from 'lucide-react';

interface OpportunityCardProps {
  opp: LivelihoodOpportunity;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ opp }) => {
  const isEmployment = opp.type === 'employment';

  return (
    <div className="gov-card p-5 relative overflow-hidden flex flex-col justify-between">
      {/* Demo tag */}
      {opp.isDemo && (
        <div className="absolute top-2 right-2">
          <span className="text-[10px] font-semibold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
            डेमो अवसर (Demo Opportunity)
          </span>
        </div>
      )}

      <div>
        <div className="flex items-center gap-2 mb-2 pt-1">
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
            isEmployment 
              ? 'bg-blue-100 text-blue-900' 
              : 'bg-emerald-100 text-emerald-900'
          }`}>
            {isEmployment ? 'रोजगार / नौकरी (Employment)' : 'स्वरोजगार / उद्यम (Self-Employment)'}
          </span>
        </div>

        <h3 className="text-base md:text-lg font-bold text-slate-900 leading-snug mb-2">
          {opp.title}
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          {opp.description}
        </p>

        {/* Required skills chips */}
        <div className="mb-4">
          <span className="text-[11px] font-semibold text-slate-500 block mb-1">
            आवश्यक कौशल:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {opp.requiredSkills.map((sk, idx) => (
              <span key={idx} className="text-[11px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-medium">
                {sk}
              </span>
            ))}
          </div>
        </div>

        {/* Meta details */}
        <div className="space-y-1.5 text-xs text-slate-600 pt-3 border-t border-slate-100 mb-4">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{opp.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-slate-400" />
            <span>स्रोत: {opp.source}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>पात्रता: {opp.eligibility.education} ({opp.eligibility.experience})</span>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <button 
          onClick={() => alert(`'${opp.title}' अवसर हेतु रुचि दर्ज की गई। यह डेमो अवसर है।`)}
          className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            isEmployment 
              ? 'bg-blue-900 hover:bg-blue-800 text-white' 
              : 'bg-emerald-800 hover:bg-emerald-700 text-white'
          }`}
        >
          <span>{isEmployment ? 'आवेदन विवरण देखें' : 'स्वरोजगार मार्गदर्शन प्राप्त करें'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

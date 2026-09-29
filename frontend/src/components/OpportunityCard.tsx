import React from 'react';
import {
  MapPin,
  Building2,
  DollarSign,
  Briefcase,
  Award,
  Navigation,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Opportunity } from '../types';
import { StatusBadge } from './StatusBadge';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onViewDetails?: (opp: Opportunity) => void;
  className?: string;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  onViewDetails,
  className,
}) => {
  return (
    <div
      className={cn(
        'group relative rounded-3xl p-6 sm:p-7 glass-card-hover border-slate-700/80 flex flex-col justify-between transition-all duration-300',
        className
      )}
    >
      <div>
        {/* Top Badges Bar: Distance & Type & Demo Flag */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
              <Navigation className="w-3.5 h-3.5 text-cyan-400" />
              <span>Within {opportunity.distanceKm} km</span>
            </span>
            <StatusBadge
              label={opportunity.employmentType === 'wage' ? 'WAGE JOB' : 'ENTERPRISE'}
              variant={opportunity.employmentType === 'wage' ? 'info' : 'accent'}
              size="sm"
            />
          </div>

          <StatusBadge label="DEMO DATA" variant="warning" size="sm" />
        </div>

        {/* Job Title & Employer */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-amber-300 transition-colors">
          {opportunity.title}
        </h3>

        <div className="flex items-center gap-2 text-xs text-slate-300 mt-1.5">
          <Building2 className="w-4 h-4 text-slate-400" />
          <span className="font-semibold">{opportunity.employer || opportunity.companyOrScheme || 'PM-AJAY Partner'}</span>
          <span className="text-slate-500">·</span>
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span>{opportunity.location}</span>
        </div>

        <p className="text-xs text-slate-400 mt-3 line-clamp-2 leading-relaxed">
          {opportunity.description || 'Verified local livelihood opportunity mapped for PM-AJAY cluster.'}
        </p>

        {/* Salary & Qualification Grid */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/5">
          <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-[10px] uppercase font-mono text-slate-400 block">Compensation</span>
            <span className="text-sm font-bold text-emerald-400 mt-0.5 block">
              {opportunity.salaryRange || opportunity.salaryOrEarningsRange || '₹18,000/mo'}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-[10px] uppercase font-mono text-slate-400 block">Min Qualification</span>
            <span className="text-sm font-bold text-amber-300 mt-0.5 block truncate">
              {opportunity.minQualification || opportunity.qualificationRequired || '10th Pass'}
            </span>
          </div>
        </div>

        {/* Required Skills Chips */}
        <div className="mt-4">
          <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1.5">
            Required Skills
          </span>
          <div className="flex flex-wrap gap-1.5">
            {opportunity.requiredSkills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-300 text-xs flex items-center gap-1"
              >
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button: View Opportunity */}
      <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 font-mono">
          Posted 3 days ago · PM-AJAY Cluster
        </span>

        <button
          onClick={() => onViewDetails && onViewDetails(opportunity)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-600 transition-all active:scale-95 group-hover:border-amber-400 group-hover:text-amber-300"
        >
          <span>View Opportunity</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

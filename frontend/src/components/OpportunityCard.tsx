import React from 'react';
import {
  MapPin,
  Building2,
  Navigation,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Opportunity } from '../types';

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
        'group relative rounded-[22px] p-6 sm:p-7 bg-white border border-[#E7E7E3] shadow-card hover:shadow-card-hover hover:border-neutral-300 flex flex-col justify-between transition-all duration-300 text-left',
        className
      )}
    >
      <div>
        {/* Top Badges Bar: Distance & Type & Demo Flag */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs font-semibold">
              <Navigation className="w-3 h-3 text-emerald-600" />
              <span>{opportunity.distanceKm || 18} km nearby</span>
            </span>
            <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded-full bg-neutral-100 text-[#666666]">
              {opportunity.employmentType === 'wage' ? 'Wage Employment' : 'Self-Employment'}
            </span>
          </div>

          <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
            DEMO DATA
          </span>
        </div>

        {/* Job Title & Employer */}
        <h3 className="text-xl font-extrabold text-[#181818] tracking-tight group-hover:text-amber-700 transition-colors mt-1">
          {opportunity.title}
        </h3>

        <div className="flex items-center gap-2 text-xs text-[#666666] mt-1.5">
          <Building2 className="w-3.5 h-3.5 text-[#8A8A8A]" />
          <span className="font-semibold text-[#181818]">{opportunity.employer || opportunity.companyOrScheme || 'Mahindra Solar Services'}</span>
          <span className="text-[#8A8A8A]">·</span>
          <MapPin className="w-3.5 h-3.5 text-[#8A8A8A]" />
          <span>{opportunity.location || 'Pune District'}</span>
        </div>

        <p className="text-xs text-[#666666] mt-3 line-clamp-2 leading-relaxed">
          {opportunity.description || 'Verified local livelihood opportunity mapped for PM-AJAY cluster.'}
        </p>

        {/* Salary & Qualification Grid */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-[#E7E7E3]">
          <div className="p-2.5 rounded-[14px] bg-neutral-50 border border-[#E7E7E3]">
            <span className="text-[10px] uppercase font-bold text-[#8A8A8A] block">Estimated Wage</span>
            <span className="text-sm font-bold text-emerald-700 mt-0.5 block">
              {opportunity.salaryRange || opportunity.salaryOrEarningsRange || '₹18,000/mo'}
            </span>
          </div>

          <div className="p-2.5 rounded-[14px] bg-neutral-50 border border-[#E7E7E3]">
            <span className="text-[10px] uppercase font-bold text-[#8A8A8A] block">Min Qualification</span>
            <span className="text-sm font-bold text-[#181818] mt-0.5 block truncate">
              {opportunity.minQualification || opportunity.qualificationRequired || '10th Pass'}
            </span>
          </div>
        </div>

        {/* Required Skills Chips */}
        <div className="mt-4">
          <span className="text-[10px] uppercase font-bold text-[#8A8A8A] block mb-1.5">
            Required Skills
          </span>
          <div className="flex flex-wrap gap-1.5">
            {opportunity.requiredSkills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-full bg-neutral-50 border border-[#E7E7E3] text-[#181818] text-xs flex items-center gap-1 font-medium"
              >
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button: View Opportunity */}
      <div className="mt-6 pt-4 border-t border-[#E7E7E3] flex items-center justify-between">
        <span className="text-[11px] text-[#8A8A8A]">
          PM-AJAY GIA Partner Listing
        </span>

        <button
          onClick={() => onViewDetails && onViewDetails(opportunity)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-[#181818] text-xs font-bold transition-all active:scale-95 group-hover:bg-amber-50 group-hover:text-amber-800"
        >
          <span>View opportunity</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

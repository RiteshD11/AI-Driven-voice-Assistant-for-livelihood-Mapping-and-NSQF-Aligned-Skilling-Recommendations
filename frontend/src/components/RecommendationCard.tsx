import React from 'react';
import {
  Award,
  Clock,
  MapPin,
  HelpCircle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Recommendation } from '../types';

interface RecommendationCardProps {
  recommendation: Recommendation;
  onWhyThis: (rec: Recommendation) => void;
  onExplorePathway: (rec: Recommendation) => void;
  isSelected?: boolean;
  className?: string;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onWhyThis,
  onExplorePathway,
  isSelected = false,
  className,
}) => {
  const reasonText =
    typeof recommendation.reason === 'string'
      ? recommendation.reason
      : recommendation.reason.summaryExplanation ||
        'Matches your electrical experience and interest in machinery.';

  return (
    <div
      className={cn(
        'group relative rounded-[22px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 bg-white border border-[#E7E7E3] shadow-card hover:shadow-card-hover hover:border-neutral-300',
        isSelected && 'border-amber-500 shadow-md ring-1 ring-amber-400',
        className
      )}
    >
      <div>
        {/* Meta badges: NSQF level, duration, distance */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-full">
              {String(recommendation.nsqfLevel)}
            </span>
            <span className="text-xs text-[#666666] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#8A8A8A]" />
              {recommendation.duration}
            </span>
          </div>

          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-600" />
            18 km nearby
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#181818] tracking-tight group-hover:text-amber-700 transition-colors mt-1">
          {recommendation.title}
        </h3>

        {/* Human Explanation (Not just percentage!) */}
        <p className="text-xs sm:text-sm text-[#666666] mt-2.5 leading-relaxed">
          {reasonText}
        </p>

        {/* Wage & Vacancies snapshot */}
        <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-[#E7E7E3]">
          <div className="p-3 rounded-[14px] bg-neutral-50 border border-[#E7E7E3]">
            <span className="text-[10px] text-[#8A8A8A] uppercase font-bold block">Estimated Wage</span>
            <span className="text-sm font-bold text-[#181818] mt-0.5 block">{recommendation.salaryRange}</span>
          </div>
          <div className="p-3 rounded-[14px] bg-neutral-50 border border-[#E7E7E3]">
            <span className="text-[10px] text-[#8A8A8A] uppercase font-bold block">Opportunities</span>
            <span className="text-sm font-bold text-emerald-700 mt-0.5 block">
              {recommendation.opportunityAvailability}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons: Why this recommendation? & Explore pathway → */}
      <div className="mt-6 pt-4 border-t border-[#E7E7E3] flex items-center gap-2.5">
        <button
          onClick={() => onWhyThis(recommendation)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-white hover:bg-neutral-50 text-xs font-semibold text-[#181818] border border-[#E7E7E3] hover:border-neutral-300 transition-all shadow-subtle active:scale-95"
        >
          <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
          <span>Why this?</span>
        </button>

        <button
          onClick={() => onExplorePathway(recommendation)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
        >
          <span>Explore pathway</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

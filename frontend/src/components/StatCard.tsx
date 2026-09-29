import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: 'amber' | 'cyan' | 'emerald' | 'purple' | 'slate';
  className?: string;
  isDemo?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  icon,
  trend,
  variant = 'amber',
  className,
  isDemo = true,
}) => {
  const iconColors = {
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    cyan: 'bg-sky-50 text-sky-700 border-sky-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    slate: 'bg-neutral-100 text-[#666666] border-[#E7E7E3]',
  };

  return (
    <div
      className={cn(
        'group rounded-[20px] p-4 sm:p-5 bg-white border border-[#E7E7E3] shadow-card hover:shadow-card-hover flex flex-col justify-between transition-all duration-300 relative overflow-hidden',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[11px] font-bold text-[#8A8A8A] uppercase tracking-wider">
          {label}
        </span>
        {icon && (
          <div
            className={cn(
              'w-8 h-8 rounded-xl flex items-center justify-center border text-xs',
              iconColors[variant]
            )}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="my-1">
        <div className="text-2xl sm:text-3xl font-extrabold text-[#181818] tracking-tight font-mono">
          {typeof value === 'number' ? value.toLocaleString('en-IN') : value}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-[#E7E7E3] text-xs">
        {trend ? (
          <div
            className={cn(
              'flex items-center gap-1 font-mono font-semibold',
              trend.isPositive ? 'text-emerald-700' : 'text-rose-700'
            )}
          >
            {trend.isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            <span>{trend.value}</span>
            <span className="text-[#8A8A8A] font-normal">vs prev qtr</span>
          </div>
        ) : (
          <span className="text-[#8A8A8A] text-[11px]">{subtext}</span>
        )}

        {isDemo && (
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 text-[#8A8A8A]">
            DEMO
          </span>
        )}
      </div>
    </div>
  );
};

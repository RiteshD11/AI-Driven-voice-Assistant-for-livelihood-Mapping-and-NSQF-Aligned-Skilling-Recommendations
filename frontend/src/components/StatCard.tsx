import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { StatusBadge } from './StatusBadge';

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
  const accentGradients = {
    amber: 'from-amber-500/20 to-transparent border-amber-500/40 text-amber-400',
    cyan: 'from-cyan-500/20 to-transparent border-cyan-500/40 text-cyan-400',
    emerald: 'from-emerald-500/20 to-transparent border-emerald-500/40 text-emerald-400',
    purple: 'from-purple-500/20 to-transparent border-purple-500/40 text-purple-400',
    slate: 'from-slate-700/20 to-transparent border-slate-600/40 text-slate-300',
  };

  return (
    <div
      className={cn(
        'group rounded-3xl p-5 sm:p-6 glass-card-hover border-slate-800/80 flex flex-col justify-between transition-all duration-300 relative overflow-hidden',
        className
      )}
    >
      {/* Decorative top soft gradient */}
      <div className={cn('absolute top-0 left-0 right-0 h-1 bg-gradient-to-r', accentGradients[variant])} />

      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">
          {label}
        </span>
        {icon && (
          <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center border', accentGradients[variant])}>
            {icon}
          </div>
        )}
      </div>

      <div className="my-1">
        <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
          {typeof value === 'number' ? value.toLocaleString('en-IN') : value}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-white/5 text-xs">
        {trend ? (
          <div
            className={cn(
              'flex items-center gap-1 font-mono font-semibold',
              trend.isPositive ? 'text-emerald-400' : 'text-rose-400'
            )}
          >
            {trend.isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            <span>{trend.value}</span>
            <span className="text-slate-500 font-normal">vs prev qtr</span>
          </div>
        ) : (
          <span className="text-slate-400 text-[11px]">{subtext}</span>
        )}

        {isDemo && (
          <span className="text-[10px] font-mono text-slate-500">DEMO</span>
        )}
      </div>
    </div>
  );
};

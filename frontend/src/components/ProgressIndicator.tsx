import React from 'react';
import { cn } from '../lib/utils';

interface ProgressIndicatorProps {
  current: number;
  total: number;
  label?: string;
  variant?: 'amber' | 'cyan' | 'emerald';
  className?: string;
  showStepNumbers?: boolean;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  current,
  total,
  label,
  variant = 'amber',
  className,
  showStepNumbers = true,
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((current / total) * 100)));

  const colorStyles = {
    amber: 'from-amber-400 to-orange-500',
    cyan: 'from-cyan-400 to-sky-500',
    emerald: 'from-emerald-400 to-teal-500',
  };

  const badgeStyles = {
    amber: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
    cyan: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
    emerald: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between text-xs mb-2">
        {label && <span className="font-medium text-slate-300">{label}</span>}
        {showStepNumbers && (
          <span className={cn('px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-semibold', badgeStyles[variant])}>
            {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        )}
      </div>
      <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/40">
        <div
          className={cn('h-full rounded-full bg-gradient-to-r transition-all duration-500 ease-out shadow-sm', colorStyles[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

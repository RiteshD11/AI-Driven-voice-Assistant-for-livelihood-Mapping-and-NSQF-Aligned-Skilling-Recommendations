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
    amber: 'from-amber-500 to-orange-500',
    cyan: 'from-sky-500 to-cyan-500',
    emerald: 'from-emerald-500 to-teal-500',
  };

  const badgeStyles = {
    amber: 'text-amber-800 bg-amber-50 border-amber-200',
    cyan: 'text-sky-800 bg-sky-50 border-sky-200',
    emerald: 'text-emerald-800 bg-emerald-50 border-emerald-200',
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between text-xs mb-2">
        {label && <span className="font-bold text-[#666666]">{label}</span>}
        {showStepNumbers && (
          <span className={cn('px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-bold', badgeStyles[variant])}>
            {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        )}
      </div>
      <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden p-0.5 border border-[#E7E7E3]">
        <div
          className={cn('h-full rounded-full bg-gradient-to-r transition-all duration-500 ease-out shadow-sm', colorStyles[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

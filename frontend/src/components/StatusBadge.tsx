import React from 'react';
import { cn } from '../lib/utils';

export type BadgeVariant = 'success' | 'warning' | 'info' | 'neutral' | 'accent' | 'danger';

interface StatusBadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
  pulse?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  warning: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  info: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  neutral: 'bg-slate-700/30 text-slate-300 border-slate-600/40',
  accent: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
  danger: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
};

const sizeStyles = {
  sm: 'text-xs px-2 py-0.5 rounded-full',
  md: 'text-xs px-3 py-1 rounded-full font-medium',
  lg: 'text-sm px-3.5 py-1.5 rounded-full font-semibold',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant = 'neutral',
  size = 'md',
  icon,
  className,
  pulse = false,
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border tracking-wide uppercase font-mono shadow-sm backdrop-blur-sm',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
      {icon && <span className="opacity-90">{icon}</span>}
      <span>{label}</span>
    </span>
  );
};

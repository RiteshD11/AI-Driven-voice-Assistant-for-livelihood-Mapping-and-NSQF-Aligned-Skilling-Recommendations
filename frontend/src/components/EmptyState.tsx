import React from 'react';
import { SearchX, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No records found',
  message = 'No matching NSQF opportunities found within your preferred radius.',
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center rounded-2xl glass-card border-dashed border-slate-700/60 min-h-[220px]',
        className
      )}
    >
      <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 text-slate-400">
        <SearchX className="w-5 h-5" />
      </div>
      <h4 className="text-base font-semibold text-slate-200">{title}</h4>
      <p className="text-xs text-slate-400 mt-1 max-w-sm">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 transition-all active:scale-95"
        >
          <span>{actionLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

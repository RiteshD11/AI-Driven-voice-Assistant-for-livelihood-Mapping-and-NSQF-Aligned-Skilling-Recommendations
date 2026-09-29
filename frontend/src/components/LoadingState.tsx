import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface LoadingStateProps {
  message?: string;
  subtext?: string;
  fullHeight?: boolean;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Processing livelihood intelligence...',
  subtext = 'Connecting to PM-AJAY NSQF knowledge base...',
  fullHeight = false,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center rounded-2xl glass-card border-dashed border-slate-700/60',
        fullHeight ? 'min-h-[50vh]' : 'min-h-[220px]',
        className
      )}
    >
      <div className="relative mb-5">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-500/5">
          <Loader2 className="w-7 h-7 text-amber-400 animate-spin" />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center">
          <Sparkles className="w-2.5 h-2.5 text-cyan-300 animate-pulse" />
        </div>
      </div>
      <h4 className="text-base font-semibold text-slate-200">{message}</h4>
      {subtext && <p className="text-xs text-slate-400 mt-1.5 max-w-sm">{subtext}</p>}
    </div>
  );
};

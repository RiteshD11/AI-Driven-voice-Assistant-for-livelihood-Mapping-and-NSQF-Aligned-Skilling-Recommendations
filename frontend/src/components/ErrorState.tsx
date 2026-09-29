import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something interrupted this request',
  message = 'Unable to connect to the livelihood recommendation engine. Please check network connectivity or try again.',
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center rounded-2xl bg-rose-950/20 border border-rose-800/40 text-rose-200 min-h-[220px]',
        className
      )}
    >
      <div className="w-13 h-13 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center mb-4 text-rose-400">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h4 className="text-base font-semibold text-rose-100">{title}</h4>
      <p className="text-xs text-rose-300/80 mt-1 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-rose-600/30 hover:bg-rose-600/50 border border-rose-500/40 text-white transition-all shadow-md active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

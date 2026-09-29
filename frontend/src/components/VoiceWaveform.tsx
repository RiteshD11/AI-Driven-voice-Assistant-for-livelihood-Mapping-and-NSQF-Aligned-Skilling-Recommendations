import React from 'react';
import { cn } from '../lib/utils';

interface VoiceWaveformProps {
  levels: number[];
  isActive: boolean;
  state?: 'listening' | 'speaking' | 'processing' | 'idle';
  className?: string;
  barsCount?: number;
}

export const VoiceWaveform: React.FC<VoiceWaveformProps> = ({
  levels,
  isActive,
  state = 'idle',
  className,
}) => {
  const getBarColor = (index: number) => {
    if (state === 'listening') {
      return index % 2 === 0 ? 'bg-amber-400' : 'bg-orange-400';
    }
    if (state === 'speaking') {
      return index % 2 === 0 ? 'bg-cyan-400' : 'bg-sky-400';
    }
    if (state === 'processing') {
      return 'bg-purple-400';
    }
    return 'bg-slate-600';
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-1.5 h-16 px-6 py-2 rounded-2xl glass-card border border-slate-700/50 overflow-hidden',
        isActive ? 'border-amber-500/40 bg-slate-900/80 shadow-lg shadow-amber-500/5' : 'opacity-70',
        className
      )}
    >
      {levels.map((level, idx) => {
        const heightPercent = isActive ? Math.max(15, Math.min(100, level)) : 18;
        return (
          <div
            key={idx}
            className="w-1.5 rounded-full transition-all duration-150 ease-out"
            style={{
              height: `${heightPercent}%`,
              backgroundColor: isActive ? undefined : '#475569',
            }}
          >
            <div
              className={cn(
                'w-full h-full rounded-full transition-all duration-150',
                isActive && getBarColor(idx),
                isActive && 'shadow-sm shadow-amber-400/30'
              )}
            />
          </div>
        );
      })}
    </div>
  );
};

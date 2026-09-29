import React from 'react';
import { cn } from '../lib/utils';

interface VoiceWaveformProps {
  levels: number[];
  isActive?: boolean;
  state?: 'idle' | 'listening' | 'speaking' | 'processing';
  className?: string;
}

export const VoiceWaveform: React.FC<VoiceWaveformProps> = ({
  levels,
  isActive = false,
  state = 'idle',
  className,
}) => {
  const defaultBars = levels.length > 0 ? levels : [15, 25, 40, 20, 50, 30, 70, 45, 60, 35, 80, 50, 30, 20];

  const getBarColor = () => {
    switch (state) {
      case 'listening':
        return 'bg-gradient-to-t from-amber-500 to-orange-400';
      case 'speaking':
        return 'bg-gradient-to-t from-emerald-500 to-teal-400';
      case 'processing':
        return 'bg-gradient-to-t from-sky-400 to-indigo-400';
      default:
        return 'bg-neutral-300';
    }
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-1.5 h-16 px-4 py-2 rounded-2xl bg-neutral-100/70 border border-[#E7E7E3] transition-all',
        isActive ? 'border-amber-300/80 shadow-sm' : '',
        className
      )}
      role="img"
      aria-label="Audio waveform visualizer"
    >
      {defaultBars.map((level, idx) => {
        const heightPercent = isActive ? Math.max(12, Math.min(100, level)) : 16;
        return (
          <div
            key={idx}
            className={cn('w-1.5 rounded-full transition-all duration-150', getBarColor())}
            style={{
              height: `${heightPercent}%`,
              transitionDelay: `${idx * 15}ms`,
            }}
          />
        );
      })}
    </div>
  );
};

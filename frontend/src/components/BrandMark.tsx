import React from 'react';

interface BrandMarkProps {
  className?: string;
  onClick?: () => void;
  showDescriptor?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandMark: React.FC<BrandMarkProps> = ({
  className = '',
  onClick,
  showDescriptor = true,
  size = 'md',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
  };

  const textSizes = {
    sm: 'text-base font-bold tracking-tight',
    md: 'text-lg font-bold tracking-tight',
    lg: 'text-2xl font-extrabold tracking-tight',
  };

  const descriptorSizes = {
    sm: 'text-[10px] leading-tight',
    md: 'text-[11px] leading-tight',
    lg: 'text-xs leading-normal',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none group ${className}`}
      role="banner"
      aria-label="UNNATI - AI-Powered Livelihood & Skilling Assistant"
    >
      {/* Squircle Brand Icon with Voice Microphone */}
      <div
        className={`${iconSizes[size]} rounded-[12px] bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-sm shadow-amber-500/25 transition-transform duration-300 group-hover:scale-105 flex-shrink-0`}
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="22" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`${textSizes[size]} text-[#181818] tracking-wider font-extrabold`}>
            UNNATI
          </span>
          <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
            AI
          </span>
        </div>
        {showDescriptor && (
          <span className={`${descriptorSizes[size]} text-[#666666] font-medium tracking-normal`}>
            Livelihood & Skilling Assistant
          </span>
        )}
      </div>
    </div>
  );
};

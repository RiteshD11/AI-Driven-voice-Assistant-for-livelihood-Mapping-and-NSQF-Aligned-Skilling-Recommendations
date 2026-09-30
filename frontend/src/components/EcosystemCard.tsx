import React from 'react';
import { ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';
import { EcosystemPlatform } from '../data/ecosystemLinks';
import { cn } from '../lib/utils';

interface EcosystemCardProps {
  platform: EcosystemPlatform;
  actionLabel?: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const EcosystemCard: React.FC<EcosystemCardProps> = ({
  platform,
  actionLabel,
  icon: Icon,
}) => {
  const displayAction = actionLabel || platform.defaultActionLabel;

  return (
    <div
      className={cn(
        'group relative flex flex-col justify-between rounded-[22px] bg-white border border-[#E7E7E3] p-6 shadow-subtle transition-all duration-300 hover:shadow-card hover:-translate-y-1',
        platform.themeColor.borderHover
      )}
    >
      <div>
        {/* Top Header: Icon + Official Service Label / Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div
            className={cn(
              'w-12 h-12 rounded-[16px] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105',
              platform.themeColor.iconBg,
              platform.themeColor.iconColor
            )}
            aria-hidden="true"
          >
            <Icon className="w-6 h-6 stroke-[2]" />
          </div>

          <div className="flex flex-col items-end gap-1.5 text-right">
            <span
              className={cn(
                'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase',
                platform.themeColor.badgeBg,
                platform.themeColor.badgeText
              )}
            >
              <CheckCircle2 className="w-3 h-3" />
              <span>{platform.officialServiceLabel}</span>
            </span>

            {platform.badge && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-purple-100 text-purple-900 border border-purple-200">
                {platform.badge.text}
              </span>
            )}
          </div>
        </div>

        {/* Category */}
        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8A8A8A] mb-1">
          {platform.category}
        </div>

        {/* Platform Name */}
        <h3 className="text-xl font-extrabold text-[#181818] tracking-tight group-hover:text-amber-800 transition-colors">
          {platform.name}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#666666] mt-2 leading-relaxed">
          {platform.description}
        </p>

        {/* Context / Platform Note */}
        {platform.note && (
          <div className="mt-3 p-2.5 rounded-[12px] bg-neutral-50 border border-[#E7E7E3] text-[11px] text-[#666666] flex items-start gap-1.5">
            <span className="text-amber-700 font-bold shrink-0">ℹ</span>
            <span>{platform.note}</span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-[#E7E7E3]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <a
            href={platform.primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Opens official external website in a new tab"
            aria-label={`${displayAction} on ${platform.name} (Opens official external website in new tab)`}
            className={cn(
              'inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-white font-bold text-xs tracking-wider transition-all duration-200 shadow-sm active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2',
              platform.themeColor.buttonBg
            )}
          >
            <span>{displayAction}</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {platform.secondaryUrl && (
            <a
              href={platform.secondaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Direct link to official section"
              aria-label={`View direct framework for ${platform.name} (Opens in new tab)`}
              className="text-[11px] font-semibold text-[#666666] hover:text-[#181818] hover:underline flex items-center gap-1 self-center"
            >
              <span>Direct Link</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

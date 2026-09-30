import React from 'react';
import {
  GraduationCap,
  Puzzle,
  Briefcase,
  Globe,
  Landmark,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const WhyThesePlatforms: React.FC = () => {
  const ecosystemPillars = [
    {
      action: 'TRAIN',
      platform: 'Skill India Digital',
      purpose: 'Access accredited courses & centers',
      icon: GraduationCap,
      color: 'text-blue-600 bg-blue-50 border-blue-200/80',
    },
    {
      action: 'STANDARDIZE',
      platform: 'NSDC / NOS',
      purpose: 'Reference occupational standards',
      icon: Puzzle,
      color: 'text-amber-600 bg-amber-50 border-amber-200/80',
    },
    {
      action: 'CONNECT TO JOBS',
      platform: 'NCS',
      purpose: 'Apply to verified district vacancies',
      icon: Briefcase,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200/80',
    },
    {
      action: 'EXPAND LANGUAGE ACCESS',
      platform: 'BHASHINI',
      purpose: 'Planned vernacular voice translation layer',
      icon: Globe,
      color: 'text-purple-600 bg-purple-50 border-purple-200/80',
    },
    {
      action: 'PROGRAMME CONTEXT',
      platform: 'PM-AJAY',
      purpose: 'Grant-in-Aid scheme guidelines & capital',
      icon: Landmark,
      color: 'text-orange-600 bg-orange-50 border-orange-200/80',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto rounded-[24px] bg-white border border-[#E7E7E3] p-6 sm:p-8 shadow-card text-left">
      {/* Title */}
      <div className="mb-6 pb-4 border-b border-[#E7E7E3]">
        <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-amber-800">
          ARCHITECTURE STORY
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#181818] tracking-tight mt-0.5">
          Why These Platforms?
        </h3>
        <p className="text-xs sm:text-sm text-[#666666] mt-1">
          Each platform serves a specialized role in enabling the beneficiary transition from informal capability to sustainable livelihood.
        </p>
      </div>

      {/* 5 Ecosystem Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-8">
        {ecosystemPillars.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-[18px] bg-neutral-50 border border-[#E7E7E3] flex flex-col justify-between hover:bg-white hover:shadow-subtle transition-all"
            >
              <div>
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 border ${item.color}`}
                >
                  <Icon className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#8A8A8A] block mb-1">
                  {item.action}
                </span>
                <h4 className="text-sm font-bold text-[#181818]">{item.platform}</h4>
                <p className="text-[11px] text-[#666666] mt-1 leading-snug">{item.purpose}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Key Architecture Story Flow */}
      <div className="pt-4 border-t border-[#E7E7E3]">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8A8A8A] block mb-3 text-center sm:text-left">
          THE STRATEGIC ECOSYSTEM HANDOFF
        </span>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 p-4 rounded-[18px] bg-amber-50/60 border border-amber-200/80">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-amber-500 text-white font-mono text-xs font-bold flex items-center justify-center">
              1
            </span>
            <span className="text-xs font-extrabold text-[#181818]">UNNATIAI</span>
          </div>

          <ArrowRight className="w-4 h-4 text-amber-600 hidden sm:block" />
          <span className="text-amber-600 text-xs font-bold sm:hidden">↓</span>

          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-sky-500 text-white font-mono text-xs font-bold flex items-center justify-center">
              2
            </span>
            <span className="text-xs font-extrabold text-[#181818]">PERSONALIZED PATHWAY</span>
          </div>

          <ArrowRight className="w-4 h-4 text-amber-600 hidden sm:block" />
          <span className="text-amber-600 text-xs font-bold sm:hidden">↓</span>

          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-500 text-white font-mono text-xs font-bold flex items-center justify-center">
              3
            </span>
            <span className="text-xs font-extrabold text-[#181818]">OFFICIAL ECOSYSTEM</span>
          </div>

          <ArrowRight className="w-4 h-4 text-amber-600 hidden sm:block" />
          <span className="text-amber-600 text-xs font-bold sm:hidden">↓</span>

          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-orange-500 text-white font-mono text-xs font-bold flex items-center justify-center">
              4
            </span>
            <span className="text-xs font-extrabold text-[#181818]">USER ACTION</span>
          </div>
        </div>
      </div>
    </div>
  );
};

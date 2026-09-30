import React from 'react';
import { Mic, Search, Compass, ExternalLink, Zap, ArrowRight } from 'lucide-react';

export const NextStepsTimeline: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'ASSESS',
      platform: 'UNNATIAI',
      desc: 'Spoken dialogue & capability mapping',
      icon: Mic,
      color: 'bg-amber-50 text-amber-700 border-amber-200/80',
    },
    {
      num: '02',
      title: 'IDENTIFY GAP',
      platform: 'UNNATIAI',
      desc: 'Benchmark vs National Occupational Standards',
      icon: Search,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    },
    {
      num: '03',
      title: 'SELECT PATHWAY',
      platform: 'UNNATIAI',
      desc: 'Tailored NSQF Level 3–4 course selection',
      icon: Compass,
      color: 'bg-sky-50 text-sky-700 border-sky-200/80',
    },
    {
      num: '04',
      title: 'CONTINUE',
      platform: 'OFFICIAL PLATFORM',
      desc: 'Skill India / NCS / NSDC web destination',
      icon: ExternalLink,
      color: 'bg-purple-50 text-purple-700 border-purple-200/80',
    },
    {
      num: '05',
      title: 'ACT',
      platform: 'TRAIN / APPLY / EXPLORE',
      desc: 'Complete enrollment & secure placement',
      icon: Zap,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto rounded-[24px] bg-white border border-[#E7E7E3] p-6 sm:p-8 shadow-card text-left">
      <div className="mb-6 pb-4 border-b border-[#E7E7E3]">
        <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-amber-800">
          JOURNEY ROADMAP
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#181818] tracking-tight mt-0.5">
          Your Next Steps
        </h3>
        <p className="text-xs sm:text-sm text-[#666666] mt-1">
          How UNNATIAI connects to official skilling and employment services without data synchronization.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 relative">
        {steps.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-[18px] bg-neutral-50 border border-[#E7E7E3] flex flex-col justify-between hover:bg-white hover:shadow-subtle transition-all relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center border ${st.color}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#8A8A8A]">
                    {st.num}
                  </span>
                </div>

                <div className="text-xs font-extrabold text-[#181818] tracking-tight">
                  {st.title}
                </div>
                <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider mt-0.5">
                  {st.platform}
                </div>
                <p className="text-[11px] text-[#666666] mt-2 leading-relaxed">
                  {st.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-[#8A8A8A]">
                  →
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

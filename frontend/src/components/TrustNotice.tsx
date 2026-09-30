import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const TrustNotice: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto rounded-[20px] bg-white border border-[#E7E7E3] p-5 shadow-subtle text-left">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200/80">
          <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
        </div>
        <div className="space-y-1 text-xs">
          <p className="font-semibold text-[#181818] leading-relaxed">
            “Official ecosystem links open on their respective government/platform websites. UNNATIAI does not currently exchange data directly with these services.”
          </p>
          <p className="text-[#666666] leading-relaxed">
            “Always verify course, job and scheme information on the official platform.”
          </p>
        </div>
      </div>
    </div>
  );
};

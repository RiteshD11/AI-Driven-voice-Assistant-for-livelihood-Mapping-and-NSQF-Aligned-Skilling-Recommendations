import React from 'react';
import { ShieldCheck, Globe, Sparkles, Mic } from 'lucide-react';
import { BrandMark } from './BrandMark';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-20 border-t border-[#E7E7E3] bg-white py-12 px-4 sm:px-8 text-left">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-10 border-b border-[#E7E7E3]">
          {/* Col 1: Project Identity */}
          <div className="md:col-span-2 space-y-3">
            <BrandMark size="md" showDescriptor={true} />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-[#666666] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>PM-AJAY · GIA · SIH26097</span>
            </div>
            <p className="text-xs text-[#666666] max-w-lg leading-relaxed">
              AI-Driven Voice Assistant for Livelihood Mapping and NSQF-Aligned Skilling Recommendations for Scheduled Caste (SC) Communities under the Grant-in-Aid (GIA) component of PM-AJAY (Pradhan Mantri Anusuchit Jaati Abhyuday Yojana).
            </p>
          </div>

          {/* Col 2: Core Journey Stages */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#181818] block mb-3">
              One Connected Journey
            </span>
            <ul className="space-y-1.5 text-xs text-[#666666]">
              <li>01. Voice Conversation (Hindi & Marathi)</li>
              <li>02. Innate Skills Profile</li>
              <li>03. Skill Gap Assessment</li>
              <li>04. NSQF Skilling Recommendations</li>
              <li>05. Livelihood Pathway</li>
              <li>06. Official Ecosystem Connect</li>
              <li>07. Local Livelihood Opportunities</li>
              <li>08. Outcome & 90-Day Follow-Up</li>
            </ul>
          </div>

          {/* Col 3: Governance & Safety */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#181818] block mb-3">
              Governance & Safety
            </span>
            <ul className="space-y-1.5 text-xs text-[#666666]">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Explainable AI (XAI) Audited</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-sky-600" />
                <span>Hindi · Marathi · English</span>
              </li>
              <li>Low Digital Literacy First-Design</li>
              <li>100% GIA Free Government Scheme</li>
              <li>Verified Mock Data Demonstration</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A8A8A]">
          <div>
            © 2026 UNNATI · Smart India Hackathon Submission · Ministry of Social Justice & Empowerment
          </div>
          <div className="flex items-center gap-3">
            <span>Problem Statement SIH26097 · Team UNNATI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

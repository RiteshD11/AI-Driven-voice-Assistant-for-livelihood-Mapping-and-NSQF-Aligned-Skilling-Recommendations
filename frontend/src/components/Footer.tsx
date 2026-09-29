import React from 'react';
import { ShieldCheck, Heart, ExternalLink, Globe, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-24 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-10 border-b border-slate-800">
          {/* Col 1: Project Identity */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-xs font-mono font-bold tracking-wider text-amber-400 uppercase">
                Smart India Hackathon 2026 · Problem Statement SIH26097
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white tracking-tight">
              Kaushal Saathi (कौशल साथी)
            </h3>
            <p className="text-xs text-slate-400 mt-2 max-w-lg leading-relaxed">
              AI-Driven Voice Assistant for Livelihood Mapping and NSQF-Aligned Skilling Recommendations for Scheduled Caste (SC) Communities under the Grant-in-Aid (GIA) component of PM-AJAY (Pradhan Mantri Anusuchit Jaati Abhyuday Yojana).
            </p>
            <div className="flex items-center gap-2 mt-4 text-[11px] font-mono text-slate-500">
              <span>Frontend Architecture · Mock API Service Layer Connected</span>
            </div>
          </div>

          {/* Col 2: Core Journey Stages */}
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold block mb-3">
              Journey Engine
            </span>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="hover:text-amber-300 transition-colors">01. Listen & Vernacular STT</li>
              <li className="hover:text-amber-300 transition-colors">02. Understand & Profile</li>
              <li className="hover:text-amber-300 transition-colors">03. Assess Skill Gaps</li>
              <li className="hover:text-amber-300 transition-colors">04. NSQF Alignment</li>
              <li className="hover:text-amber-300 transition-colors">05. Hyperlocal Opportunities</li>
              <li className="hover:text-amber-300 transition-colors">06. 30/90 Day Outcome Tracking</li>
            </ul>
          </div>

          {/* Col 3: Compliance & Accessibility */}
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold block mb-3">
              Governance & Safety
            </span>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Explainable AI (XAI) Audited</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Hindi · Marathi · English</span>
              </li>
              <li>WCAG 2.1 AA Accessible Touch UI</li>
              <li>Simulated DEMO Data Layer</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Kaushal Saathi · Smart India Hackathon Submission · Ministry of Social Justice & Empowerment
          </div>
          <div className="flex items-center gap-3">
            <span>Built with Next.js, React, Tailwind CSS, Framer Motion & Recharts</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

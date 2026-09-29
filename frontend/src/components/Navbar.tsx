import React from 'react';
import {
  Mic,
  Compass,
  BarChart3,
  Sparkles,
  Layers,
  Globe,
  Play,
  RotateCcw,
  CheckCircle2,
  User,
  ShieldAlert,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Language } from '../types';
import { LanguageSelector } from './LanguageSelector';

interface NavbarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  userRole: 'beneficiary' | 'admin';
  onToggleRole: (role: 'beneficiary' | 'admin') => void;
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  onStartDemo: () => void;
  isDemoActive?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  userRole,
  onToggleRole,
  currentLanguage,
  onSelectLanguage,
  onStartDemo,
  isDemoActive = false,
}) => {
  const beneficiaryNavItems = [
    { id: 'landing', label: 'Home' },
    { id: 'voice', label: 'Voice AI' },
    { id: 'profile', label: 'Profile' },
    { id: 'skill-gap', label: 'Skill Gap' },
    { id: 'recommendations', label: 'NSQF Paths' },
    { id: 'pathway', label: 'Pathway' },
    { id: 'opportunities', label: 'Jobs' },
    { id: 'follow-up', label: 'Follow-up' },
  ];

  return (
    <header className="sticky top-3 z-40 w-full px-4 sm:px-8 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 p-2.5 sm:p-3 rounded-full glass-pill border border-slate-700/60 shadow-2xl">
        {/* Brand identity */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 pl-3 pr-2 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 text-slate-950 font-black flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Mic className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-extrabold tracking-tight text-white flex items-center gap-1.5">
              <span>KAUSHAL SAATHI</span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                SIH26097
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono tracking-tight -mt-0.5">
              PM-AJAY GIA Livelihood Assistant
            </div>
          </div>
        </button>

        {/* Center Navigation Links (Beneficiary Mode) */}
        {userRole === 'beneficiary' && (
          <nav className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-full bg-slate-950/40 border border-slate-800">
            {beneficiaryNavItems.map(item => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200',
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Demo Mode Trigger */}
          <button
            onClick={onStartDemo}
            className={cn(
              'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-md active:scale-95',
              isDemoActive
                ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 animate-pulse'
                : 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30'
            )}
            title="Launch 2-Minute Interactive Evaluator Walkthrough"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Try Demo Journey</span>
            <span className="sm:hidden">Demo</span>
          </button>

          {/* Language Selector (Compact pill) */}
          <LanguageSelector
            currentLanguage={currentLanguage}
            onSelectLanguage={onSelectLanguage}
            isCompact
          />

          {/* Role Switcher: Beneficiary / Admin */}
          <div className="flex items-center p-0.5 rounded-full bg-slate-950/70 border border-slate-800">
            <button
              onClick={() => onToggleRole('beneficiary')}
              className={cn(
                'px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all',
                userRole === 'beneficiary'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              User
            </button>
            <button
              onClick={() => onToggleRole('admin')}
              className={cn(
                'px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all',
                userRole === 'admin'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
  Play,
  User,
  Globe,
  Menu,
  X,
  Mic,
  Compass,
  Briefcase,
  Award,
  TrendingUp,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  LogOut,
  Sparkles,
  Layers,
  ArrowRight,
  Landmark,
  ExternalLink,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Language } from '../types';
import { BrandMark } from './BrandMark';

interface NavbarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  userRole?: 'beneficiary' | 'admin';
  onToggleRole?: (role: 'beneficiary' | 'admin') => void;
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  onStartDemo: () => void;
  isDemoActive?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  userRole = 'beneficiary',
  onToggleRole,
  currentLanguage,
  onSelectLanguage,
  onStartDemo,
  isDemoActive = false,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [journeyOpen, setJourneyOpen] = useState(false);
  const [trainingOpen, setTrainingOpen] = useState(false);
  const [opportunitiesOpen, setOpportunitiesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const journeyRef = useRef<HTMLDivElement>(null);
  const trainingRef = useRef<HTMLDivElement>(null);
  const opportunitiesRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Dynamic navbar height on scroll (72px -> 62px)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (journeyRef.current && !journeyRef.current.contains(target)) setJourneyOpen(false);
      if (trainingRef.current && !trainingRef.current.contains(target)) setTrainingOpen(false);
      if (opportunitiesRef.current && !opportunitiesRef.current.contains(target)) setOpportunitiesOpen(false);
      if (langRef.current && !langRef.current.contains(target)) setLangOpen(false);
      if (profileRef.current && !profileRef.current.contains(target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const journeyStages = [
    { id: 'voice', num: '01', title: 'Voice Conversation', desc: 'Speak naturally in Hindi or Marathi', icon: Mic },
    { id: 'profile', num: '02', title: 'My Profile', desc: 'Innate skills, experience & mobility', icon: User },
    { id: 'skill-gap', num: '03', title: 'Skill Gap', desc: 'Current capability vs target bridge', icon: Layers },
    { id: 'recommendations', num: '04', title: 'Recommendations', desc: 'Explainable NSQF course pathways', icon: Sparkles },
    { id: 'pathway', num: '05', title: 'Livelihood Pathway', desc: 'Milestone progression tracking', icon: Compass },
    { id: 'ecosystem', num: '06', title: 'Official Ecosystem', desc: 'Continue on official platforms', icon: Landmark },
    { id: 'training', num: '07', title: 'Training', desc: 'NSQF centers, stipends & modules', icon: BookOpen },
    { id: 'opportunities', num: '08', title: 'Opportunity', desc: 'Jobs & self-employment near you', icon: Briefcase },
    { id: 'follow-up', num: '09', title: 'Outcome', desc: 'Post-placement voice check-in', icon: TrendingUp },
  ];

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
  ];

  const currentLangLabel = languages.find(l => l.code === currentLanguage)?.code.toUpperCase() || 'EN';

  const handleNavClick = (view: string) => {
    setJourneyOpen(false);
    setTrainingOpen(false);
    setOpportunitiesOpen(false);
    setLangOpen(false);
    setProfileOpen(false);
    setMobileMenuOpen(false);
    onNavigate(view);
  };

  const isJourneyActive = [
    'voice',
    'profile',
    'skill-gap',
    'recommendations',
    'pathway',
    'ecosystem',
    'follow-up',
  ].includes(activeView);

  return (
    <header className="sticky top-0 z-50 w-full pt-3 sm:pt-4 px-3 sm:px-6 pointer-events-none">
      {/* Floating White Navbar Container */}
      <div
        className={cn(
          'pointer-events-auto mx-auto w-full max-w-[1360px] bg-white border border-[#E7E7E3] rounded-[22px] sm:rounded-[26px] shadow-nav px-4 sm:px-6 transition-all duration-300 ease-out flex items-center justify-between',
          isScrolled ? 'h-[62px] sm:h-[64px] shadow-md' : 'h-[72px] sm:h-[76px]'
        )}
      >
        {/* Brand Area */}
        <div className="flex items-center gap-3">
          <BrandMark
            onClick={() => handleNavClick('landing')}
            size={isScrolled ? 'sm' : 'md'}
            showDescriptor={true}
          />
        </div>

        {/* Primary Beneficiary Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {/* Home */}
          <button
            onClick={() => handleNavClick('landing')}
            className={cn(
              'px-3.5 py-2 rounded-full text-sm font-semibold transition-all',
              activeView === 'landing'
                ? 'text-[#181818] font-bold bg-neutral-100'
                : 'text-[#666666] hover:text-[#181818] hover:bg-neutral-50'
            )}
          >
            Home
          </button>

          {/* My Journey (Mega Dropdown) */}
          <div className="relative" ref={journeyRef}>
            <button
              onClick={() => {
                setJourneyOpen(!journeyOpen);
                setTrainingOpen(false);
                setOpportunitiesOpen(false);
              }}
              className={cn(
                'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold transition-all',
                isJourneyActive
                  ? 'text-amber-700 font-bold bg-amber-50 border border-amber-200/60'
                  : 'text-[#666666] hover:text-[#181818] hover:bg-neutral-50'
              )}
            >
              <span>My Journey</span>
              <ChevronDown
                className={cn('w-4 h-4 transition-transform duration-200', journeyOpen && 'rotate-180')}
              />
            </button>

            {/* My Journey Mega Dropdown Menu */}
            {journeyOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[540px] p-3 bg-white border border-[#E7E7E3] rounded-[22px] shadow-modal z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 pt-2 pb-2.5 border-b border-[#E7E7E3] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                      Beneficiary Pathway
                    </span>
                    <h4 className="text-sm font-bold text-[#181818]">One Connected Journey</h4>
                  </div>
                  <span className="text-[11px] text-[#8A8A8A] font-medium">9 Guided Steps</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 pt-2">
                  {journeyStages.map(stage => {
                    const Icon = stage.icon;
                    const isActive = activeView === stage.id;
                    return (
                      <button
                        key={stage.id}
                        onClick={() => handleNavClick(stage.id)}
                        className={cn(
                          'flex items-start gap-2.5 p-2.5 rounded-[14px] text-left transition-all',
                          isActive
                            ? 'bg-amber-50/80 border border-amber-200'
                            : 'hover:bg-neutral-50 border border-transparent'
                        )}
                      >
                        <div
                          className={cn(
                            'w-7 h-7 rounded-[10px] flex items-center justify-center flex-shrink-0 text-xs font-bold',
                            isActive ? 'bg-amber-500 text-white' : 'bg-neutral-100 text-[#666666]'
                          )}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono text-[#8A8A8A] font-semibold">
                              {stage.num}
                            </span>
                            <span
                              className={cn(
                                'text-xs font-bold truncate',
                                isActive ? 'text-amber-900' : 'text-[#181818]'
                              )}
                            >
                              {stage.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#666666] truncate mt-0.5 leading-tight">
                            {stage.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Training (Dropdown) */}
          <div className="relative" ref={trainingRef}>
            <button
              onClick={() => {
                setTrainingOpen(!trainingOpen);
                setJourneyOpen(false);
                setOpportunitiesOpen(false);
              }}
              className={cn(
                'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold transition-all',
                activeView === 'training'
                  ? 'text-amber-700 font-bold bg-amber-50 border border-amber-200/60'
                  : 'text-[#666666] hover:text-[#181818] hover:bg-neutral-50'
              )}
            >
              <span>Training</span>
              <ChevronDown
                className={cn('w-4 h-4 transition-transform duration-200', trainingOpen && 'rotate-180')}
              />
            </button>

            {trainingOpen && (
              <div className="absolute top-full left-0 mt-2 w-60 p-2 bg-white border border-[#E7E7E3] rounded-[18px] shadow-modal z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={() => handleNavClick('training')}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-[12px] text-left hover:bg-neutral-50 transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <div>
                    <div className="text-xs font-bold text-[#181818]">Recommended Training</div>
                    <div className="text-[11px] text-[#8A8A8A]">NSQF aligned modules</div>
                  </div>
                </button>
                <button
                  onClick={() => handleNavClick('pathway')}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-[12px] text-left hover:bg-neutral-50 transition-colors"
                >
                  <Compass className="w-4 h-4 text-sky-600" />
                  <div>
                    <div className="text-xs font-bold text-[#181818]">My Training Pathway</div>
                    <div className="text-[11px] text-[#8A8A8A]">Curriculum & center status</div>
                  </div>
                </button>
                <button
                  onClick={() => handleNavClick('progress')}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-[12px] text-left hover:bg-neutral-50 transition-colors"
                >
                  <Award className="w-4 h-4 text-emerald-600" />
                  <div>
                    <div className="text-xs font-bold text-[#181818]">Certification</div>
                    <div className="text-[11px] text-[#8A8A8A]">NCVET verification</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Opportunities (Dropdown) */}
          <div className="relative" ref={opportunitiesRef}>
            <button
              onClick={() => {
                setOpportunitiesOpen(!opportunitiesOpen);
                setJourneyOpen(false);
                setTrainingOpen(false);
              }}
              className={cn(
                'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold transition-all',
                activeView === 'opportunities'
                  ? 'text-amber-700 font-bold bg-amber-50 border border-amber-200/60'
                  : 'text-[#666666] hover:text-[#181818] hover:bg-neutral-50'
              )}
            >
              <span>Opportunities</span>
              <ChevronDown
                className={cn('w-4 h-4 transition-transform duration-200', opportunitiesOpen && 'rotate-180')}
              />
            </button>

            {opportunitiesOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 p-2 bg-white border border-[#E7E7E3] rounded-[18px] shadow-modal z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={() => handleNavClick('opportunities')}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-[12px] text-left hover:bg-neutral-50 transition-colors"
                >
                  <Briefcase className="w-4 h-4 text-amber-600" />
                  <div>
                    <div className="text-xs font-bold text-[#181818]">Jobs Near Me</div>
                    <div className="text-[11px] text-[#8A8A8A]">Matched within your mobility range</div>
                  </div>
                </button>
                <button
                  onClick={() => handleNavClick('opportunities')}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-[12px] text-left hover:bg-neutral-50 transition-colors"
                >
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <div>
                    <div className="text-xs font-bold text-[#181818]">Self-Employment</div>
                    <div className="text-[11px] text-[#8A8A8A]">Micro-enterprise & toolkits</div>
                  </div>
                </button>
                <button
                  onClick={() => handleNavClick('progress')}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-[12px] text-left hover:bg-neutral-50 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  <div>
                    <div className="text-xs font-bold text-[#181818]">Saved Opportunities</div>
                    <div className="text-[11px] text-[#8A8A8A]">Applications & check-ins</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Official Ecosystem */}
          <button
            onClick={() => handleNavClick('ecosystem')}
            className={cn(
              'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold transition-all',
              activeView === 'ecosystem'
                ? 'text-amber-800 font-bold bg-amber-50 border border-amber-200/80'
                : 'text-[#666666] hover:text-[#181818] hover:bg-neutral-50'
            )}
            title="Official External Portals (Skill India, NCS, NSDC, BHASHINI, PM-AJAY)"
          >
            <Landmark className="w-3.5 h-3.5 text-amber-600" />
            <span>Official Ecosystem</span>
          </button>

          {/* Progress */}
          <button
            onClick={() => handleNavClick('progress')}
            className={cn(
              'px-3.5 py-2 rounded-full text-sm font-semibold transition-all',
              activeView === 'progress'
                ? 'text-[#181818] font-bold bg-neutral-100'
                : 'text-[#666666] hover:text-[#181818] hover:bg-neutral-50'
            )}
          >
            Progress
          </button>
        </nav>

        {/* Right Action Cluster (Desktop) */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Try Demo CTA */}
          <button
            onClick={onStartDemo}
            className={cn(
              'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95',
              isDemoActive
                ? 'bg-amber-500 text-white ring-2 ring-amber-300'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/80 hover:border-amber-300'
            )}
            title="Launch 2-Minute Guided Evaluator Tour"
          >
            <Play className="w-3 h-3 fill-current text-amber-600" />
            <span>Try Demo</span>
          </button>

          {/* Language Selector (Compact EN ▾) */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => {
                setLangOpen(!langOpen);
                setProfileOpen(false);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold text-[#181818] bg-neutral-100 hover:bg-neutral-200 transition-colors border border-transparent"
              aria-label="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#666666]" />
              <span>{currentLangLabel}</span>
              <ChevronDown className="w-3 h-3 text-[#666666]" />
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 p-1.5 bg-white border border-[#E7E7E3] rounded-[18px] shadow-modal z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8A8A8A]">
                  Select Language
                </div>
                {languages.map(l => (
                  <button
                    key={l.code}
                    onClick={() => {
                      onSelectLanguage(l.code);
                      setLangOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center justify-between px-2.5 py-1.5 rounded-[10px] text-xs font-medium transition-colors',
                      currentLanguage === l.code
                        ? 'bg-amber-50 text-amber-800 font-bold'
                        : 'text-[#181818] hover:bg-neutral-50'
                    )}
                  >
                    <span>{l.native}</span>
                    <span className="text-[10px] text-[#8A8A8A] font-mono">{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Avatar with Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setLangOpen(false);
              }}
              className="w-9 h-9 rounded-full bg-neutral-100 border border-[#E7E7E3] flex items-center justify-center text-[#181818] hover:bg-neutral-200 transition-colors focus:outline-none"
              aria-label="User Profile Menu"
            >
              <User className="w-4 h-4 text-[#666666]" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 p-2 bg-white border border-[#E7E7E3] rounded-[20px] shadow-modal z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-[#E7E7E3]">
                  <div className="text-xs font-bold text-[#181818]">Ramesh Jadhav</div>
                  <div className="text-[11px] text-[#8A8A8A]">PM-AJAY Beneficiary · Pune</div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => handleNavClick('profile')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[10px] text-xs font-medium text-[#181818] hover:bg-neutral-50 text-left transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-[#666666]" />
                    <span>My Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      setLangOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[10px] text-xs font-medium text-[#181818] hover:bg-neutral-50 text-left transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#666666]" />
                    <span>Language Settings</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('landing')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[10px] text-xs font-medium text-[#181818] hover:bg-neutral-50 text-left transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-[#666666]" />
                    <span>Help & Audio Guidance</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('landing')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[10px] text-xs font-medium text-[#181818] hover:bg-neutral-50 text-left transition-colors"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#666666]" />
                    <span>Privacy & Consent</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-[#E7E7E3]">
                  <button
                    onClick={() => {
                      if (onToggleRole) onToggleRole('admin');
                      setProfileOpen(false);
                      onNavigate('admin');
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-[10px] text-xs font-semibold text-sky-800 hover:bg-sky-50 text-left transition-colors"
                  >
                    <span>Livelihood Intelligence (Admin)</span>
                    <ArrowRight className="w-3 h-3 text-sky-600" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navbar Hamburger Action */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onStartDemo}
            className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1"
          >
            <Play className="w-2.5 h-2.5 fill-current" />
            <span>Demo</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#181818] hover:bg-neutral-100 transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto lg:hidden fixed inset-x-3 top-[84px] p-5 bg-white border border-[#E7E7E3] rounded-[24px] shadow-modal z-50 max-h-[82vh] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="pb-3 border-b border-[#E7E7E3] flex items-center justify-between">
            <BrandMark size="sm" showDescriptor={true} />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 rounded-lg text-[#8A8A8A] hover:bg-neutral-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Start Buttons */}
          <div className="grid grid-cols-2 gap-2 my-4">
            <button
              onClick={() => handleNavClick('voice')}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs shadow-sm"
            >
              <Mic className="w-4 h-4" />
              <span>Start Journey</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartDemo();
              }}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 font-bold text-xs"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>2-Min Demo</span>
            </button>
          </div>

          {/* Main Links */}
          <div className="space-y-1 py-1">
            <button
              onClick={() => handleNavClick('landing')}
              className={cn(
                'w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors',
                activeView === 'landing' ? 'bg-amber-50 text-amber-900 font-bold' : 'text-[#181818] hover:bg-neutral-50'
              )}
            >
              Home
            </button>

            {/* My Journey Sub-items */}
            <div className="pt-2 pb-1">
              <div className="px-3.5 text-[11px] font-bold uppercase tracking-wider text-[#8A8A8A] mb-1">
                My Journey (9 Stages)
              </div>
              <div className="grid grid-cols-1 gap-1">
                {journeyStages.map(stage => {
                  const Icon = stage.icon;
                  const isActive = activeView === stage.id;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => handleNavClick(stage.id)}
                      className={cn(
                        'flex items-center justify-between w-full px-3.5 py-2 rounded-xl text-xs transition-colors',
                        isActive
                          ? 'bg-amber-50 text-amber-900 font-bold'
                          : 'text-[#666666] hover:bg-neutral-50'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-amber-600" />
                        <span>{stage.num} {stage.title}</span>
                      </div>
                      <ArrowRight className="w-3 h-3 text-[#8A8A8A]" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 border-t border-[#E7E7E3] space-y-1">
              <button
                onClick={() => handleNavClick('ecosystem')}
                className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold text-amber-800 bg-amber-50/60 hover:bg-amber-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Landmark className="w-3.5 h-3.5 text-amber-600" />
                  <span>Official Ecosystem Connect</span>
                </div>
                <ArrowRight className="w-3 h-3 text-amber-600" />
              </button>
              <button
                onClick={() => handleNavClick('training')}
                className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold text-[#181818] hover:bg-neutral-50"
              >
                Recommended Training
              </button>
              <button
                onClick={() => handleNavClick('opportunities')}
                className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold text-[#181818] hover:bg-neutral-50"
              >
                Opportunities (Jobs & Self-Employment)
              </button>
              <button
                onClick={() => handleNavClick('progress')}
                className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold text-[#181818] hover:bg-neutral-50"
              >
                My Progress & Certification
              </button>
            </div>
          </div>

          {/* Language Selection in Mobile */}
          <div className="mt-4 pt-3 border-t border-[#E7E7E3]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#8A8A8A] mb-2 px-1">
              Language / भाषा
            </div>
            <div className="flex gap-2">
              {languages.map(l => (
                <button
                  key={l.code}
                  onClick={() => onSelectLanguage(l.code)}
                  className={cn(
                    'flex-1 py-2 rounded-xl text-xs font-bold transition-all text-center',
                    currentLanguage === l.code
                      ? 'bg-amber-500 text-white'
                      : 'bg-neutral-100 text-[#181818]'
                  )}
                >
                  {l.native}
                </button>
              ))}
            </div>
          </div>

          {/* Admin link */}
          <div className="mt-4 pt-3 border-t border-[#E7E7E3]">
            <button
              onClick={() => {
                if (onToggleRole) onToggleRole('admin');
                handleNavClick('admin');
              }}
              className="w-full py-2.5 text-center text-xs font-bold text-sky-700 bg-sky-50 rounded-xl"
            >
              Open Livelihood Intelligence (Admin)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

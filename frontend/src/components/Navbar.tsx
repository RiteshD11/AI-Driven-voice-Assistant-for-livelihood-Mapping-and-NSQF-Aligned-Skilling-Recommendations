import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  Mic, User, Compass, Award, Briefcase, BarChart3, 
  Menu, X, Volume2, Globe, Shield, HelpCircle, Layers
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { textSize, setTextSize, highContrast, setHighContrast } = useAccessibility();

  const navLinks = [
    { to: '/', label: t('nav.home'), icon: Compass },
    { to: '/assistant', label: t('nav.assistant'), icon: Mic, highlight: true },
    { to: '/profile', label: t('nav.profile'), icon: User },
    { to: '/skill-gap', label: t('nav.skillGap'), icon: Layers },
    { to: '/training', label: t('nav.training'), icon: Award },
    { to: '/livelihood', label: t('nav.livelihood'), icon: Compass },
    { to: '/jobs', label: t('nav.jobs'), icon: Briefcase },
    { to: '/dashboard', label: t('nav.dashboard'), icon: BarChart3 },
    { to: '/admin', label: t('nav.admin'), icon: Shield },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      {/* Top utility bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-100">भारत सरकार संरेखित पहल</span>
          <span className="hidden sm:inline text-slate-400">| राष्ट्रीय कौशल योग्यता ढांचा (NSQF) एवं PM-AJAY संरेखण</span>
        </div>
        
        {/* Accessibility quick triggers */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            <span className="text-[10px] text-slate-400">फॉन्ट आकार:</span>
            <button 
              onClick={() => setTextSize('normal')} 
              className={`px-1 hover:text-white ${textSize === 'normal' ? 'text-amber-400 font-bold' : ''}`}
              title="Standard Font Size"
            >
              अ
            </button>
            <button 
              onClick={() => setTextSize('large')} 
              className={`px-1 text-sm hover:text-white ${textSize === 'large' ? 'text-amber-400 font-bold' : ''}`}
              title="Large Font Size"
            >
              अ+
            </button>
            <button 
              onClick={() => setTextSize('extra-large')} 
              className={`px-1 text-base hover:text-white ${textSize === 'extra-large' ? 'text-amber-400 font-bold' : ''}`}
              title="Extra Large Font Size"
            >
              अ++
            </button>
          </div>

          <button
            onClick={() => setHighContrast(!highContrast)}
            className={`px-2 py-0.5 rounded text-[11px] border transition ${
              highContrast ? 'bg-amber-400 text-slate-900 border-amber-500 font-bold' : 'border-slate-700 hover:text-white'
            }`}
          >
            {highContrast ? 'हाई कॉन्ट्रास्ट: चालू' : 'कॉन्ट्रास्ट'}
          </button>

          {/* Language toggle */}
          <div className="flex items-center gap-1">
            <Globe className="w-3 h-3 text-slate-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-slate-800 text-slate-200 text-xs rounded px-1.5 py-0.5 border border-slate-700 focus:outline-none focus:border-amber-400"
            >
              <option value="hi">हिंदी (Hindi)</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Branding */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-900 via-indigo-800 to-amber-600 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              आ
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900 font-sans">
                  AAROHAN
                </span>
                <span className="text-xs bg-indigo-100 text-indigo-800 font-bold px-1.5 py-0.2 rounded">
                  SIH 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                आजीविका व कौशल मैपिंग सहायक
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    isActive(link.to)
                      ? 'bg-blue-900 text-white shadow-sm'
                      : link.highlight
                      ? 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive(link.to) ? 'text-amber-300' : ''}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Voice CTA Button */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              to="/assistant"
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-3.5 py-2 rounded-lg shadow-sm hover:shadow transition transform hover:-translate-y-0.5 text-xs"
            >
              <Mic className="w-4 h-4" />
              <span>बोलकर शुरू करें</span>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center xl:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="मुख्य मेनू"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-1 shadow-lg">
          <div className="mb-3 p-2 bg-amber-50 border border-amber-200 rounded-lg">
            <Link
              to="/assistant"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-amber-500 text-slate-900 font-bold rounded-lg shadow"
            >
              <Mic className="w-5 h-5" />
              <span>वॉयस असिस्टेंट से बात करें</span>
            </Link>
          </div>
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium ${
                  isActive(link.to)
                    ? 'bg-blue-900 text-white font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
            <Link to="/about" onClick={() => setIsOpen(false)} className="hover:underline">परियोजना विवरण</Link>
            <Link to="/help" onClick={() => setIsOpen(false)} className="hover:underline">सुगमता व सहायता</Link>
          </div>
        </div>
      )}
    </header>
  );
};


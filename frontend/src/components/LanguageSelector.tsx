import React from 'react';
import { Check, Sparkles, Volume2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { Language } from '../types';

interface LanguageOption {
  code: Language;
  nativeName: string;
  englishName: string;
  tagline: string;
  audioPreview: string;
}

const LANGUAGES: LanguageOption[] = [
  {
    code: 'hi',
    nativeName: 'हिंदी',
    englishName: 'Hindi',
    tagline: 'आवाज़ में बोलकर हुनर और काम खोजें',
    audioPreview: 'बोलकर शुरू करें',
  },
  {
    code: 'mr',
    nativeName: 'मराठी',
    englishName: 'Marathi',
    tagline: 'तुमच्या कौशल्याने रोजगाराची नवी संधी मिळवा',
    audioPreview: 'मराठीत बोला',
  },
  {
    code: 'en',
    nativeName: 'English',
    englishName: 'English',
    tagline: 'Discover NSQF training and local livelihoods',
    audioPreview: 'Speak in English',
  },
];

interface LanguageSelectorProps {
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  onProceed?: () => void;
  className?: string;
  isCompact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onSelectLanguage,
  onProceed,
  className,
  isCompact = false,
}) => {
  if (isCompact) {
    return (
      <div className={cn('flex items-center gap-1 p-1 rounded-full glass-card border border-slate-700/60', className)}>
        {LANGUAGES.map(lang => (
          <button
            key={lang.code}
            onClick={() => onSelectLanguage(lang.code)}
            className={cn(
              'px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200',
              currentLanguage === lang.code
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            )}
          >
            {lang.nativeName}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('w-full max-w-xl mx-auto text-center', className)}>
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Multilingual Voice AI</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          आप किस भाषा में बातचीत करना चाहेंगे?
        </h2>
        <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto">
          Choose the language you are most comfortable speaking. Tap to select.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
        {LANGUAGES.map(lang => {
          const isSelected = currentLanguage === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => onSelectLanguage(lang.code)}
              className={cn(
                'group relative flex flex-col items-center justify-between p-5 rounded-2xl border text-left transition-all duration-200 active:scale-95',
                isSelected
                  ? 'bg-gradient-to-b from-amber-500/20 to-orange-500/10 border-amber-400 shadow-xl shadow-amber-500/10'
                  : 'glass-card border-slate-700/70 hover:border-slate-500 hover:bg-slate-800/60'
              )}
            >
              <div className="w-full flex items-center justify-between mb-4">
                <span className={cn('text-xs font-mono font-medium', isSelected ? 'text-amber-300' : 'text-slate-400')}>
                  {lang.englishName}
                </span>
                <div
                  className={cn(
                    'w-5 h-5 rounded-full flex items-center justify-center border transition-all',
                    isSelected
                      ? 'bg-amber-400 border-amber-400 text-slate-950 font-bold'
                      : 'border-slate-600 bg-slate-800/80 group-hover:border-slate-400'
                  )}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>

              <div className="w-full my-auto text-center">
                <div className="text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  {lang.nativeName}
                </div>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {lang.tagline}
                </p>
              </div>

              <div className="w-full mt-4 pt-3 border-t border-white/5 flex items-center justify-center gap-1.5 text-[11px] text-amber-400/90 font-medium">
                <Volume2 className="w-3 h-3" />
                <span>{lang.audioPreview}</span>
              </div>
            </button>
          );
        })}
      </div>

      {onProceed && (
        <button
          onClick={onProceed}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
        >
          <span>जारी रखें (Continue)</span>
        </button>
      )}
    </div>
  );
};

import React from 'react';
import { Check, Sparkles, Volume2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { Language } from '../types';

export interface LanguageOption {
  code: Language;
  nativeName: string;
  englishName: string;
  tagline: string;
  audioPreview: string;
}

export const LANGUAGES: LanguageOption[] = [
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
      <div className={cn('flex items-center gap-1 p-1 rounded-full bg-[#FFFFFF] border border-[#E7E7E3] shadow-sm', className)}>
        {LANGUAGES.map(lang => (
          <button
            key={lang.code}
            onClick={() => onSelectLanguage(lang.code)}
            className={cn(
              'px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200',
              currentLanguage === lang.code
                ? 'bg-amber-500 text-white shadow-sm font-bold'
                : 'text-[#666666] hover:text-[#181818] hover:bg-neutral-100'
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
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Multilingual Voice AI</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#181818] tracking-tight">
          आप किस भाषा में बातचीत करना चाहेंगे?
        </h2>
        <p className="text-[#666666] text-sm mt-2 max-w-md mx-auto">
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
                'group relative flex flex-col items-center justify-between p-5 rounded-[20px] border text-left transition-all duration-200 active:scale-98',
                isSelected
                  ? 'bg-amber-50/70 border-amber-400 shadow-md shadow-amber-500/10'
                  : 'bg-white border-[#E7E7E3] hover:border-neutral-300 hover:shadow-card'
              )}
            >
              <div className="w-full flex items-center justify-between mb-4">
                <span className={cn('text-xs font-mono font-medium', isSelected ? 'text-amber-800' : 'text-[#8A8A8A]')}>
                  {lang.englishName}
                </span>
                <div
                  className={cn(
                    'w-5 h-5 rounded-full flex items-center justify-center border transition-all',
                    isSelected
                      ? 'bg-amber-500 border-amber-500 text-white font-bold'
                      : 'border-neutral-300 bg-neutral-50 group-hover:border-neutral-400'
                  )}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>

              <div className="w-full my-auto text-center">
                <div className="text-2xl font-bold text-[#181818] group-hover:text-amber-600 transition-colors">
                  {lang.nativeName}
                </div>
                <p className="text-xs text-[#666666] mt-1.5 line-clamp-2">
                  {lang.tagline}
                </p>
              </div>

              <div className="w-full mt-4 pt-3 border-t border-[#E7E7E3] flex items-center justify-center gap-1.5 text-[11px] text-amber-700 font-medium">
                <Volume2 className="w-3 h-3 text-amber-600" />
                <span>{lang.audioPreview}</span>
              </div>
            </button>
          );
        })}
      </div>

      {onProceed && (
        <button
          onClick={onProceed}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm tracking-wide shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/30 active:scale-95 transition-all"
        >
          <span>जारी रखें (Continue)</span>
        </button>
      )}
    </div>
  );
};

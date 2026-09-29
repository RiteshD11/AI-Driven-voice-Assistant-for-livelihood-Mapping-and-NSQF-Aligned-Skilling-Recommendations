import React, { useState, useEffect } from 'react';
import { Mic, Volume2, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';
import { Language } from '../types';

export type VoiceState = 'Ready' | 'Listening' | 'Processing' | 'Understanding' | 'Speaking' | 'Complete';

interface VoiceInteractionPreviewProps {
  currentLanguage: Language;
  onStartRealVoice?: () => void;
  className?: string;
}

export const VoiceInteractionPreview: React.FC<VoiceInteractionPreviewProps> = ({
  currentLanguage,
  onStartRealVoice,
  className = '',
}) => {
  const [activeState, setActiveState] = useState<VoiceState>('Listening');
  const [waveHeights, setWaveHeights] = useState<number[]>([30, 60, 45, 80, 55, 90, 70, 40, 85, 60, 45, 75, 35, 65, 50]);

  // Subtle live dynamic waveform pulse
  useEffect(() => {
    if (activeState === 'Listening' || activeState === 'Speaking') {
      const interval = setInterval(() => {
        setWaveHeights(prev =>
          prev.map(() => Math.floor(Math.random() * 55) + 25)
        );
      }, 150);
      return () => clearInterval(interval);
    } else {
      setWaveHeights([20, 25, 20, 30, 25, 30, 25, 20, 25, 20, 25, 20, 20, 25, 20]);
    }
  }, [activeState]);

  const stateDetails: Record<
    VoiceState,
    { label: string; badge: string; audioText: string; color: string; bg: string; border: string }
  > = {
    Ready: {
      label: 'Ready to Listen',
      badge: 'Tap mic or say something',
      audioText: currentLanguage === 'mr' ? 'उन्नती बोलत आहे, तुमची माहिती सांगा...' : currentLanguage === 'hi' ? 'उन्नति तैयार है, अपने अनुभव के बारे में बताएं...' : 'UNNATI is ready, speak about your daily work...',
      color: 'text-[#666666]',
      bg: 'bg-neutral-100',
      border: 'border-neutral-200',
    },
    Listening: {
      label: 'Listening...',
      badge: 'Active Audio Stream (16kHz)',
      audioText: currentLanguage === 'mr' ? '"मी घरांमध्ये वायरिंग आणि मोटार दुरुस्तीची कामे करतो..."' : currentLanguage === 'hi' ? '"मैं घरों में बिजली की वायरिंग और मोटर रिपेयर का काम करता हूँ..."' : '"I do residential electrical wiring and water pump repairs..."',
      color: 'text-amber-800',
      bg: 'bg-amber-50',
      border: 'border-amber-300',
    },
    Processing: {
      label: 'Processing Audio...',
      badge: 'Noise Suppression & ASR',
      audioText: 'Transcribing speech: SC dialect acoustic normalization in progress...',
      color: 'text-sky-800',
      bg: 'bg-sky-50',
      border: 'border-sky-300',
    },
    Understanding: {
      label: 'Understanding Experience...',
      badge: 'Intent & Skill Extraction',
      audioText: 'Identified: 3 yrs electrical experience · Tool handling · Seeks wage employment in 20km',
      color: 'text-indigo-800',
      bg: 'bg-indigo-50',
      border: 'border-indigo-300',
    },
    Speaking: {
      label: 'Speaking Response...',
      badge: 'High-Fidelity Regional TTS',
      audioText: currentLanguage === 'mr' ? '"खूप छान! तुमच्या अनुभवासाठी सोलर पीव्ही तंत्रज्ञ हा उत्तम मार्ग आहे."' : currentLanguage === 'hi' ? '"बहुत बढ़िया! आपके अनुभव के आधार पर सोलर पीवी टेक्नीशियन सबसे सही रहेगा."' : '"Excellent! Based on your wiring skills, Solar PV Technician is a direct match."',
      color: 'text-emerald-800',
      bg: 'bg-emerald-50',
      border: 'border-emerald-300',
    },
    Complete: {
      label: 'Session Complete',
      badge: 'Profile & Skill Gap Generated',
      audioText: 'Ready to view tailored NSQF Level 3/4 recommendations with 100% GIA subsidy',
      color: 'text-neutral-900',
      bg: 'bg-neutral-100',
      border: 'border-neutral-300',
    },
  };

  const currentConfig = stateDetails[activeState];

  const statesList: VoiceState[] = ['Ready', 'Listening', 'Processing', 'Understanding', 'Speaking', 'Complete'];

  return (
    <div
      className={cn(
        'w-full max-w-3xl bg-white border border-[#E7E7E3] rounded-[24px] p-5 sm:p-7 shadow-card transition-all',
        className
      )}
    >
      {/* State Switcher Tabs */}
      <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-[#E7E7E3] overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 flex-nowrap">
          {statesList.map(st => (
            <button
              key={st}
              onClick={() => setActiveState(st)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all',
                activeState === st
                  ? 'bg-[#181818] text-white shadow-sm font-bold'
                  : 'text-[#666666] hover:text-[#181818] hover:bg-neutral-100'
              )}
            >
              {st}
            </button>
          ))}
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-[#8A8A8A] font-semibold">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Interactive State Demo</span>
        </span>
      </div>

      {/* Voice Visual Centerpiece */}
      <div
        className={cn(
          'p-5 sm:p-6 rounded-[20px] border transition-all flex flex-col items-center justify-center text-center',
          currentConfig.bg,
          currentConfig.border
        )}
      >
        {/* Pulsing Mic Circle */}
        <div className="relative mb-4">
          <div
            className={cn(
              'w-16 h-16 rounded-full flex items-center justify-center text-white shadow-md transition-all',
              activeState === 'Listening'
                ? 'bg-gradient-to-tr from-amber-500 to-orange-500 pulse-mic-glow scale-105'
                : activeState === 'Speaking'
                ? 'bg-gradient-to-tr from-emerald-500 to-teal-500'
                : 'bg-neutral-800'
            )}
          >
            {activeState === 'Speaking' ? (
              <Volume2 className="w-7 h-7" />
            ) : activeState === 'Complete' ? (
              <CheckCircle2 className="w-7 h-7" />
            ) : activeState === 'Processing' || activeState === 'Understanding' ? (
              <RefreshCw className="w-6 h-6 animate-spin text-white" />
            ) : (
              <Mic className="w-7 h-7 stroke-[2.2]" />
            )}
          </div>
        </div>

        {/* State Title & Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          <h3 className={cn('text-lg font-bold tracking-tight', currentConfig.color)}>
            {currentConfig.label}
          </h3>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-white/80 text-[#666666] border border-[#E7E7E3] font-semibold">
            {currentConfig.badge}
          </span>
        </div>

        {/* Smooth Waveform Visual */}
        <div className="flex items-center justify-center gap-1.5 h-12 my-3 w-full max-w-sm">
          {waveHeights.map((h, i) => (
            <div
              key={i}
              className={cn(
                'w-1.5 rounded-full transition-all duration-150',
                activeState === 'Listening'
                  ? 'bg-gradient-to-t from-amber-500 to-orange-400'
                  : activeState === 'Speaking'
                  ? 'bg-gradient-to-t from-emerald-500 to-teal-400'
                  : 'bg-neutral-300'
              )}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        {/* Live Audio Dialogue Bubble */}
        <div className="bg-white/95 rounded-2xl px-5 py-3 border border-[#E7E7E3] max-w-xl shadow-subtle mt-1 text-sm text-[#181818] font-medium leading-relaxed">
          {currentConfig.audioText}
        </div>
      </div>

      {/* Footer trigger */}
      <div className="mt-4 pt-3 flex items-center justify-between text-xs text-[#666666]">
        <span>Designed for regional accents, dialects & low digital literacy</span>
        {onStartRealVoice && (
          <button
            onClick={onStartRealVoice}
            className="font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 group"
          >
            <span>Try Live Voice Session</span>
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </button>
        )}
      </div>
    </div>
  );
};

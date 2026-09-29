import React from 'react';
import { Mic, MicOff, RotateCcw, SkipForward, Pause, Play, Sparkles, Volume2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { VoiceWaveform } from './VoiceWaveform';

interface VoiceRecorderProps {
  isRecording: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
  waveformLevels: number[];
  currentQuestionText: string;
  questionNumber: number;
  totalQuestions: number;
  onStartRecord: () => void;
  onStopRecord: () => void;
  onReplay: () => void;
  onSkip: () => void;
  spokenHint?: string;
  className?: string;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  isRecording,
  isProcessing,
  isSpeaking,
  waveformLevels,
  currentQuestionText,
  questionNumber,
  totalQuestions,
  onStartRecord,
  onStopRecord,
  onReplay,
  onSkip,
  spokenHint = 'बोलने के लिए बड़ा माइक बटन दबाएं',
  className,
}) => {
  const getStatusLabel = () => {
    if (isRecording) return 'Listening to your voice... (बोलते रहें)';
    if (isProcessing) return 'Understanding your experience... (समझ रहे हैं)';
    if (isSpeaking) return 'Assistant speaking... (सहायक बोल रहे हैं)';
    return 'Tap microphone to speak (माइक दबाकर बोलें)';
  };

  return (
    <div className={cn('flex flex-col items-center w-full max-w-xl mx-auto', className)}>
      {/* Question Header & Counter */}
      <div className="w-full text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs mb-3">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>QUESTION {String(questionNumber).padStart(2, '0')} OF {String(totalQuestions).padStart(2, '0')}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug px-4">
          "{currentQuestionText}"
        </h3>
      </div>

      {/* Audio Waveform Visualizer */}
      <div className="w-full max-w-md mb-8">
        <VoiceWaveform
          levels={waveformLevels}
          isActive={isRecording || isSpeaking}
          state={isRecording ? 'listening' : isSpeaking ? 'speaking' : isProcessing ? 'processing' : 'idle'}
        />
        <div className="flex items-center justify-center gap-2 mt-3 text-xs font-medium">
          {isRecording && <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />}
          {isSpeaking && <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />}
          {isProcessing && <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" />}
          <span className={cn(
            'transition-colors duration-200',
            isRecording ? 'text-amber-300 font-semibold' :
            isSpeaking ? 'text-cyan-300 font-semibold' :
            isProcessing ? 'text-purple-300 font-semibold' :
            'text-slate-400'
          )}>
            {getStatusLabel()}
          </span>
        </div>
      </div>

      {/* Central High-Touch Mic Button */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Pulsing Aura Rings when recording */}
        {isRecording && (
          <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-xl animate-pulse scale-150" />
        )}

        <button
          onClick={isRecording ? onStopRecord : onStartRecord}
          disabled={isProcessing}
          aria-label={isRecording ? 'Stop speaking' : 'Start speaking'}
          className={cn(
            'relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-2xl active:scale-95 group focus:outline-none focus:ring-4 focus:ring-amber-400/30',
            isRecording
              ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 pulse-mic-glow border-4 border-amber-300'
              : isSpeaking
              ? 'bg-cyan-500/20 text-cyan-300 border-2 border-cyan-400/50 hover:bg-cyan-500/30'
              : 'bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-amber-500/50 hover:border-amber-400 text-amber-400 hover:shadow-amber-500/20 hover:scale-105'
          )}
        >
          {isRecording ? (
            <>
              <div className="w-7 h-7 rounded-sm bg-slate-950 mb-1" />
              <span className="text-[11px] font-bold tracking-wider uppercase">DONE</span>
            </>
          ) : isProcessing ? (
            <Sparkles className="w-9 h-9 text-purple-300 animate-spin" />
          ) : (
            <>
              <Mic className="w-10 h-10 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-[11px] font-bold tracking-wider uppercase mt-1 text-slate-300 group-hover:text-white">
                SPEAK
              </span>
            </>
          )}
        </button>
      </div>

      {/* Secondary Accessible Control Actions (Replay, Skip) */}
      <div className="flex items-center gap-3">
        <button
          onClick={onReplay}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full glass-card hover:border-slate-500 text-slate-300 hover:text-white text-xs font-semibold tracking-wide transition-all active:scale-95"
          title="Replay Question Audio"
        >
          <RotateCcw className="w-4 h-4 text-cyan-400" />
          <span>Replay Question</span>
        </button>

        <button
          onClick={onSkip}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full glass-card hover:border-slate-500 text-slate-400 hover:text-white text-xs font-semibold tracking-wide transition-all active:scale-95"
          title="Skip to Next Question"
        >
          <span>Skip</span>
          <SkipForward className="w-4 h-4 text-amber-400" />
        </button>
      </div>

      {/* Subtitle helper for low-literacy beneficiaries */}
      <p className="text-xs text-slate-500 mt-5 text-center max-w-xs">
        {spokenHint}
      </p>
    </div>
  );
};

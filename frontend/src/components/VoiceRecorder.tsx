import React from 'react';
import { Mic, RotateCcw, SkipForward, Sparkles, Volume2, Square } from 'lucide-react';
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
  liveTranscript?: string;
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
  spokenHint = 'बोलने के लिए बड़ा माइक बटन दबाएं · Tap microphone to speak',
  className,
  liveTranscript,
}) => {
  const getStatusLabel = () => {
    if (isRecording) return liveTranscript ? `Hearing: "${liveTranscript}"` : 'Listening to your voice... (बोलते रहें)';
    if (isProcessing) return 'UNNATI is extracting your skills... (विश्लेषण जारी है)';
    if (isSpeaking) return 'UNNATI Assistant speaking... (सहायक बोल रहे हैं)';
    return 'Tap microphone to speak (माइक दबाकर बोलें)';
  };

  return (
    <div className={cn('flex flex-col items-center w-full max-w-xl mx-auto', className)}>
      {/* Question Header & Counter */}
      <div className="w-full text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 font-mono text-xs font-semibold mb-3">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>QUESTION {String(questionNumber).padStart(2, '0')} OF {String(totalQuestions).padStart(2, '0')}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#181818] tracking-tight leading-snug px-4">
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
          {isSpeaking && <Volume2 className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />}
          {isProcessing && <Sparkles className="w-3.5 h-3.5 text-sky-600 animate-spin" />}
          <span
            className={cn(
              'transition-colors duration-200 font-medium',
              isRecording
                ? 'text-amber-700 font-bold'
                : isSpeaking
                ? 'text-emerald-700 font-bold'
                : isProcessing
                ? 'text-sky-700 font-bold'
                : 'text-[#666666]'
            )}
          >
            {getStatusLabel()}
          </span>
        </div>
      </div>

      {/* Central High-Touch Mic Button */}
      <div className="relative flex items-center justify-center mb-8">
        {isRecording && (
          <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-xl animate-pulse scale-150" />
        )}

        <button
          onClick={isRecording ? onStopRecord : onStartRecord}
          disabled={isProcessing}
          aria-label={isRecording ? 'Stop speaking' : 'Start speaking'}
          className={cn(
            'relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-card hover:shadow-card-hover active:scale-95 group focus:outline-none focus:ring-4 focus:ring-amber-400/30',
            isRecording
              ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white pulse-mic-glow border-4 border-amber-200'
              : isSpeaking
              ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-400'
              : 'bg-white border-2 border-amber-400 text-amber-600 hover:border-amber-500 hover:bg-amber-50/50'
          )}
        >
          {isRecording ? (
            <>
              <Square className="w-7 h-7 fill-white mb-1" />
              <span className="text-[11px] font-bold tracking-wider uppercase text-white">DONE</span>
            </>
          ) : isProcessing ? (
            <Sparkles className="w-8 h-8 text-sky-600 animate-spin" />
          ) : (
            <>
              <Mic className="w-10 h-10 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-[11px] font-bold tracking-wider uppercase mt-1 text-[#666666] group-hover:text-[#181818]">
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
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E7E7E3] hover:border-neutral-300 text-[#666666] hover:text-[#181818] text-xs font-semibold tracking-wide transition-all shadow-subtle active:scale-95"
          title="Replay Question Audio"
        >
          <RotateCcw className="w-3.5 h-3.5 text-sky-600" />
          <span>Replay Question</span>
        </button>

        <button
          onClick={onSkip}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E7E7E3] hover:border-neutral-300 text-[#666666] hover:text-[#181818] text-xs font-semibold tracking-wide transition-all shadow-subtle active:scale-95"
          title="Skip to Next Question"
        >
          <span>Skip</span>
          <SkipForward className="w-3.5 h-3.5 text-amber-600" />
        </button>
      </div>

      {/* Subtitle helper / Live Transcript Preview */}
      {isRecording && liveTranscript ? (
        <div className="mt-4 px-4 py-2.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium animate-in fade-in duration-200 text-center max-w-md shadow-sm">
          <span className="text-[10px] font-bold text-amber-600 block uppercase tracking-wider mb-0.5">Live Voice Input</span>
          "{liveTranscript}"
        </div>
      ) : (
        <p className="text-xs text-[#8A8A8A] mt-5 text-center max-w-xs">
          {spokenHint}
        </p>
      )}
    </div>
  );
};

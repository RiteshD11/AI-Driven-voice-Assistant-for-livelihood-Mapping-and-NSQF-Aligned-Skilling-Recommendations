import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  Volume2,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useVoiceSession } from '../hooks/useVoiceSession';
import { VoiceRecorder } from '../components/VoiceRecorder';
import { ConversationBubble } from '../components/ConversationBubble';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { Language } from '../types';

interface VoiceJourneyPageProps {
  currentLanguage: Language;
  onCompleteSession: () => void;
}

export const VoiceJourneyPage: React.FC<VoiceJourneyPageProps> = ({
  currentLanguage,
  onCompleteSession,
}) => {
  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    isRecording,
    isProcessing,
    isSpeaking,
    waveformLevels,
    messages,
    startRecording,
    stopRecordingAndProcess,
    nextQuestion,
    replayQuestion,
  } = useVoiceSession('ben-sc-2026-001', currentLanguage);

  const [showTranscriptDrawer, setShowTranscriptDrawer] = useState(false);

  const localizedQuestion = currentQuestion.questionText[currentLanguage] || currentQuestion.questionText['hi'];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 flex flex-col items-center">
      {/* Top Breadcrumb & Progress */}
      <div className="w-full max-w-xl mb-6">
        <ProgressIndicator
          current={currentQuestionIndex + 1}
          total={totalQuestions}
          label="Voice Discovery Session"
          variant="amber"
        />
      </div>

      {/* Main Tactile Voice Interaction Center */}
      <div className="w-full rounded-3xl glass-card border border-slate-700/80 p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-6 text-center">
        {/* Top subtle decorative strip */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-cyan-400" />

        <VoiceRecorder
          isRecording={isRecording}
          isProcessing={isProcessing}
          isSpeaking={isSpeaking}
          waveformLevels={waveformLevels}
          currentQuestionText={localizedQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          onStartRecord={startRecording}
          onStopRecord={() => stopRecordingAndProcess()}
          onReplay={replayQuestion}
          onSkip={nextQuestion}
          spokenHint="बोलने के लिए माइक दबाएं · Speak in your native language"
        />

        {/* Next Question / Finish Button */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => setShowTranscriptDrawer(!showTranscriptDrawer)}
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span>{showTranscriptDrawer ? 'Hide Transcript' : 'View Real-time Transcript'}</span>
            {showTranscriptDrawer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onCompleteSession}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold text-xs tracking-wide shadow-lg shadow-amber-500/10 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Proceed to AI Profile (प्रोफ़ाइल देखें)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Secondary Transcript Accordion (Collapsible so voice remains king) */}
      {showTranscriptDrawer && (
        <div className="w-full max-w-2xl rounded-2xl glass-card border border-slate-800 p-5 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Real-time Voice Transcript</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">Auto-saved to GIA session</span>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {messages.map(msg => (
              <ConversationBubble key={msg.id} message={msg} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useVoiceSession } from '../hooks/useVoiceSession';
import { VoiceRecorder } from '../components/VoiceRecorder';
import { ConversationBubble } from '../components/ConversationBubble';
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
    liveTranscript,
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
      {/* Main Tactile Voice Interaction Center */}
      <div className="w-full rounded-[24px] bg-white border border-[#E7E7E3] p-6 sm:p-10 shadow-card relative overflow-hidden mb-6 text-center">
        {/* Top subtle decorative strip */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />

        <VoiceRecorder
          isRecording={isRecording}
          isProcessing={isProcessing}
          isSpeaking={isSpeaking}
          waveformLevels={waveformLevels}
          liveTranscript={liveTranscript}
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
        <div className="mt-8 pt-6 border-t border-[#E7E7E3] flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => setShowTranscriptDrawer(!showTranscriptDrawer)}
            className="flex items-center gap-2 text-xs font-semibold text-[#666666] hover:text-[#181818] transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-amber-600" />
            <span>{showTranscriptDrawer ? 'Hide Transcript' : 'View Real-time Spoken Transcript'}</span>
            {showTranscriptDrawer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onCompleteSession}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Proceed to My Profile (प्रोफ़ाइल देखें)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Secondary Transcript Accordion */}
      {showTranscriptDrawer && (
        <div className="w-full max-w-2xl rounded-[20px] bg-white border border-[#E7E7E3] p-5 space-y-4 shadow-subtle animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E7E3]">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#181818] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Real-time Voice Transcript</span>
            </div>
            <span className="text-[11px] font-mono text-[#8A8A8A]">Auto-saved to PM-AJAY session</span>
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

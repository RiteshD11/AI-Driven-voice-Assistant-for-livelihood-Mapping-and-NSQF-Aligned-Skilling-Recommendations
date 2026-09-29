/**
 * Kaushal Saathi - Voice Session Hook
 * Manages voice state machine (idle -> listening -> processing -> speaking),
 * question progress (e.g. 03/08), waveform audio simulation, and transcript sync.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { VoiceSession, ConversationMessage, Language } from '../types';
import { voiceService } from '../services/voice.service';
import { mockVoiceQuestions } from '../data/mock/voiceSessions';

export function useVoiceSession(beneficiaryId: string = 'ben-sc-2026-001', initialLang: Language = 'hi') {
  const [session, setSession] = useState<VoiceSession | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(2); // Start at question 3 for instant engagement
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [waveformLevels, setWaveformLevels] = useState<number[]>([15, 25, 45, 70, 85, 60, 40, 20]);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const audioIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize session
  useEffect(() => {
    let mounted = true;
    async function init() {
      try {
        const res = await voiceService.createVoiceSession(initialLang);
        if (mounted && res) {
          setSession(res);
          if (res.transcript) {
            setMessages(res.transcript);
          } else if (res.messages) {
            setMessages(res.messages);
          }
        }
      } catch (err: unknown) {
        if (mounted) setError('Voice initialization failed. Reverting to interactive mode.');
      }
    }
    init();
    return () => {
      mounted = false;
    };
  }, [beneficiaryId, initialLang]);

  // Waveform animation loop when listening or speaking
  useEffect(() => {
    if (isRecording || isSpeaking) {
      audioIntervalRef.current = setInterval(() => {
        setWaveformLevels(Array.from({ length: 16 }, () => Math.floor(Math.random() * 85) + 15));
      }, 100);
    } else {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      setWaveformLevels([15, 20, 30, 25, 18, 15, 20, 22, 18, 15, 20, 25, 30, 20, 15, 12]);
    }
    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    };
  }, [isRecording, isSpeaking]);

  const currentQuestion = mockVoiceQuestions[currentQuestionIndex] || mockVoiceQuestions[0];

  // Start voice input simulation
  const startRecording = useCallback(() => {
    setIsRecording(true);
    setIsProcessing(false);
    setIsSpeaking(false);
  }, []);

  // Stop recording and simulate AI analysis
  const stopRecordingAndProcess = useCallback(async (spokenText?: string) => {
    setIsRecording(false);
    setIsProcessing(true);

    const question = mockVoiceQuestions[currentQuestionIndex];
    const userUtterance = spokenText || (
      question.id === 'vq-03'
        ? 'मैं गाँव में बिजली के छोटे-मोटे काम, मोटर रिवाइंडिंग और ट्यूबवेल स्टार्टर रिपेयर करता हूँ।'
        : question.expectedAnswers[0]
    );

    // Simulate 1.2s NLP processing latency
    setTimeout(async () => {
      const userMsg: ConversationMessage = {
        id: `msg-${Date.now()}-u`,
        sender: 'user',
        text: userUtterance,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, userMsg]);
      setIsProcessing(false);
      setIsSpeaking(true);

      // AI audio speaking response
      setTimeout(() => {
        setIsSpeaking(false);
        const aiMsg: ConversationMessage = {
          id: `msg-${Date.now()}-a`,
          sender: 'assistant',
          text: `बहुत बढ़िया। आपकी यह मोटर रिवाइंडिंग और बुनियादी वायरिंग की जानकारी सोलर पैनल और इनवर्टर इंस्टॉलेशन के लिए बहुत उपयोगी है।`,
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, aiMsg]);
      }, 1800);
    }, 1200);
  }, [currentQuestionIndex]);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < mockVoiceQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex]);

  const replayQuestion = useCallback(() => {
    setIsSpeaking(true);
    setTimeout(() => {
      setIsSpeaking(false);
    }, 1500);
  }, []);

  return {
    session,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions: mockVoiceQuestions.length,
    isRecording,
    isProcessing,
    isSpeaking,
    waveformLevels,
    messages,
    error,
    startRecording,
    stopRecordingAndProcess,
    nextQuestion,
    replayQuestion,
  };
}

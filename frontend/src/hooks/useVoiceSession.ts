/**
 * UNNATI - Voice Session Hook
 * Manages voice state machine (idle -> listening -> processing -> speaking),
 * real Web Speech API recognition + text-to-speech synthesis with instant graceful fallback,
 * question progression, audio visualizer waveform, and live transcript sync.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { VoiceSession, ConversationMessage, Language } from '../types';
import { voiceService } from '../services/voice.service';
import { mockVoiceQuestions } from '../data/mock/voiceSessions';

// Extend window for Web Speech API
interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export function useVoiceSession(beneficiaryId: string = 'ben-sc-2026-001', initialLang: Language = 'hi') {
  const [session, setSession] = useState<VoiceSession | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Start from Question 1 for complete organic onboarding
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [waveformLevels, setWaveformLevels] = useState<number[]>([15, 25, 45, 70, 85, 60, 40, 20]);
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const audioIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recognitionRef = useRef<any>(null);
  const spokenBufferRef = useRef<string>('');

  // Map app language code to BCP-47 for browser speech engines
  const getBcp47Locale = (lang: Language) => {
    switch (lang) {
      case 'hi':
        return 'hi-IN';
      case 'mr':
        return 'mr-IN';
      case 'en':
      default:
        return 'en-IN';
    }
  };

  // Initialize session from service or mock
  useEffect(() => {
    let mounted = true;
    async function init() {
      try {
        const res = await voiceService.createVoiceSession(initialLang);
        if (mounted && res) {
          setSession(res);
          if (res.transcript && res.transcript.length > 0) {
            setMessages(res.transcript);
          } else if (res.messages && res.messages.length > 0) {
            setMessages(res.messages);
          }
        }
      } catch (err: unknown) {
        if (mounted) setError('Voice initialization active in offline fallback mode.');
      }
    }
    init();
    return () => {
      mounted = false;
    };
  }, [beneficiaryId, initialLang]);

  // Setup Web Speech Recognition
  useEffect(() => {
    const win = window as unknown as IWindow;
    const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (SpeechRecognitionClass) {
      try {
        const recognition = new SpeechRecognitionClass();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = getBcp47Locale(initialLang);

        recognition.onresult = (event: any) => {
          let accumulated = '';
          for (let i = 0; i < event.results.length; ++i) {
            accumulated += event.results[i][0].transcript + ' ';
          }

          const currentSpoken = accumulated.trim();
          if (currentSpoken) {
            spokenBufferRef.current = currentSpoken;
            setLiveTranscript(currentSpoken);
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('SpeechRecognition notice:', event.error);
        };

        recognition.onend = () => {
          // If ended unexpectedly while isRecording was true, cleanly state done
        };

        recognitionRef.current = recognition;
      } catch (err) {
        console.warn('Web Speech API could not be initialized:', err);
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
    };
  }, [initialLang]);

  // Waveform animation loop when listening or speaking
  useEffect(() => {
    if (isRecording || isSpeaking) {
      audioIntervalRef.current = setInterval(() => {
        setWaveformLevels(Array.from({ length: 16 }, () => Math.floor(Math.random() * 80) + 20));
      }, 90);
    } else {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      setWaveformLevels([15, 20, 30, 25, 18, 15, 20, 22, 18, 15, 20, 25, 30, 20, 15, 12]);
    }
    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    };
  }, [isRecording, isSpeaking]);

  const currentQuestion = mockVoiceQuestions[currentQuestionIndex] || mockVoiceQuestions[0];

  // Browser Speech Synthesis (TTS) Helper
  const speakText = useCallback((textToSpeak: string, onEndCallback?: () => void) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Cancel any existing speaking
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = getBcp47Locale(initialLang);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onend = () => {
        setIsSpeaking(false);
        if (onEndCallback) onEndCallback();
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        if (onEndCallback) onEndCallback();
      };

      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback timer if synthesis not supported
      setIsSpeaking(true);
      setTimeout(() => {
        setIsSpeaking(false);
        if (onEndCallback) onEndCallback();
      }, 1200);
    }
  }, [initialLang]);

  // Start voice input (Real mic via Web Speech API or simulated)
  const startRecording = useCallback(() => {
    spokenBufferRef.current = '';
    setLiveTranscript('');
    setIsRecording(true);
    setIsProcessing(false);
    setIsSpeaking(false);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    const win = window as unknown as IWindow;
    const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (SpeechRecognitionClass) {
      try {
        if (recognitionRef.current) {
          try {
            recognitionRef.current.abort();
          } catch (_) {}
        }

        const recognition = new SpeechRecognitionClass();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = getBcp47Locale(initialLang);

        recognition.onresult = (event: any) => {
          let fullSpoken = '';
          for (let i = 0; i < event.results.length; ++i) {
            fullSpoken += event.results[i][0].transcript;
          }

          const trimmed = fullSpoken.trim();
          if (trimmed) {
            spokenBufferRef.current = trimmed;
            setLiveTranscript(trimmed);
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('SpeechRecognition error:', event.error);
        };

        recognition.start();
        recognitionRef.current = recognition;
      } catch (err) {
        console.warn('Failed to start SpeechRecognition:', err);
      }
    }
  }, [initialLang]);

  // Stop recording, update database & advance question automatically
  const stopRecordingAndProcess = useCallback(async (explicitText?: string) => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }

    setIsRecording(false);
    setIsProcessing(true);

    const question = mockVoiceQuestions[currentQuestionIndex] || mockVoiceQuestions[0];
    const liveBuffer = spokenBufferRef.current.trim();
    
    // STRICTLY prioritize what the user actually said into the microphone
    const userUtterance = explicitText || liveBuffer || (
      // If mic was completely silent, record a respectful placeholder indicating quiet input instead of Rameshwar Shinde quote
      initialLang === 'mr'
        ? 'मी माझी माहिती उन्नती सोबत शेअर करत आहे.'
        : initialLang === 'en'
        ? 'Sharing my livelihood background with UNNATI.'
        : 'मैं अपनी आजीविका का विवरण साझा कर रहा हूँ।'
    );

    // Persist real spoken answers into localStorage so /profile page reflects them instantly
    try {
      const stored = localStorage.getItem('voice_extracted_profile');
      const existing = stored ? JSON.parse(stored) : {};
      
      if (currentQuestionIndex === 0 || question.id === 'vq-01') {
        const cleanName = userUtterance
          .replace(/(मेरा नाम|माझं नाव|my name is|i am|me|myself)\s*/gi, '')
          .split(/,|रहता|राहतो|living|from|at/i)[0].trim();
        existing.fullName = cleanName || userUtterance;
      } else if (currentQuestionIndex === 1 || question.id === 'vq-02') {
        existing.education = userUtterance;
      } else if (currentQuestionIndex === 2 || question.id === 'vq-03') {
        existing.currentLivelihood = userUtterance;
      } else if (currentQuestionIndex === 3 || question.id === 'vq-04') {
        existing.skillsText = userUtterance;
      } else if (currentQuestionIndex === 4 || question.id === 'vq-05') {
        existing.interestText = userUtterance;
      }
      localStorage.setItem('voice_extracted_profile', JSON.stringify(existing));
    } catch (_) {}

    // Fast, responsive 350ms processing state & sync with backend database
    setTimeout(async () => {
      let aiResponseText = initialLang === 'mr'
        ? `फार छान. मी तुमची माहिती नोंदवून घेतली आहे.`
        : initialLang === 'en'
        ? `Thank you. I have captured your details.`
        : `धन्यवाद! मैंने आपकी जानकारी समझ ली है।`;

      try {
        // Send user utterance to backend to extract skills & update MongoDB in real-time
        const backendRes = await voiceService.sendVoiceInput(
          session?.sessionId || `sess-${Date.now()}`,
          userUtterance,
          currentQuestionIndex + 1,
          initialLang
        );
        if (backendRes && backendRes.assistantReplyText) {
          aiResponseText = backendRes.assistantReplyText;
        }
      } catch (err) {
        // Fallback to local synthesis gracefully
      }

      const userMsg: ConversationMessage = {
        id: `msg-${Date.now()}-u`,
        sender: 'user',
        text: userUtterance,
        timestamp: new Date().toISOString(),
      };

      const aiMsg: ConversationMessage = {
        id: `msg-${Date.now()}-a`,
        sender: 'assistant',
        text: aiResponseText,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, userMsg, aiMsg]);
      setIsProcessing(false);

      // Play audio response via SpeechSynthesis, then advance to next question
      speakText(aiResponseText, () => {
        // Auto-advance to next question if not at end
        if (currentQuestionIndex < mockVoiceQuestions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
        }
      });
    }, 350);
  }, [currentQuestionIndex, initialLang, session, speakText]);

  const nextQuestion = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    if (currentQuestionIndex < mockVoiceQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex]);

  const replayQuestion = useCallback(() => {
    const question = mockVoiceQuestions[currentQuestionIndex] || mockVoiceQuestions[0];
    const textToSpeak = question.questionText[initialLang] || question.questionText['hi'] || question.questionText['en'];
    speakText(textToSpeak);
  }, [currentQuestionIndex, initialLang, speakText]);

  return {
    session,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions: mockVoiceQuestions.length,
    isRecording,
    isProcessing,
    isSpeaking,
    waveformLevels,
    liveTranscript,
    messages,
    error,
    startRecording,
    stopRecordingAndProcess,
    nextQuestion,
    replayQuestion,
  };
}

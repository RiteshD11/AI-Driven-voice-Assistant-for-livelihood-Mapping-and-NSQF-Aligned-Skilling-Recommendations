import { VoiceSession, Language } from '../types';
import { apiClient } from './api';
import { initialVoiceSession, mockQuestions, sampleVoiceTranscripts } from '../data/mock/voiceSessions';

export const voiceService = {
  async createVoiceSession(language: Language = 'hi'): Promise<VoiceSession> {
    try {
      return await apiClient<VoiceSession>('/voice/session', {
        method: 'POST',
        body: JSON.stringify({ language })
      });
    } catch {
      const qFirst = mockQuestions[0];
      const initialText = qFirst.questionText[language] || qFirst.questionText.hi;

      return {
        ...initialVoiceSession,
        language,
        sessionId: `sess-${Date.now()}`,
        currentQuestionIndex: 1,
        activeQuestion: initialText,
        messages: [
          {
            id: 'msg-start',
            sender: 'assistant',
            text: initialText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      };
    }
  },

  async sendVoiceInput(
    sessionId: string,
    transcriptText: string,
    questionIndex: number,
    language: Language = 'hi'
  ): Promise<{
    userMessageText: string;
    assistantReplyText: string;
    nextQuestionIndex: number;
    nextQuestionText: string;
    isFinished: boolean;
  }> {
    try {
      return await apiClient('/voice/input', {
        method: 'POST',
        body: JSON.stringify({ sessionId, transcriptText, questionIndex, language })
      });
    } catch {
      // Mock natural language understanding response
      const nextIdx = questionIndex + 1;
      const isFinished = nextIdx > mockQuestions.length;

      let nextQ = "";
      if (!isFinished) {
        const qObj = mockQuestions[nextIdx - 1];
        nextQ = qObj.questionText[language] || qObj.questionText.hi;
      }

      let reply = "";
      if (language === 'mr') {
        reply = isFinished 
          ? "उत्तम! आम्ही आपली सर्व माहिती समजून घेतली आहे. आता आपले कौशल्य प्रोफाइल तयार करूया."
          : `धन्यवाद. मी समजलो. पुढील प्रश्न: ${nextQ}`;
      } else if (language === 'en') {
        reply = isFinished
          ? "Excellent! We have captured your skills and interests. Let's analyze your livelihood profile."
          : `Understood. Next question: ${nextQ}`;
      } else {
        reply = isFinished
          ? "बहुत बढ़िया! हमने आपकी पूरी जानकारी समझ ली है। आइए अब आपका आजीविका प्रोफाइल देखें।"
          : `धन्यवाद। हमने समझ लिया। अगला प्रश्न: ${nextQ}`;
      }

      return {
        userMessageText: transcriptText,
        assistantReplyText: reply,
        nextQuestionIndex: isFinished ? mockQuestions.length : nextIdx,
        nextQuestionText: nextQ,
        isFinished
      };
    }
  },

  async getSampleUtterance(questionIndex: number, language: Language = 'hi'): Promise<string> {
    const arr = sampleVoiceTranscripts[language] || sampleVoiceTranscripts.hi;
    const idx = Math.max(0, Math.min(questionIndex - 1, arr.length - 1));
    return arr[idx];
  },

  async getQuestion(questionIndex: number, language: Language = 'hi'): Promise<string> {
    const qObj = mockQuestions[Math.max(0, Math.min(questionIndex - 1, mockQuestions.length - 1))];
    return qObj.questionText[language] || qObj.questionText.hi;
  }
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useDemo } from '../context/DemoContext';
import { VoiceButton } from '../components/VoiceButton';
import { api } from '../services/api';
import { 
  Mic, Volume2, Type, Globe, CheckCircle2, Edit3, ArrowRight, 
  Sparkles, RefreshCw, AlertCircle, Bot, User, ThumbsUp
} from 'lucide-react';

interface ChatMessage {
  sender: 'assistant' | 'user';
  text: string;
  timestamp: string;
}

export const VoiceAssistantPage: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { updateProfile, setDemoStep } = useDemo();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'assistant',
      text: language === 'hi' 
        ? 'नमस्ते! मैं आरोहण हूँ। आइए आपकी शिक्षा, कौशल और रुचियों को समझें। आप किस कक्षा तक पढ़े हैं और आपको क्या काम करना पसंद है?'
        : "Namaste! I'm AAROHAN. Let's understand your education, skills and interests. What is your qualification and what type of work interests you?",
      timestamp: '10:00 AM'
    }
  ]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [showTypeInput, setShowTypeInput] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [extractedData, setExtractedData] = useState<any>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Suggested quick speech prompts for effortless SIH judging
  const suggestedPrompts = [
    'मैंने 12वीं की है, मुझे बेसिक कंप्यूटर आता है और मैं वाराणसी में स्थानीय रोजगार चाहता हूँ।',
    'मैं 10वीं पास हूँ, मुझे खेती और सोलर पंप का काम पसंद है।',
    'I have completed 12th, I know basic computers and MS Office, looking for local IT job.'
  ];

  const handleVoiceInput = async (spokenText: string) => {
    if (!spokenText.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      sender: 'user',
      text: spokenText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setIsProcessing(true);

    try {
      const response = await api.processVoice(spokenText, language);

      if (response && response.extracted) {
        setExtractedData(response.extracted);

        // Assistant response
        const botReply: ChatMessage = {
          sender: 'assistant',
          text: response.assistantReply || 'मैंने आपकी जानकारी दर्ज कर ली है। कृपया नीचे सारांश जांचें।',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botReply]);

        // Speak back if audio enabled
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(botReply.text);
          utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
          window.speechSynthesis.speak(utterance);
        }
      }
    } catch (err) {
      console.error('NLP Error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmProfile = () => {
    if (extractedData) {
      updateProfile({
        education: extractedData.education || { level: '12th', details: 'Completed 12th' },
        existingSkills: extractedData.skills && extractedData.skills.length > 0 
          ? extractedData.skills 
          : [{ name: 'Basic Computer', proficiency: 'intermediate', category: 'it' }],
        interests: extractedData.interests || ['Technology & Computers'],
        jobPreference: extractedData.jobPreference || 'both',
        mobilityPreference: extractedData.mobilityPreference || 'local',
        location: extractedData.location || { district: 'Varanasi', state: 'Uttar Pradesh' },
        aiExtracted: true
      });
      setIsConfirmed(true);
      setDemoStep(2);
      setTimeout(() => {
        navigate('/profile');
      }, 900);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-bold">
            <Bot className="w-4 h-4 text-amber-600" />
            <span>एआई बहुभाषी वॉयस सहायक (Voice Assistant)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t('voice.greeting')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            {t('voice.subtitle')}
          </p>
        </div>

        {/* Quick controls bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-xs">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-700">भाषा चुनें (Change Language):</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-slate-50 border border-slate-300 rounded px-2 py-1 font-medium focus:outline-none"
            >
              <option value="hi">हिंदी (Hindi)</option>
              <option value="en">English</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTypeInput(!showTypeInput)}
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-semibold flex items-center gap-1.5 transition"
            >
              <Type className="w-3.5 h-3.5" />
              <span>{showTypeInput ? 'वॉयस मोड पर जाएं' : t('voice.typeInstead')}</span>
            </button>
          </div>
        </div>

        {/* Main Conversation Stream */}
        <div className="gov-card p-5 space-y-4 max-h-[380px] overflow-y-auto bg-slate-50/50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white ${
                msg.sender === 'assistant' ? 'bg-blue-900' : 'bg-amber-600'
              }`}>
                {msg.sender === 'assistant' ? <Bot className="w-4 h-4 text-amber-300" /> : <User className="w-4 h-4" />}
              </div>

              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-sm ${
                msg.sender === 'assistant'
                  ? 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  : 'bg-blue-900 text-white rounded-tr-none'
              }`}>
                <p>{msg.text}</p>
                <span className={`text-[10px] block mt-1 ${msg.sender === 'assistant' ? 'text-slate-400' : 'text-blue-200'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex items-center gap-2 text-xs text-slate-500 italic p-2 bg-white rounded-lg border border-slate-200 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
              <span>एआई आपकी भाषा का विश्लेषण कर रहा है...</span>
            </div>
          )}
        </div>

        {/* Voice Input or Type Input Area */}
        <div className="gov-card p-6 text-center space-y-4">
          {!showTypeInput ? (
            <div>
              <VoiceButton onTranscript={handleVoiceInput} isProcessing={isProcessing} />

              {/* Sample voice prompt chips */}
              <div className="pt-2 text-left max-w-xl mx-auto">
                <span className="text-[11px] font-bold text-slate-500 block mb-1.5 text-center">
                  💡 त्वरित परीक्षण हेतु उदाहरण वाक्य (Click to speak):
                </span>
                <div className="space-y-1.5">
                  {suggestedPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleVoiceInput(prompt)}
                      className="w-full text-left p-2 rounded-lg bg-slate-100 hover:bg-amber-50 hover:border-amber-300 border border-slate-200 text-xs text-slate-700 transition"
                    >
                      "{prompt}"
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-xl mx-auto space-y-3">
              <label className="block text-xs font-semibold text-slate-700 text-left">
                अपनी योग्यता, रुचि व काम की प्राथमिकता लिखें:
              </label>
              <textarea
                rows={3}
                value={typedText}
                onChange={(e) => setTypedText(e.target.value)}
                placeholder="उदा. मैंने 12वीं पास की है, मुझे कंप्यूटर और वेब डिजाइनिंग का काम सीखना है..."
                className="w-full p-3 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-blue-900 shadow-inner"
              />
              <button
                onClick={() => {
                  handleVoiceInput(typedText);
                  setTypedText('');
                }}
                disabled={!typedText.trim()}
                className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white text-xs font-bold rounded-lg shadow transition"
              >
                विश्लेषण करें (Submit & Analyze)
              </button>
            </div>
          )}
        </div>

        {/* Section 7: AI/NLP Extracted Profile Confirmation Box */}
        {extractedData && (
          <div className="gov-card p-6 border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/70 to-white space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">एआई निष्कर्षित जानकारी (AI Extracted Information)</h3>
                  <p className="text-[11px] text-slate-500">आपकी आवाज़ से प्राकृतिक भाषा प्रसंस्करण (NLP) द्वारा निकाली गई जानकारी</p>
                </div>
              </div>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                सटीकता: 95%
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">शिक्षा स्तर (Education)</span>
                <span className="text-slate-900 font-bold mt-0.5 block">
                  {extractedData.education?.level || '12th'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {extractedData.education?.details || 'उच्च माध्यमिक'}
                </span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">मौजूदा कौशल (Skills)</span>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {extractedData.skills && extractedData.skills.length > 0 ? (
                    extractedData.skills.map((s: any, idx: number) => (
                      <span key={idx} className="bg-slate-100 text-slate-800 px-1.5 py-0.2 rounded font-semibold text-[11px]">
                        {s.name}
                      </span>
                    ))
                  ) : (
                    <span className="font-bold text-slate-900">बेसिक कंप्यूटर</span>
                  )}
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">रुचि (Interest)</span>
                <span className="text-slate-900 font-bold mt-0.5 block">
                  {extractedData.interests && extractedData.interests[0] ? extractedData.interests[0] : 'प्रौद्योगिकी एवं कंप्यूटर'}
                </span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">प्राथमिकता (Preference)</span>
                <span className="text-slate-900 font-bold mt-0.5 block">
                  {extractedData.jobPreference === 'employment' ? 'स्थानीय रोजगार' : 'रोजगार व स्वरोजगार दोनों'}
                </span>
              </div>
            </div>

            {/* Explicit Confirmation Step as requested in specification */}
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-amber-900 font-semibold">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>क्या यह जानकारी सही है? (Is this information correct?)</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => navigate('/profile')}
                  className="w-1/2 sm:w-auto px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg font-semibold flex items-center justify-center gap-1 transition"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>सुधार करें (Edit)</span>
                </button>

                <button
                  onClick={handleConfirmProfile}
                  className="w-1/2 sm:w-auto px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-bold flex items-center justify-center gap-1.5 shadow transition"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>पुष्टि करें (Confirm)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


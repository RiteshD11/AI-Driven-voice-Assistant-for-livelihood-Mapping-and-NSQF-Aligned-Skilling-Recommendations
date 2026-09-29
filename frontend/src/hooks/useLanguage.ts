/**
 * UNNATI - Language Hook & Localization Context
 * Supports English, Hindi (हिंदी), and Marathi (मराठी) with extensible schema
 * Product: UNNATI (AI-Powered Livelihood & Skilling Assistant)
 * Problem Statement: SIH26097 - PM-AJAY GIA
 */

import { useState, createContext, useContext, ReactNode } from 'react';
import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  contextBadge: string;
  heroHeadline: string;
  heroSubheadline: string;
  startJourney: string;
  howItWorks: string;
  tryDemo: string;
  tryDemoNav: string;
  myJourney: string;
  training: string;
  opportunities: string;
  progress: string;
  selectLanguage: string;
  selectLanguageDesc: string;
  listen: string;
  understand: string;
  profile: string;
  assess: string;
  recommend: string;
  train: string;
  connect: string;
  track: string;
  voicePrompt: string;
  listening: string;
  understanding: string;
  preparingResponse: string;
  speakButton: string;
  replayButton: string;
  pauseButton: string;
  skipButton: string;
  analyzeSkills: string;
  whyThis: string;
  explorePathway: string;
  startTraining: string;
  viewOpportunity: string;
  respondVoice: string;
  demoDataBadge: string;
  adminTitle: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'UNNATI',
    tagline: 'AI-Powered Livelihood & Skilling Assistant',
    contextBadge: 'PM-AJAY · GIA · SIH26097',
    heroHeadline: 'Your skills have a story.\nLet’s discover where they can take you.',
    heroSubheadline: 'A voice-first livelihood assistant that helps you discover your skills, identify suitable NSQF-aligned training, and connect with local livelihood opportunities.',
    startJourney: 'Start My Journey',
    howItWorks: 'How UNNATI Works',
    tryDemo: 'Try 2-Minute Demo',
    tryDemoNav: 'Try Demo',
    myJourney: 'My Journey',
    training: 'Training',
    opportunities: 'Opportunities',
    progress: 'Progress',
    selectLanguage: 'Choose your language',
    selectLanguageDesc: 'Select the language you are most comfortable speaking. You can change this at any time.',
    listen: '01 Listen',
    understand: '02 Understand',
    profile: '03 Profile',
    assess: '04 Skill Gap',
    recommend: '05 Recommendations',
    train: '06 Training',
    connect: '07 Opportunity',
    track: '08 Outcome',
    voicePrompt: 'Tap the microphone and tell UNNATI about your work, experience, and aspirations',
    listening: 'Listening to your voice...',
    understanding: 'Understanding your background...',
    preparingResponse: 'Synthesizing response...',
    speakButton: 'Speak Now',
    replayButton: 'Listen Again',
    pauseButton: 'Pause',
    skipButton: 'Skip Question',
    analyzeSkills: 'Analyze My Skills',
    whyThis: 'Why this recommendation?',
    explorePathway: 'Explore Pathway',
    startTraining: 'Start Training Path',
    viewOpportunity: 'View Opportunity Details',
    respondVoice: 'Respond by Voice',
    demoDataBadge: 'DEMO DATA · PM-AJAY SIMULATION',
    adminTitle: 'UNNATI · Livelihood Intelligence',
  },
  hi: {
    appName: 'उन्नति',
    tagline: 'एआई-संचालित आजीविका एवं कौशल विकास सहायक',
    contextBadge: 'पीएम-अजय · जीआईए · SIH26097',
    heroHeadline: 'आपके हुनर की एक पहचान है।\nआइए जानें यह आपको कहाँ तक ले जा सकता है।',
    heroSubheadline: 'आवाज़-आधारित आजीविका सहायक जो आपको अपने हुनर को पहचानने, उपयुक्त एनएसक्यूएफ प्रशिक्षण पाने और स्थानीय रोजगार के अवसरों से जुड़ने में मदद करता है।',
    startJourney: 'मेरी यात्रा शुरू करें',
    howItWorks: 'उन्नति कैसे कार्य करता है',
    tryDemo: '2-मिनट का डेमो देखें',
    tryDemoNav: 'डेमो देखें',
    myJourney: 'मेरी यात्रा',
    training: 'प्रशिक्षण',
    opportunities: 'अवसर',
    progress: 'प्रगति',
    selectLanguage: 'अपनी भाषा चुनें',
    selectLanguageDesc: 'वह भाषा चुनें जिसमें आप सहजता से बोल सकें। आप इसे कभी भी बदल सकते हैं।',
    listen: '01 सुनें',
    understand: '02 समझें',
    profile: '03 प्रोफ़ाइल',
    assess: '04 कौशल अंतर',
    recommend: '05 सिफ़ारिशें',
    train: '06 प्रशिक्षण',
    connect: '07 अवसर',
    track: '08 परिणाम',
    voicePrompt: 'माइक दबाएं और उन्नति को अपने काम, अनुभव और आकांक्षाओं के बारे में बताएं',
    listening: 'आपकी आवाज़ सुन रहे हैं...',
    understanding: 'आपके अनुभव को समझ रहे हैं...',
    preparingResponse: 'जवाब तैयार किया जा रहा है...',
    speakButton: 'अब बोलें',
    replayButton: 'फिर से सुनें',
    pauseButton: 'रोकें',
    skipButton: 'आगे बढ़ें',
    analyzeSkills: 'मेरे कौशल का विश्लेषण करें',
    whyThis: 'यह सिफारिश क्यों?',
    explorePathway: 'मार्ग देखें',
    startTraining: 'प्रशिक्षण शुरू करें',
    viewOpportunity: 'अवसर का विवरण देखें',
    respondVoice: 'आवाज़ से जवाब दें',
    demoDataBadge: 'डेमो डेटा · पीएम-अजय सिमुलेशन',
    adminTitle: 'उन्नति · आजीविका इंटेलिजेंस',
  },
  mr: {
    appName: 'उन्नति',
    tagline: 'एआय-सक्षम उपजीविका आणि कौशल्य सहाय्यक',
    contextBadge: 'पीएम-अजय · जीआयए · SIH26097',
    heroHeadline: 'तुमच्या कौशल्याची एक नवी ओळख आहे.\nचला शोधूया तुमची पुढची वाटचाल.',
    heroSubheadline: 'आवाज-आधारित उपजीविका सहाय्यक जो तुम्हाला तुमच्या कौशल्यांचा शोध घेण्यास, योग्य एनएसक्यूएफ प्रशिक्षण मिळवण्यास आणि स्थानिक उपजीविकेच्या संधींशी जोडण्यास मदत करतो.',
    startJourney: 'माझा प्रवास सुरू करा',
    howItWorks: 'उन्नती कसे कार्य करते',
    tryDemo: '२ मिनिटांचा डेमो अनुभवा',
    tryDemoNav: 'डेमो पहा',
    myJourney: 'माझा प्रवास',
    training: 'प्रशिक्षण',
    opportunities: 'संधी',
    progress: 'प्रगती',
    selectLanguage: 'भाषा निवडा',
    selectLanguageDesc: 'तुम्हाला बोलण्यासाठी सर्वात सोपी वाटणारी भाषा निवडा. तुम्ही ही कधीही बदलू शकता.',
    listen: '01 ऐका',
    understand: '02 समजून घ्या',
    profile: '03 माहिती',
    assess: '04 कौशल्य तफावत',
    recommend: '05 शिफारसी',
    train: '06 प्रशिक्षण',
    connect: '07 संधी',
    track: '08 परिणाम',
    voicePrompt: 'माईक दाबा आणि उन्नतीला तुमच्या रोजच्या कामाबद्दल आणि अनुभवाबद्दल सांगा',
    listening: 'तुमचा आवाज ऐकत आहे...',
    understanding: 'तुमचा अनुभव समजून घेत आहे...',
    preparingResponse: 'प्रतिसाद तयार करत आहे...',
    speakButton: 'आता बोला',
    replayButton: 'पुन्हा ऐका',
    pauseButton: 'थांबवा',
    skipButton: 'पुढचा प्रश्न',
    analyzeSkills: 'माझ्या कौशल्यांचे विश्लेषण करा',
    whyThis: 'ही शिफारस का?',
    explorePathway: 'प्रगतीचा मार्ग पहा',
    startTraining: 'प्रशिक्षण सुरू करा',
    viewOpportunity: 'संधीचे तपशील पहा',
    respondVoice: 'आवाजाने उत्तर द्या',
    demoDataBadge: 'डेमो डेटा · पीएम-अजय सिम्युलेशन',
    adminTitle: 'उन्नती · उपजीविका इंटेलिजन्स',
  },
};

const STORAGE_KEY = 'unnati_user_lang';

export function useLanguageState() {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as Language;
      if (saved && ['en', 'hi', 'mr'].includes(saved)) return saved;
    }
    return 'hi'; // Default Hindi for national rural accessibility
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  };

  return {
    language,
    setLanguage,
    t: translations[language],
  };
}

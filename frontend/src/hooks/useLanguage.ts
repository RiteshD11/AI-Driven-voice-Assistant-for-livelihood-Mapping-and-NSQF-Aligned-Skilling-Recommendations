/**
 * Kaushal Saathi - Language Hook & Localization Context
 * Supports English, Hindi (हिंदी), and Marathi (मराठी) with extensible schema
 */

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  startJourney: string;
  howItWorks: string;
  tryDemo: string;
  switchRoleUser: string;
  switchRoleAdmin: string;
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
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'Kaushal Saathi',
    tagline: 'AI-Driven Voice Livelihood Assistant for PM-AJAY',
    heroHeadline: 'Your skills have a story.\nLet’s discover where they can take you.',
    heroSubheadline: 'A voice-first livelihood assistant that helps SC beneficiaries discover their innate skills, bridge critical gaps with NSQF skilling, and connect to dignified local livelihoods.',
    startJourney: 'Start My Journey',
    howItWorks: 'How It Works',
    tryDemo: 'Experience 2-Min Demo',
    switchRoleUser: 'Beneficiary View',
    switchRoleAdmin: 'PM-AJAY Admin View',
    selectLanguage: 'How would you like to continue?',
    selectLanguageDesc: 'Choose the language you are most comfortable speaking. You can change this at any time.',
    listen: 'Listen',
    understand: 'Understand',
    profile: 'Profile',
    assess: 'Skill Gap',
    recommend: 'NSQF Paths',
    train: 'Training',
    connect: 'Opportunities',
    track: 'Outcomes',
    voicePrompt: 'Tap microphone and tell us about your daily work and aspirations',
    listening: 'Listening to your voice...',
    understanding: 'Understanding your experience...',
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
    demoDataBadge: 'DEMO DATA — PM-AJAY SIMULATION',
  },
  hi: {
    appName: 'कौशल साथी',
    tagline: 'पीएम-अजय आजीविका एवं कौशल विकास सहायक',
    heroHeadline: 'आपके हुनर की एक पहचान है।\nआइए जानें यह आपको कहाँ तक ले जा सकता है।',
    heroSubheadline: 'आवाज़-आधारित आजीविका सहायक जो अनुसूचित जाति के लाभार्थियों को उनके हुनर को समझने, एनएसक्यूएफ प्रशिक्षण पाने और स्थानीय रोजगार से जुड़ने में मदद करता है।',
    startJourney: 'मेरी यात्रा शुरू करें',
    howItWorks: 'यह कैसे काम करता है',
    tryDemo: '2-मिनट का डेमो देखें',
    switchRoleUser: 'लाभार्थी दृश्य',
    switchRoleAdmin: 'पीएम-अजय एडमिन दृश्य',
    selectLanguage: 'आप किस भाषा में बातचीत करना चाहेंगे?',
    selectLanguageDesc: 'वह भाषा चुनें जिसमें आप सहजता से बोल सकें। आप इसे कभी भी बदल सकते हैं।',
    listen: 'सुनें',
    understand: 'समझें',
    profile: 'प्रोफ़ाइल',
    assess: 'कौशल अंतर',
    recommend: 'प्रशिक्षण विकल्प',
    train: 'प्रशिक्षण',
    connect: 'स्थानीय अवसर',
    track: 'आजीविका परिणाम',
    voicePrompt: 'माइक दबाएं और अपने काम और सपनों के बारे में बताएं',
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
    demoDataBadge: 'डेमो डेटा — पीएम-अजय सिमुलेशन',
  },
  mr: {
    appName: 'कौशल साथी',
    tagline: 'पीएम-अजय उपजीविका आणि कौशल्य सहाय्यक',
    heroHeadline: 'तुमच्या कौशल्याची एक नवी ओळख आहे.\nचला शोधूया तुमची पुढची वाटचाल.',
    heroSubheadline: 'आवाज-आधारित उपजीविका सहाय्यक जो वंचित घटकातील बांधवांना त्यांच्या कौशल्यांचे मूल्यांकन, एनएसक्यूएफ प्रशिक्षण आणि स्थानिक रोजगार मिळवून देण्यास मदत करतो.',
    startJourney: 'माझा प्रवास सुरू करा',
    howItWorks: 'हे कसे कार्य करते',
    tryDemo: '२ मिनिटांचा डेमो अनुभवा',
    switchRoleUser: 'लाभार्थी दृश्य',
    switchRoleAdmin: 'पीएम-अजय प्रशासक दृश्य',
    selectLanguage: 'तुम्ही कोणत्या भाषेत संवाद साधू इच्छिता?',
    selectLanguageDesc: 'तुम्हाला बोलण्यासाठी सर्वात सोपी वाटणारी भाषा निवडा. तुम्ही ही कधीही बदलू शकता.',
    listen: 'ऐका',
    understand: 'समजून घ्या',
    profile: 'माहिती',
    assess: 'कौशल्य तफावत',
    recommend: 'प्रशिक्षण पर्याय',
    train: 'प्रशिक्षण',
    connect: 'स्थानिक संधी',
    track: 'प्रगती ट्रॅकिंग',
    voicePrompt: 'माईक दाबा आणि तुमच्या रोजच्या कामाबद्दल सांगा',
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
    demoDataBadge: 'डेमो डेटा — पीएम-अजय सिम्युलेशन',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const STORAGE_KEY = 'kaushal_saathi_lang';

export function useLanguageState() {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as Language;
      if (saved && ['en', 'hi', 'mr'].includes(saved)) return saved;
    }
    return 'hi'; // Default Hindi for national rural reach
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

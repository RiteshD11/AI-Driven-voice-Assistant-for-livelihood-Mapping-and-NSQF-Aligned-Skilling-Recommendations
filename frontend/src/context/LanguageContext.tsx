import React, { createContext, useContext, useState } from 'react';

type Language = 'hi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // App brand & hero
  'app.name': { hi: 'उन्नति (UNNATI)', en: 'UNNATI' },
  'app.tagline': { 
    hi: 'आपकी आवाज़। आपका हुनर। आपकी आजीविका।', 
    en: 'Your Voice. Your Skills. Your Livelihood.' 
  },
  'app.sub': {
    hi: 'पीएम-अजय (PM-AJAY) के तहत लाभार्थियों को व्यक्तिगत कौशल प्रशिक्षण और स्थानीय आजीविका से जोड़ने वाला एआई वॉयस प्लेटफॉर्म।',
    en: 'An AI-powered multilingual assistant connecting beneficiaries with personalized skills, training, and livelihood opportunities.'
  },
  'btn.startJourney': { hi: 'सफर शुरू करें', en: 'Start Your Journey' },
  'btn.tryVoice': { hi: 'वॉयस असिस्टेंट आज़माएं', en: 'Try Voice Assistant' },
  'btn.sihDemo': { hi: '🎯 एसआईएच डेमो मोड', en: '🎯 SIH Demo Walkthrough' },
  // Navigation
  'nav.home': { hi: 'मुख्य पृष्ठ', en: 'Home' },
  'nav.assistant': { hi: 'वॉयस सहायक', en: 'Voice Assistant' },
  'nav.profile': { hi: 'प्रोफ़ाइल', en: 'Profile' },
  'nav.skills': { hi: 'कौशल मूल्यांकन', en: 'Skill Assessment' },
  'nav.skillGap': { hi: 'स्किल गैप एनालिसिस', en: 'Skill Gap Analysis' },
  'nav.training': { hi: 'प्रशिक्षण अनुशंसा', en: 'Training Recommendations' },
  'nav.livelihood': { hi: 'आजीविका मैप', en: 'Livelihood Map' },
  'nav.jobs': { hi: 'रोजगार व स्वरोजगार', en: 'Jobs & Self-Employment' },
  'nav.dashboard': { hi: 'प्रगति डैशबोर्ड', en: 'Progress Dashboard' },
  'nav.admin': { hi: 'प्रशासन डैशबोर्ड', en: 'Admin Dashboard' },
  'nav.about': { hi: 'उन्नति के बारे में', en: 'About UNNATI' },
  'nav.help': { hi: 'सहायता व सुगमता', en: 'Accessibility & Help' },
  // Voice Assistant
  'voice.greeting': { hi: 'नमस्ते! मैं उन्नति हूँ।', en: "Namaste! I'm UNNATI." },
  'voice.subtitle': { hi: 'आइए आपकी शिक्षा, कौशल और रुचियों को समझें।', en: "Let's understand your skills and interests." },
  'voice.startSpeaking': { hi: 'बोलना शुरू करें', en: 'Start Speaking' },
  'voice.stopSpeaking': { hi: 'रोकें', en: 'Stop' },
  'voice.listening': { hi: 'सुन रहे हैं... कृपया बोलें', en: 'Listening... please speak' },
  'voice.typeInstead': { hi: 'लिखकर बताएं', en: 'Type Instead' },
  'voice.replay': { hi: 'दोबारा सुनें', en: 'Replay' },
  // Journey Steps
  'journey.voice': { hi: '1. वॉयस इनपुट', en: '1. Voice Input' },
  'journey.profile': { hi: '2. लाभार्थी प्रोफ़ाइल', en: '2. Beneficiary Profile' },
  'journey.skills': { hi: '3. कौशल विश्लेषण', en: '3. Skill Analysis' },
  'journey.training': { hi: '4. एनएसक्यूएफ प्रशिक्षण', en: '4. NSQF Training' },
  'journey.livelihood': { hi: '5. आजीविका प्राप्ति', en: '5. Livelihood Mapping' }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('hi');

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};


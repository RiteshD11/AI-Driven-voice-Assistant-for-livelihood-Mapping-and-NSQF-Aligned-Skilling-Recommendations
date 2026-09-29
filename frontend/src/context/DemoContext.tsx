import React, { createContext, useContext, useState } from 'react';
import { BeneficiaryProfile } from '../types';

interface DemoContextType {
  isDemoActive: boolean;
  startDemo: () => void;
  stopDemo: () => void;
  demoStep: number;
  setDemoStep: (step: number) => void;
  currentProfile: BeneficiaryProfile;
  updateProfile: (updates: Partial<BeneficiaryProfile>) => void;
}

const defaultBeneficiary: BeneficiaryProfile = {
  name: 'राजेश कुमार (Rajesh Kumar)',
  age: 21,
  gender: 'male',
  location: {
    district: 'वाराणसी (Varanasi)',
    state: 'उत्तर प्रदेश (Uttar Pradesh)',
    pincode: '221001'
  },
  education: {
    level: '12th',
    field: 'कला/विज्ञान (Arts/Science)',
    details: '12वीं कक्षा उत्तीर्ण (68%)'
  },
  occupation: {
    current: 'प्रशिक्षु / रोजगार की तलाश',
    experience: 0,
    details: 'कंप्यूटर ऑपरेटर बनने का इच्छुक'
  },
  existingSkills: [
    { name: 'Basic Computer', proficiency: 'intermediate', category: 'it' },
    { name: 'MS Office & Excel', proficiency: 'intermediate', category: 'it' },
    { name: 'Hindi & English Typing', proficiency: 'intermediate', category: 'it' }
  ],
  interests: ['कंप्यूटर एवं सूचना प्रौद्योगिकी', 'वेबसाइट डिजाइनिंग', 'डिजिटल सेवाएं'],
  mobilityPreference: 'local',
  jobPreference: 'both',
  preferredLanguage: 'hi',
  profileCompletion: 85,
  aiExtracted: true
};

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDemoActive, setIsDemoActive] = useState<boolean>(true);
  const [demoStep, setDemoStep] = useState<number>(1);
  const [currentProfile, setCurrentProfile] = useState<BeneficiaryProfile>(defaultBeneficiary);

  const startDemo = () => {
    setIsDemoActive(true);
    setDemoStep(1);
    setCurrentProfile(defaultBeneficiary);
  };

  const stopDemo = () => {
    setIsDemoActive(false);
  };

  const updateProfile = (updates: Partial<BeneficiaryProfile>) => {
    setCurrentProfile((prev: BeneficiaryProfile) => ({ ...prev, ...updates }));
  };

  return (
    <DemoContext.Provider value={{
      isDemoActive,
      startDemo,
      stopDemo,
      demoStep,
      setDemoStep,
      currentProfile,
      updateProfile
    }}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) throw new Error('useDemo must be used within DemoProvider');
  return context;
};


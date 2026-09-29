import React from 'react';
import { VoiceJourneyPage } from './VoiceJourneyPage';

export const VoiceAssistantPage: React.FC = () => {
  return <VoiceJourneyPage currentLanguage="hi" onCompleteSession={() => {}} />;
};

export default VoiceAssistantPage;

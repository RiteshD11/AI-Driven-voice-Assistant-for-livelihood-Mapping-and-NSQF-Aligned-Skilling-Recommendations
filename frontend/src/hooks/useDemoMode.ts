/**
 * Kaushal Saathi - Demo Mode Hook
 * Orchestrates a guided 2-3 minute evaluator tour through the 8 stages of SIH26097:
 * LISTEN → UNDERSTAND → PROFILE → ASSESS → RECOMMEND → TRAIN → CONNECT → TRACK
 */

import { useState, useCallback } from 'react';

export interface DemoStep {
  id: number;
  stageName: string;
  route: string;
  title: string;
  description: string;
  sihObjective: string;
  durationSec: number;
}

export const DEMO_STEPS: DemoStep[] = [
  {
    id: 0,
    stageName: '01 · DISCOVER',
    route: 'landing',
    title: 'Landing & Multilingual Entry',
    description: 'Human-centric, accessible entry for low-literacy SC beneficiaries with Hindi, Marathi, and English voice readiness.',
    sihObjective: 'Target SC beneficiary onboarding under PM-AJAY GIA component.',
    durationSec: 15,
  },
  {
    id: 1,
    stageName: '02 · LISTEN & UNDERSTAND',
    route: 'voice',
    title: 'Voice Interaction Session',
    description: 'Empathetic voice dialog extracting real experience without intimidating written forms.',
    sihObjective: 'Voice-first AI interface supporting colloquial accents and spoken vernaculars.',
    durationSec: 25,
  },
  {
    id: 2,
    stageName: '03 · PROFILE',
    route: 'profile',
    title: 'Synthesized Livelihood Profile',
    description: 'Structured translation of voice narrative into verifiable credentials, mobility constraints, and aspirations.',
    sihObjective: 'Dynamic profiling layer extracting prior learning and mobility tolerance.',
    durationSec: 20,
  },
  {
    id: 3,
    stageName: '04 · ASSESS',
    route: 'skill-gap',
    title: 'Visual Skill Gap Analysis',
    description: 'Clear "Where you are → Where you can go" mapping between existing manual skills and modern market demands.',
    sihObjective: 'Identifies specific gaps preventing transition to formal high-demand roles.',
    durationSec: 20,
  },
  {
    id: 4,
    stageName: '05 · RECOMMEND',
    route: 'recommendations',
    title: 'NSQF-Aligned Recommendations',
    description: '3 tailor-made vocational tracks with transparent NSQF Levels, stipends, and local job vacancy scores.',
    sihObjective: 'Aligns informal capability with National Skills Qualification Framework (NSQF).',
    durationSec: 25,
  },
  {
    id: 5,
    stageName: '06 · EXPLAINABLE AI',
    route: 'why-recommendation',
    title: 'Explainable AI Decision Audit',
    description: 'Deconstructs the recommendation rationale so beneficiaries and counselors understand why this track was picked.',
    sihObjective: 'Trustworthy, explainable AI avoiding black-box discrimination in welfare delivery.',
    durationSec: 20,
  },
  {
    id: 6,
    stageName: '07 · TRAIN & ACTION',
    route: 'pathway',
    title: 'Livelihood Pathway & Training',
    description: '7-stage roadmap with interactive bridge modules, PM-AJAY stipend tracking, and certification milestones.',
    sihObjective: 'End-to-end journey from enrollment to accredited qualification.',
    durationSec: 25,
  },
  {
    id: 7,
    stageName: '08 · CONNECT',
    route: 'opportunities',
    title: 'Local Opportunities & Placement',
    description: 'Hyperlocal verified opportunities (e.g. Pune / Pimpri-Chinchwad within 20km) with transparent wage vs self-employment.',
    sihObjective: 'Direct linkage to green economy and local industrial clusters.',
    durationSec: 20,
  },
  {
    id: 8,
    stageName: '09 · TRACK',
    route: 'follow-up',
    title: 'Post-Placement Voice Follow-up',
    description: 'Longitudinal outcome verification (30/90 days) via voice feedback in Marathi/Hindi, measuring income uplift.',
    sihObjective: 'Continuous livelihood tracking under PM-AJAY impact monitoring.',
    durationSec: 20,
  },
];

export function useDemoMode(onNavigate: (route: string) => void) {
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const startDemo = useCallback(() => {
    try {
      localStorage.removeItem('voice_extracted_profile');
    } catch (_) {}
    setIsDemoActive(true);
    setCurrentStepIndex(0);
    onNavigate(DEMO_STEPS[0].route);
  }, [onNavigate]);

  const stopDemo = useCallback(() => {
    setIsDemoActive(false);
  }, []);

  const goToStep = useCallback((index: number) => {
    if (index >= 0 && index < DEMO_STEPS.length) {
      setCurrentStepIndex(index);
      onNavigate(DEMO_STEPS[index].route);
    }
  }, [onNavigate]);

  const nextStep = useCallback(() => {
    if (currentStepIndex < DEMO_STEPS.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      onNavigate(DEMO_STEPS[nextIdx].route);
    } else {
      setIsDemoActive(false);
    }
  }, [currentStepIndex, onNavigate]);

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      onNavigate(DEMO_STEPS[prevIdx].route);
    }
  }, [currentStepIndex, onNavigate]);

  return {
    isDemoActive,
    currentStepIndex,
    currentStep: DEMO_STEPS[currentStepIndex],
    totalSteps: DEMO_STEPS.length,
    startDemo,
    stopDemo,
    nextStep,
    prevStep,
    goToStep,
    allSteps: DEMO_STEPS,
  };
}

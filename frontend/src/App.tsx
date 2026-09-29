import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useLanguageState } from './hooks/useLanguage';
import { useDemoMode, DEMO_STEPS } from './hooks/useDemoMode';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DemoFloatingBar } from './components/DemoFloatingBar';

// PS97 Dedicated Pages
import { LandingPage } from './pages/LandingPage';
import { VoiceJourneyPage } from './pages/VoiceJourneyPage';
import { ProfilePage } from './pages/ProfilePage';
import { SkillGapPage } from './pages/SkillGapPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { PathwayPage } from './pages/PathwayPage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { FollowUpPage } from './pages/FollowUpPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { Recommendation } from './types';

const MainAppContent: React.FC = () => {
  const { language, setLanguage } = useLanguageState();
  const [activeView, setActiveView] = useState<string>('landing');
  const [userRole, setUserRole] = useState<'beneficiary' | 'admin'>('beneficiary');

  // Evaluator Demo Mode
  const {
    isDemoActive,
    currentStepIndex,
    totalSteps,
    startDemo,
    stopDemo,
    nextStep,
    prevStep,
    goToStep,
  } = useDemoMode((route: string) => {
    setActiveView(route);
  });

  const handleStartDemo = () => {
    setUserRole('beneficiary');
    startDemo();
  };

  const handleToggleRole = (role: 'beneficiary' | 'admin') => {
    setUserRole(role);
    if (role === 'admin') {
      setActiveView('admin');
    } else {
      setActiveView('landing');
    }
  };

  const navigateTo = (view: string) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0c121e] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Floating Glassmorphism Pill Navbar */}
      <Navbar
        activeView={activeView}
        onNavigate={navigateTo}
        userRole={userRole}
        onToggleRole={handleToggleRole}
        currentLanguage={language}
        onSelectLanguage={setLanguage}
        onStartDemo={handleStartDemo}
        isDemoActive={isDemoActive}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-4 pb-20">
        {userRole === 'admin' ? (
          <AdminDashboardPage />
        ) : (
          <>
            {activeView === 'landing' && (
              <LandingPage
                currentLanguage={language}
                onSelectLanguage={setLanguage}
                onStartJourney={() => navigateTo('voice')}
                onExploreHowItWorks={() => navigateTo('skill-gap')}
                onStartDemo={handleStartDemo}
              />
            )}

            {activeView === 'voice' && (
              <VoiceJourneyPage
                currentLanguage={language}
                onCompleteSession={() => navigateTo('profile')}
              />
            )}

            {activeView === 'profile' && (
              <ProfilePage
                onAnalyzeSkills={() => navigateTo('skill-gap')}
              />
            )}

            {activeView === 'skill-gap' && (
              <SkillGapPage
                onExploreRecommendations={() => navigateTo('recommendations')}
              />
            )}

            {activeView === 'recommendations' && (
              <RecommendationsPage
                onSelectPathway={(rec: Recommendation) => navigateTo('pathway')}
              />
            )}

            {activeView === 'pathway' && (
              <PathwayPage
                onStartTraining={() => navigateTo('opportunities')}
                onExploreOpportunities={() => navigateTo('opportunities')}
              />
            )}

            {activeView === 'opportunities' && (
              <OpportunitiesPage
                onProceedToFollowUp={() => navigateTo('follow-up')}
              />
            )}

            {activeView === 'follow-up' && (
              <FollowUpPage
                onCompleteJourney={() => navigateTo('landing')}
              />
            )}

            {activeView === 'admin' && (
              <AdminDashboardPage />
            )}
          </>
        )}
      </main>

      {/* Floating Interactive Evaluator Demo Tour Controller */}
      {isDemoActive && (
        <DemoFloatingBar
          currentStepIndex={currentStepIndex}
          totalSteps={totalSteps}
          onNext={nextStep}
          onPrev={prevStep}
          onGoToStep={goToStep}
          onClose={stopDemo}
        />
      )}

      {/* Comprehensive SIH PM-AJAY Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainAppContent />
    </BrowserRouter>
  );
};

export default App;

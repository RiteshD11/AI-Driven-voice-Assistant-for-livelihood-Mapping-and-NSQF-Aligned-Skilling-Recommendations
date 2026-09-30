import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useLanguageState } from './hooks/useLanguage';
import { useDemoMode, DEMO_STEPS } from './hooks/useDemoMode';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DemoFloatingBar } from './components/DemoFloatingBar';

// UNNATI Beneficiary & Admin Pages
import { LandingPage } from './pages/LandingPage';
import { VoiceJourneyPage } from './pages/VoiceJourneyPage';
import { ProfilePage } from './pages/ProfilePage';
import { SkillGapPage } from './pages/SkillGapPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { PathwayPage } from './pages/PathwayPage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { EcosystemPage } from './pages/EcosystemPage';
import { FollowUpPage } from './pages/FollowUpPage';
import { ProgressDashboardPage } from './pages/ProgressDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { Recommendation } from './types';

const MainAppContent: React.FC = () => {
  const { language, setLanguage } = useLanguageState();
  const location = useLocation();
  const navigate = useNavigate();

  // State-based view with URL synchronization
  const [activeView, setActiveView] = useState<string>(() => {
    const path = window.location.pathname.replace(/^\//, '');
    if (path === 'admin') return 'admin';
    if (path === 'progress') return 'progress';
    if (path === 'voice') return 'voice';
    if (path === 'profile') return 'profile';
    if (path === 'skill-gap') return 'skill-gap';
    if (path === 'recommendations') return 'recommendations';
    if (path === 'pathway') return 'pathway';
    if (path === 'ecosystem') return 'ecosystem';
    if (path === 'training') return 'training';
    if (path === 'opportunities') return 'opportunities';
    if (path === 'follow-up') return 'follow-up';
    return 'landing';
  });

  const [userRole, setUserRole] = useState<'beneficiary' | 'admin'>(() => {
    return window.location.pathname.startsWith('/admin') ? 'admin' : 'beneficiary';
  });

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
    navigateTo(route);
  });

  const handleStartDemo = () => {
    setUserRole('beneficiary');
    startDemo();
  };

  const handleToggleRole = (role: 'beneficiary' | 'admin') => {
    setUserRole(role);
    if (role === 'admin') {
      navigateTo('admin');
    } else {
      navigateTo('landing');
    }
  };

  const navigateTo = (view: string) => {
    setActiveView(view);
    if (view === 'admin') {
      setUserRole('admin');
      navigate('/admin');
    } else if (view === 'landing') {
      setUserRole('beneficiary');
      navigate('/');
    } else {
      setUserRole('beneficiary');
      navigate(`/${view}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync with browser URL change (back/forward)
  useEffect(() => {
    const path = location.pathname.replace(/^\//, '');
    if (path === 'admin') {
      setUserRole('admin');
      setActiveView('admin');
    } else if (path === '') {
      setUserRole('beneficiary');
      setActiveView('landing');
    } else {
      setUserRole('beneficiary');
      setActiveView(path);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F4] text-[#181818] selection:bg-amber-100 selection:text-amber-900 font-sans">
      {/* Floating White Navbar */}
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
        {userRole === 'admin' || activeView === 'admin' ? (
          <div className="w-full">
            {/* Top link back to beneficiary view */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-2 pb-1 flex justify-end">
              <button
                onClick={() => handleToggleRole('beneficiary')}
                className="text-xs font-semibold text-sky-700 hover:text-sky-800 bg-sky-50 border border-sky-200/80 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors"
              >
                <span>← Return to Beneficiary Experience</span>
              </button>
            </div>
            <AdminDashboardPage />
          </div>
        ) : (
          <>
            {activeView === 'landing' && (
              <LandingPage
                currentLanguage={language}
                onSelectLanguage={setLanguage}
                onStartJourney={() => {
                  try {
                    localStorage.removeItem('voice_extracted_profile');
                  } catch (_) {}
                  navigateTo('voice');
                }}
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
                isDemo={isDemoActive}
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

            {activeView === 'why-recommendation' && (
              <RecommendationsPage
                onSelectPathway={(rec: Recommendation) => navigateTo('pathway')}
                autoOpenReason={true}
              />
            )}

            {activeView === 'pathway' && (
              <PathwayPage
                onStartTraining={() => navigateTo('opportunities')}
                onExploreOpportunities={() => navigateTo('opportunities')}
                onExploreEcosystem={() => navigateTo('ecosystem')}
              />
            )}

            {activeView === 'ecosystem' && (
              <EcosystemPage
                onNavigateToPathway={() => navigateTo('pathway')}
                onNavigateToOpportunities={() => navigateTo('opportunities')}
              />
            )}

            {activeView === 'training' && (
              <PathwayPage
                onStartTraining={() => navigateTo('opportunities')}
                onExploreOpportunities={() => navigateTo('opportunities')}
                onExploreEcosystem={() => navigateTo('ecosystem')}
              />
            )}

            {activeView === 'opportunities' && (
              <OpportunitiesPage
                onProceedToFollowUp={() => navigateTo('follow-up')}
              />
            )}

            {activeView === 'progress' && (
              <ProgressDashboardPage
                onNavigateToVoice={() => navigateTo('voice')}
                onNavigateToOpportunities={() => navigateTo('opportunities')}
              />
            )}

            {activeView === 'follow-up' && (
              <FollowUpPage
                onCompleteJourney={() => navigateTo('landing')}
              />
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

      {/* Comprehensive SIH UNNATI PM-AJAY Footer */}
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

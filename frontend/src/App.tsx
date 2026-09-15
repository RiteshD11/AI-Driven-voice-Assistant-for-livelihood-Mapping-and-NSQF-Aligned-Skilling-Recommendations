import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { DemoProvider } from './context/DemoContext';
import { AuthProvider } from './context/AuthContext';
import { AccessibilityProvider } from './context/AccessibilityContext';

import { DemoBanner } from './components/DemoBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// 14 Pages as required by specification
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { VoiceAssistantPage } from './pages/VoiceAssistantPage';
import { ProfilePage } from './pages/ProfilePage';
import { SkillAssessmentPage } from './pages/SkillAssessmentPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { TrainingPage } from './pages/TrainingPage';
import { LivelihoodMapPage } from './pages/LivelihoodMapPage';
import { JobsPage } from './pages/JobsPage';
import { SavedRecommendationsPage } from './pages/SavedRecommendationsPage';
import { ProgressDashboardPage } from './pages/ProgressDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AboutPage } from './pages/AboutPage';
import { HelpPage } from './pages/HelpPage';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <AuthProvider>
          <DemoProvider>
            <BrowserRouter>
              <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-amber-100 selection:text-amber-900 font-sans">
                {/* Persistent SIH Demo Mode Banner */}
                <DemoBanner />

                {/* Primary Accessible Navigation */}
                <Navbar />

                {/* Main Dynamic View */}
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/assistant" element={<VoiceAssistantPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/skills" element={<SkillAssessmentPage />} />
                    <Route path="/skill-gap" element={<SkillGapPage />} />
                    <Route path="/training" element={<TrainingPage />} />
                    <Route path="/livelihood" element={<LivelihoodMapPage />} />
                    <Route path="/jobs" element={<JobsPage />} />
                    <Route path="/saved" element={<SavedRecommendationsPage />} />
                    <Route path="/dashboard" element={<ProgressDashboardPage />} />
                    <Route path="/admin" element={<AdminDashboardPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/help" element={<HelpPage />} />
                  </Routes>
                </main>

                {/* Government Ecosystem Compliant Footer */}
                <Footer />
              </div>
            </BrowserRouter>
          </DemoProvider>
        </AuthProvider>
      </AccessibilityProvider>
    </LanguageProvider>
  );
};

export default App;

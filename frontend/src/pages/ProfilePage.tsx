import React from 'react';
import { useBeneficiary } from '../hooks/useBeneficiary';
import { ProfileCard } from '../components/ProfileCard';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { ProgressIndicator } from '../components/ProgressIndicator';

interface ProfilePageProps {
  onAnalyzeSkills: () => void;
  isDemo?: boolean;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onAnalyzeSkills, isDemo = false }) => {
  const { beneficiary, profile, loading, error, refresh } = useBeneficiary('ben-sc-2026-001');

  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-12">
        <LoadingState
          message="Synthesizing livelihood profile from voice audio..."
          subtext="Extracting education, informal competencies, mobility, and career preferences."
        />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-12">
        <ErrorState
          title="Could not load livelihood profile"
          message={error || 'An error occurred while synthesizing beneficiary profile.'}
          onRetry={refresh}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 flex flex-col items-center">
      {/* Main Profile Presentation */}
      <ProfileCard
        beneficiary={beneficiary}
        profile={profile}
        onAnalyzeSkills={onAnalyzeSkills}
        isDemo={isDemo}
      />
    </div>
  );
};

export type Language = 'hi' | 'en' | 'bn' | 'te' | 'mr' | 'ta';

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: 'beneficiary' | 'admin';
  preferredLanguage: string;
  consentGiven: boolean;
}

export interface Skill {
  name: string;
  proficiency?: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
}

export interface BeneficiaryProfile {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  location: {
    district: string;
    state: string;
    pincode?: string;
  };
  education: {
    level: string;
    field?: string;
    details?: string;
  };
  occupation: {
    current: string;
    experience: number;
    details?: string;
  };
  existingSkills: Skill[];
  interests: string[];
  mobilityPreference: 'local' | 'district' | 'state' | 'national' | 'flexible';
  jobPreference: 'employment' | 'self_employment' | 'both';
  preferredLanguage: string;
  profileCompletion: number;
  aiExtracted?: boolean;
}

export interface TrainingProgram {
  _id: string;
  name: string;
  skillArea: string;
  category: string;
  duration: string;
  deliveryMode: 'online' | 'offline' | 'hybrid';
  eligibility: {
    minEducation: string;
    minAge?: number;
    maxAge?: number;
  };
  skillsGained: string[];
  nsqfLevel: string;
  trainingSource: string;
  location: string;
  isVerified: boolean;
  isDemo: boolean;
  tags: string[];
}

export interface RecommendationBreakdown {
  educationMatch: number;
  skillMatch: number;
  interestMatch: number;
  locationMatch: number;
  jobPrefMatch: number;
}

export interface RecommendationItem {
  _id: string;
  course: TrainingProgram;
  matchScore: number;
  breakdown: RecommendationBreakdown;
  reasons: string[];
  badge: string;
  isDemo: boolean;
}

export interface LivelihoodOpportunity {
  _id: string;
  title: string;
  type: 'employment' | 'self_employment';
  description: string;
  requiredSkills: string[];
  location: string;
  jobType: string;
  eligibility: {
    education: string;
    experience: string;
  };
  source: string;
  category: string;
  isDemo: boolean;
  lastUpdated: string;
}

export interface LivelihoodStep {
  step: number;
  title: string;
  desc: string;
  status: 'completed' | 'current' | 'upcoming' | 'goal';
}

export interface LivelihoodPathway {
  id: string;
  title: string;
  icon: string;
  category: string;
  steps: LivelihoodStep[];
  employmentOpportunity: string;
  selfEmploymentOpportunity: string;
}

export interface ExtractedAIProfile {
  education: { level: string; field?: string; details?: string } | null;
  skills: Skill[];
  interests: string[];
  jobPreference: 'employment' | 'self_employment' | 'both' | null;
  mobilityPreference: 'local' | 'district' | 'state' | null;
  location: { district: string; state: string; pincode?: string } | null;
}


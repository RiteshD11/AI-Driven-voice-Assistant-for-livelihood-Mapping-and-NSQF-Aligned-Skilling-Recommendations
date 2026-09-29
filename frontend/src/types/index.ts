// Kaushal Saathi - SIH26097 Strict TypeScript Models
// Complete type system for Beneficiary UI, Admin Intelligence, and API Service Layer

export type Language = 'en' | 'hi' | 'mr';

export type UserRole = 'beneficiary' | 'admin' | 'officer' | 'trainer';

export interface ApiResponse<T> {
  data: T | null;
  error?: string | null;
  status: number;
}

export interface User {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  role: UserRole;
  language: Language;
  preferredLanguage?: Language;
  consentGiven: boolean;
  consentTimestamp?: string;
  createdAt: string;
}

export interface Beneficiary {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  district: string;
  state: string;
  pincode?: string;
  category: 'SC' | 'General' | 'OBC' | 'ST';
  schemeComponent: 'GIA-PM-AJAY';
  educationLevel: string;
  education?: string;
  currentOccupation: string;
  currentLivelihood?: string;
  targetRole?: string;
  status?: string;
  yearsOfExperience: number;
  preferredLanguage: Language;
  avatarUrl?: string;
  createdAt: string;
}

export type MessageSender = 'user' | 'assistant' | 'system';

export interface ConversationMessage {
  id: string;
  sender: MessageSender;
  text: string;
  audioUrl?: string;
  timestamp: string;
  sentiment?: 'positive' | 'neutral' | 'curious' | 'hesitant';
  intentDetected?: string;
}

export type VoiceState = 'idle' | 'listening' | 'understanding' | 'preparing' | 'speaking';

export interface VoiceQuestion {
  id: string;
  index: number;
  questionText: Record<Language, string>;
  expectedAnswers: string[];
  intent: string;
  questionEn?: string;
  questionHi?: string;
  questionMr?: string;
}

export interface VoiceSession {
  sessionId: string;
  beneficiaryId?: string;
  language: Language;
  currentQuestionIndex: number;
  totalQuestions: number;
  state: VoiceState;
  messages: ConversationMessage[];
  transcript?: ConversationMessage[];
  interimTranscript?: string;
  activeQuestion: string;
  isComplete: boolean;
  startedAt: string;
  completedAt?: string;
}

export interface Skill {
  id?: string;
  name: string;
  category?: string;
  proficiency?: 'beginner' | 'intermediate' | 'advanced';
  level?: string;
  description?: string;
  yearsExperience?: number;
  verified?: boolean;
  acquiredFrom?: 'informal' | 'hereditary' | 'prior_training' | 'on_job';
}

export interface SkillGap {
  id: string;
  name?: string;
  skillName?: string;
  category?: string;
  priority?: 'high' | 'medium' | 'low';
  currentLevel?: 'none' | 'basic' | 'moderate';
  requiredLevel?: 'competent' | 'advanced' | 'certified';
  importance?: 'critical' | 'desirable' | 'optional';
  description?: string;
  bridgeModule?: string;
  bridgedByModule?: string;
}

export interface SkillAssessment {
  id: string;
  beneficiaryId: string;
  targetRole: string;
  targetNSQFLevel: string;
  readinessScore: number;
  currentSkills: Skill[];
  skillGaps: SkillGap[];
}

export interface LivelihoodProfile {
  id?: string;
  beneficiaryId?: string;
  name?: string;
  fullName?: string;
  age?: number;
  gender?: string;
  education: any;
  currentLivelihood?: string;
  occupation?: any;
  monthlyIncome?: number;
  existingSkills: Array<string | Skill>;
  interests: string[];
  employmentPreference?: string;
  jobPreference?: any;
  preferredLanguage?: any;
  mobilityPreference?: string;
  mobility?: string;
  location: any;
  completenessScore?: number;
  profileCompletion?: number;
  aiConfidenceScore?: number;
  aiExtracted?: any;
  profiledAt?: string;
}

export interface RecommendationReason {
  educationMatched?: boolean;
  educationDetail?: string;
  skillsMatched?: string[];
  skillsScore?: number;
  interestsMatched?: string[];
  mobilityFit?: string;
  employmentPreferenceFit?: string;
  localOpportunityAvailability?: string;
  localJobCount?: number;
  capitalSupportEligible?: string;
  summaryExplanation?: string;
  factorsConsidered?: Array<{ criterion: string; matchedValue: string }>;
  skillGapsAddressed?: string[];
}

export interface NSQFQualification {
  code: string;
  roleName: string;
  level: number;
  sectorSkillCouncil: string;
  minimumEducation: string;
  notionalHours: number;
  certificationAuthority: string;
}

export interface TrainingModule {
  id?: string;
  title: string;
  hours?: number;
  durationHours?: number;
  moduleNumber?: number;
  description: string;
}

export interface TrainingProgram {
  id: string;
  title: string;
  nsqfLevel: string | number;
  qualificationCode?: string;
  nsqfCode?: string;
  sector: string;
  duration?: string;
  durationMonths?: number;
  notionalHours?: number;
  description?: string;
  deliveryMode?: 'classroom' | 'hybrid' | 'on_field';
  trainingCenter?: {
    name: string;
    district: string;
    distanceKm: number;
    address: string;
  };
  modules: TrainingModule[];
  moduleBridgeMappings?: Array<{
    currentSkill: string;
    requiredSkill: string;
    trainingModule: string;
  }>;
  stipendAvailable?: boolean;
  stipendAmountPerMonth?: number;
  pmAjayGrantCovered?: boolean;
  verifiedBadge?: boolean;
}

export interface Recommendation {
  id: string;
  title?: string;
  targetRole?: string;
  nsqfLevel: string | number;
  badgeLabel?: string;
  duration?: string;
  salaryRange?: string;
  opportunityAvailability?: string;
  matchScore: number;
  description?: string;
  reason: string | RecommendationReason;
  program?: any;
  qualificationCode?: string;
  relevantSkills?: string[];
  relevantSkillsCount?: number;
  skillGaps?: string[];
  skillGapsCount?: number;
  locationRelevance?: string;
}

export interface PathwayStep {
  stepNumber: number;
  stageName: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  duration?: string;
  targetDate?: string;
  estimatedEarnings?: string;
  partnerAgency?: string;
}

export interface PathwayStage {
  id: string;
  stepNumber: number;
  stageName: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  duration?: string;
  milestones?: string[];
}

export interface LivelihoodPathway {
  id: string;
  title: string;
  sector: string;
  targetRole: string;
  nsqfLevel: number | string;
  stages: PathwayStage[];
  wageEmploymentOption?: {
    roleTitle: string;
    salaryRange: string;
    placementPartners: string[];
    timelineMonths: number;
  };
  selfEmploymentOption?: {
    enterpriseIdea: string;
    estimatedMonthlyProfit: string;
    capitalSupportScheme: string;
    equipmentRequirements: string[];
  };
  steps?: PathwayStep[];
}

export interface TrainingProgress {
  id: string;
  programId: string;
  beneficiaryId: string;
  enrollmentDate: string;
  expectedCompletionDate: string;
  attendancePercentage: number;
  modulesCompleted: number;
  totalModules: number;
  currentModule: string;
  assessmentStatus: 'not_started' | 'in_progress' | 'passed' | 'reappear';
  nsqfCertificateUrl?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  type?: 'employment' | 'self_employment';
  employmentType: 'wage' | 'self_employed' | 'full_time' | 'part_time' | 'contract' | 'micro_enterprise';
  sector: string;
  employer?: string;
  companyOrScheme?: string;
  location: string;
  distanceKm: number;
  salaryRange?: string;
  salaryOrEarningsRange?: string;
  requiredSkills: string[];
  minQualification?: string;
  qualificationRequired?: string;
  minNsqfLevel?: number | string;
  applicationDeadline?: string;
  contactPerson?: string;
  contactPhone?: string;
  openPositions?: number;
  description?: string;
  isDemoData?: boolean;
}

export interface EmploymentOutcome {
  id: string;
  beneficiaryId: string;
  beneficiaryName: string;
  status: string;
  role?: string;
  jobTitle?: string;
  employerOrEnterpriseName?: string;
  placementDistrict?: string;
  placedDate?: string;
  nsqfCertificateHeld?: string;
  employmentType?: string;
  monthlyIncome: number;
  employer?: string;
  location?: string;
  verificationSource?: string;
}

export interface FollowUp {
  id: string;
  beneficiaryId: string;
  beneficiaryName: string;
  milestone: string;
  dueDate?: string;
  completedDate?: string;
  status: 'pending' | 'submitted' | 'escalated';
  recordedVoiceText?: string;
  aiExtractedOutcome?: {
    currentStatus: string;
    incomeMaintained: boolean;
    jobSatisfactionRating: number;
    needsUpskilling: boolean;
  };
}

export interface AdminOverview {
  totalBeneficiariesProfiled: number;
  totalProfiled: number;
  totalTrainingEnrolled: number;
  trainingEnrolled: number;
  totalCertified: number;
  certified: number;
  totalWageEmployed: number;
  employed: number;
  totalSelfEmployed: number;
  selfEmployed: number;
  followUpPendingCount: number;
  followUpRequired: number;
  lastUpdated: string;
  isDemoData: boolean;
}

export interface RegionalSkillData {
  district: string;
  state: string;
  totalBeneficiaries: number;
  totalProfiled?: number;
  employed?: number;
  topSkillDemanded: string;
  activeTrainingCenters: number;
  placementRate: number;
}

export interface TrainingDemandData {
  sector?: string;
  trade?: string;
  demand?: number;
  enrolled?: number;
  beneficiaryInterestCount?: number;
  industryDemandCount?: number;
  nsqfLevelAverage?: number;
}

export interface SkillGapAnalytics {
  gap: string;
  beneficiariesCount: number;
  bridgedCount: number;
  priority?: string;
}

export interface OutcomeAnalytics {
  employedRate: number;
  avgIncomeUplift: number;
  retentionRate90Days: number;
  totalPlaced: number;
}

export type LivelihoodOpportunity = Opportunity;
export type RecommendationItem = Recommendation;
export type BeneficiaryProfile = LivelihoodProfile;



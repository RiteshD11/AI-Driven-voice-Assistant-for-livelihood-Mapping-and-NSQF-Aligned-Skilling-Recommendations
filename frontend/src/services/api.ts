// Client-side API service with built-in robust offline/demo fallbacks
import { BeneficiaryProfile, RecommendationItem, LivelihoodOpportunity, LivelihoodPathway } from '../types';

const API_BASE = '/api';

export const api = {
  // Voice NLP Processing
  async processVoice(text: string, language: string) {
    try {
      const res = await fetch(`${API_BASE}/voice/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error, using local fallback NLP simulation:', e);
    }
    // Local offline mock fallback
    return {
      success: true,
      originalText: text,
      language,
      confidence: 0.94,
      extracted: {
        education: { level: '12th', details: 'Completed 12th' },
        skills: [{ name: 'Basic Computer', proficiency: 'intermediate', category: 'it' }],
        interests: ['Information Technology', 'Web Design'],
        jobPreference: 'both',
        mobilityPreference: 'local',
        location: { district: 'Varanasi', state: 'Uttar Pradesh' }
      },
      assistantReply: language === 'hi' 
        ? 'नमस्ते! मैंने आपकी शिक्षा, कौशल और प्राथमिकताएं समझ ली हैं। कृपया विवरण जांचें।'
        : 'Hello! I have extracted your education, skills, and preferences. Please confirm below.',
      isDemoNlp: true
    };
  },

  // Skill Gap Analysis
  async analyzeSkillGap(targetRole: string, userSkills: any[]) {
    try {
      const res = await fetch(`${API_BASE}/skills/gap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetRole, userSkills })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Using local fallback for skill gap:', e);
    }
    return {
      success: true,
      role: 'Web & Digital Front-End Developer',
      nsqfLevel: 'NSQF Level 5',
      category: 'it',
      completionPercent: 40,
      masteredSkills: [
        { name: 'Basic Computer', level: 'Foundation' },
        { name: 'MS Office & Tools', level: 'Foundation' }
      ],
      missingSkills: [
        { name: 'HTML & CSS', level: 'Core' },
        { name: 'JavaScript Essentials', level: 'Core' },
        { name: 'React UI Fundamentals', level: 'Advanced' }
      ],
      recommendedNextSkill: 'HTML & CSS Web Fundamentals',
      explanation: 'You currently have 2 out of 5 required competencies for Web & Digital Front-End Developer. Bridging the gap in HTML & CSS will qualify you for NSQF certification.',
      isDemoAnalysis: true
    };
  },

  // Recommendations
  async getRecommendations(): Promise<{ success: boolean; recommendations: RecommendationItem[] }> {
    try {
      const res = await fetch(`${API_BASE}/recommendations`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Using local fallback for recommendations:', e);
    }
    // Realistic demo recommendations
    return {
      success: true,
      recommendations: [
        {
          _id: 'rec_01',
          matchScore: 94,
          badge: 'Highest Recommended',
          isDemo: true,
          reasons: [
            '✓ Matches your computer interest and basic computer literacy',
            '✓ Meets eligibility qualification (12th standard)',
            '✓ Conveniently available at Varanasi District Training Center',
            '✓ Aligns with local employment and freelance job preference'
          ],
          breakdown: {
            educationMatch: 20,
            skillMatch: 28,
            interestMatch: 20,
            locationMatch: 14,
            jobPrefMatch: 12
          },
          course: {
            _id: 'c1',
            name: 'Web & Digital Interface Design Assistant',
            skillArea: 'IT & Digital Services',
            category: 'it',
            duration: '3 Months (360 Hours)',
            deliveryMode: 'hybrid',
            eligibility: { minEducation: '12th Pass' },
            skillsGained: ['HTML5 & CSS3', 'JavaScript Basics', 'Responsive Web Design', 'Digital Portals'],
            nsqfLevel: 'NSQF Level 4 (Demo Aligned)',
            trainingSource: 'National Skill Development Ecosystem (Demo)',
            location: 'Varanasi District Skill Centre / Online',
            isVerified: true,
            isDemo: true,
            tags: ['computers', 'web', 'it']
          }
        },
        {
          _id: 'rec_02',
          matchScore: 86,
          badge: 'Strong Match',
          isDemo: true,
          reasons: [
            '✓ Matches digital literacy and customer facilitation aptitude',
            '✓ Fast track self-employment micro-enterprise pathway',
            '✓ Eligible under PM-AJAY beneficiary support'
          ],
          breakdown: {
            educationMatch: 20,
            skillMatch: 24,
            interestMatch: 18,
            locationMatch: 14,
            jobPrefMatch: 10
          },
          course: {
            _id: 'c2',
            name: 'Digital Banking & Common Service Centre (CSC) Operator',
            skillArea: 'Banking, Financial Services & Insurance',
            category: 'services',
            duration: '6 Weeks (120 Hours)',
            deliveryMode: 'hybrid',
            eligibility: { minEducation: '12th Pass' },
            skillsGained: ['AePS Banking', 'DBT Portal Services', 'Customer Handling', 'Digital Billing'],
            nsqfLevel: 'NSQF Level 4 (Demo Aligned)',
            trainingSource: 'Digital India / CSC Academy (Demo)',
            location: 'Varanasi District HQ',
            isVerified: true,
            isDemo: true,
            tags: ['csc', 'banking', 'services']
          }
        },
        {
          _id: 'rec_03',
          matchScore: 78,
          badge: 'Good Opportunity',
          isDemo: true,
          reasons: [
            '✓ High rural demand in eastern UP districts',
            '✓ Hands-on practical field skilling with stipend'
          ],
          breakdown: {
            educationMatch: 20,
            skillMatch: 18,
            interestMatch: 16,
            locationMatch: 12,
            jobPrefMatch: 12
          },
          course: {
            _id: 'c3',
            name: 'Solar-Powered Micro-Irrigation Technician',
            skillArea: 'Agriculture & Green Energy',
            category: 'agriculture',
            duration: '2 Months (240 Hours)',
            deliveryMode: 'offline',
            eligibility: { minEducation: '10th Pass' },
            skillsGained: ['Solar Pump Maintenance', 'Drip Line Layout', 'Pressure Valves'],
            nsqfLevel: 'NSQF Level 4 (Demo Aligned)',
            trainingSource: 'Rural Skilling Kendra (Demo)',
            location: 'Chandauli & Mirzapur',
            isVerified: true,
            isDemo: true,
            tags: ['agriculture', 'solar']
          }
        }
      ]
    };
  },

  // Opportunities
  async getOpportunities(params: any = {}): Promise<{ success: boolean; opportunities: LivelihoodOpportunity[] }> {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/jobs?${query}`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Using local fallback for opportunities:', e);
    }
    return {
      success: true,
      opportunities: [
        {
          _id: 'job_01',
          title: 'Junior Web & Portal Maintenance Associate',
          type: 'employment',
          description: 'Assisting local district enterprises, schools, and digital service vendors in updating website content, public listings, and portals.',
          requiredSkills: ['Basic HTML/CSS', 'Basic Computer', 'Typing'],
          location: 'Varanasi Local District',
          jobType: 'full_time',
          eligibility: { education: '12th Pass or Diploma', experience: '0-1 year / Freshers with Training' },
          source: 'District Employment Exchange / Industry Partner (Demo)',
          category: 'it',
          isDemo: true,
          lastUpdated: new Date().toISOString()
        },
        {
          _id: 'job_02',
          title: 'Common Service Centre (CSC) Village Entrepreneur',
          type: 'self_employment',
          description: 'Setup and operate a village-level digital facilitation kiosk offering government schemes, Aadhaar banking, ticketing, and utility bill payments.',
          requiredSkills: ['Computer Literacy', 'CSC Portal Navigation', 'Customer Handling'],
          location: 'Rural Gram Panchayat, Varanasi District',
          jobType: 'freelance',
          eligibility: { education: '10th / 12th Pass', experience: 'Basic Computer Certification' },
          source: 'Village Level Entrepreneur (VLE) Scheme (Demo Pathway)',
          category: 'services',
          isDemo: true,
          lastUpdated: new Date().toISOString()
        },
        {
          _id: 'job_03',
          title: 'Solar Water Pump Service Technician',
          type: 'employment',
          description: 'Installation and maintenance of solar pumps for PM-KUSUM beneficiary farms and rural irrigation clusters.',
          requiredSkills: ['Solar Panel Assembly', 'Pump Electricals', 'Micro-Irrigation'],
          location: 'Chandauli, Mirzapur & Varanasi',
          jobType: 'full_time',
          eligibility: { education: '10th Pass + NSQF Skilling', experience: 'Freshers eligible' },
          source: 'Renewable Agri-Tech Vendor Network (Demo)',
          category: 'agriculture',
          isDemo: true,
          lastUpdated: new Date().toISOString()
        }
      ]
    };
  },

  // Livelihood Pathway
  async getPathway(category: string = 'it'): Promise<{ success: boolean; pathway: LivelihoodPathway }> {
    try {
      const res = await fetch(`${API_BASE}/jobs/pathway?category=${category}`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Using fallback pathway:', e);
    }
    return {
      success: true,
      pathway: {
        id: 'it_pathway',
        title: 'Digital & IT Livelihood Pathway',
        icon: 'Laptop',
        category: 'it',
        steps: [
          { step: 1, title: 'Current Profile', desc: '12th Pass, Basic Computer literacy verified', status: 'completed' },
          { step: 2, title: 'Skill Gap Identified', desc: 'HTML/CSS, Web basics, JavaScript essentials', status: 'completed' },
          { step: 3, title: 'NSQF Aligned Training', desc: 'Web & Digital Interface Assistant (3 Months)', status: 'current' },
          { step: 4, title: 'Assessment & Certification', desc: 'NSQF Level 4 Assessment & Government Credential', status: 'upcoming' },
          { step: 5, title: 'Livelihood Outcome', desc: 'Employment at local IT firms OR independent Digital Kiosk', status: 'goal' }
        ],
        employmentOpportunity: 'Junior Web & Portal Associate (₹14,000 - ₹18,000/mo)',
        selfEmploymentOpportunity: 'Village Digital Kiosk / Freelance Web Assistant (₹15,000 - ₹25,000/mo)'
      }
    };
  },

  // Admin Analytics
  async getAdminAnalytics() {
    try {
      const res = await fetch(`${API_BASE}/admin/analytics`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Using fallback admin analytics:', e);
    }
    return {
      success: true,
      analytics: {
        summary: {
          totalBeneficiaries: 14820,
          activeThisMonth: 3840,
          profilesCompleted: 11950,
          skillAssessmentsDone: 9740,
          trainingEnrollmentMapped: 6820,
          livelihoodLinksCreated: 4210
        },
        topSkillsIdentified: [
          { skill: 'Basic Computer & Typing', count: 4890, percentage: 33 },
          { skill: 'Traditional Agriculture', count: 3720, percentage: 25 },
          { skill: 'Domestic Electrical Wiring', count: 2150, percentage: 15 },
          { skill: 'Tailoring & Garments', count: 1840, percentage: 12 },
          { skill: 'Mobile & Appliance Repair', count: 1240, percentage: 8 }
        ],
        commonSkillGaps: [
          { gap: 'Web & Digital Front-End Basics', affected: 3410 },
          { gap: 'Solar & Micro-Irrigation Controls', affected: 2980 },
          { gap: 'Digital Payments Literacy', affected: 2450 },
          { gap: 'Micro-Enterprise Bookkeeping', affected: 1890 }
        ],
        jobPreferenceDistribution: {
          employmentOnly: 38,
          selfEmploymentOnly: 29,
          bothFlexible: 33
        },
        districtWiseDemand: [
          { district: 'Varanasi', beneficiaries: 3820, primaryDomain: 'IT & Digital Services', skillCentres: 12 },
          { district: 'Chandauli', beneficiaries: 2940, primaryDomain: 'Modern Agriculture & Solar', skillCentres: 8 },
          { district: 'Mirzapur', beneficiaries: 2610, primaryDomain: 'Artisanal & Food Processing', skillCentres: 7 },
          { district: 'Jaunpur', beneficiaries: 2840, primaryDomain: 'Electrical & Hardware', skillCentres: 9 }
        ]
      }
    };
  }
};


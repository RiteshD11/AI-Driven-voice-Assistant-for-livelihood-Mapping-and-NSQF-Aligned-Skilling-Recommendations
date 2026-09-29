import { LivelihoodPathway, PathwayStage } from '../../types';

export const mockLivelihoodPathway: LivelihoodPathway = {
  id: 'path-solar-01',
  title: 'Solar PV Clean Energy Livelihood Pathway',
  sector: 'Green Jobs & Renewable Energy',
  targetRole: 'Solar PV Installation & Maintenance Technician',
  nsqfLevel: 3,
  wageEmploymentOption: {
    roleTitle: 'Rooftop Solar Installation Specialist',
    salaryRange: '₹16,000 – ₹22,000 / month',
    placementPartners: ['Tata Power Solar Partner Agency', 'Mahavitaran Empanelled EPC Vendors', 'SunEdison Local Franchise'],
    timelineMonths: 3
  },
  selfEmploymentOption: {
    enterpriseIdea: 'Independent Solar Maintenance & Electrical Service Micro-Enterprise',
    estimatedMonthlyProfit: '₹22,000 – ₹38,000 / month',
    capitalSupportScheme: 'PM-AJAY Capital Grant (Up to ₹50,000) + MUDRA Shishu Loan (₹50,000 at concessional interest)',
    equipmentRequirements: ['Safety Harness & PPE Kit', 'Digital Clamp Meter & Multimeter', 'Drill Machine & Crimping Toolset', 'Ladder & Transport Kit']
  },
  steps: [
    {
      stepNumber: 1,
      stageName: 'YOU ARE HERE',
      title: 'Voice Profiling & Competency Discovery',
      description: 'Your existing skills in basic electrical repairs and equipment handling have been documented via conversational voice.',
      status: 'completed',
      duration: 'Completed Today',
      partnerAgency: 'Kaushal Saathi Platform'
    },
    {
      stepNumber: 2,
      stageName: 'SKILL ASSESSMENT',
      title: 'NSQF Benchmark & Gap Identification',
      description: 'Identified key competency gaps in solar PV mounting, electrical safety codes, and inverter diagnostic maintenance.',
      status: 'completed',
      duration: 'Completed Today',
      partnerAgency: 'Sector Skill Council for Green Jobs (SCGJ)'
    },
    {
      stepNumber: 3,
      stageName: 'RECOMMENDED TRAINING',
      title: 'Solar PV Technician Training (3 Months)',
      description: '360 notional hours of hands-on rooftop practicals at Government ITI Aundh with ₹1,500 monthly stipend.',
      status: 'current',
      duration: '3 Months (Starts April 2026)',
      partnerAgency: 'PM-AJAY GIA Implementing Partner'
    },
    {
      stepNumber: 4,
      stageName: 'NSQF CERTIFICATION',
      title: 'NCVET Assessment & Government Credential',
      description: 'Formal theory and practical assessment by independent evaluators to award NSQF Level 3 national certificate.',
      status: 'upcoming',
      duration: 'Month 3',
      partnerAgency: 'National Council for Vocational Education and Training (NCVET)'
    },
    {
      stepNumber: 5,
      stageName: 'LOCAL OPPORTUNITY',
      title: 'Matching with Verified District Openings',
      description: 'Direct placement matchmaking with solar contractors and residential rooftop installers within 20 km of Pune.',
      status: 'upcoming',
      duration: 'Month 4',
      partnerAgency: 'District Employment Exchange & PMKK Placement Cell'
    },
    {
      stepNumber: 6,
      stageName: 'EMPLOYMENT / ENTERPRISE',
      title: 'Sustainable Livelihood Launch',
      description: 'Commence full-time wage employment (₹16k-₹22k) OR launch registered local solar servicing kiosk with PM-AJAY subsidy.',
      status: 'upcoming',
      duration: 'Month 4 onwards',
      estimatedEarnings: '₹16,000 – ₹38,000 / month'
    },
    {
      stepNumber: 7,
      stageName: 'FOLLOW-UP & RETENTION',
      title: '30-Day, 90-Day & 180-Day Impact Tracking',
      description: 'Automated voice check-ins to monitor wage stability, workplace safety, and further upskilling towards NSQF Level 4.',
      status: 'upcoming',
      duration: 'Ongoing Milestone Check-ins',
      partnerAgency: 'PM-AJAY Beneficiary Welfare Cell'
    }
  ],
  stages: [
    {
      id: 'stg-01',
      stepNumber: 1,
      stageName: 'YOU ARE HERE',
      title: 'Voice Profiling & Competency Discovery',
      description: 'Your existing skills in basic electrical repairs and equipment handling have been documented via conversational voice.',
      status: 'completed',
      duration: 'Completed Today',
      milestones: ['Voice Conversation Verified', 'Informal Skills Cataloged']
    },
    {
      id: 'stg-02',
      stepNumber: 2,
      stageName: 'SKILL ASSESSMENT',
      title: 'NSQF Benchmark & Gap Identification',
      description: 'Identified key competency gaps in solar PV mounting, electrical safety codes, and inverter diagnostic maintenance.',
      status: 'completed',
      duration: 'Completed Today',
      milestones: ['Sector Skill Council Mapping', '3 High-Priority Gaps Identified']
    },
    {
      id: 'stg-03',
      stepNumber: 3,
      stageName: 'RECOMMENDED TRAINING',
      title: 'Solar PV Technician Training (3 Months)',
      description: '360 notional hours of hands-on rooftop practicals at Government ITI Aundh with ₹1,500 monthly stipend.',
      status: 'current',
      duration: '3 Months (Starts April 2026)',
      milestones: ['100% GIA Grant-in-Aid Subsidy', 'Monthly Attendance Stipend']
    },
    {
      id: 'stg-04',
      stepNumber: 4,
      stageName: 'NSQF CERTIFICATION',
      title: 'NCVET Assessment & Government Credential',
      description: 'Formal theory and practical assessment by independent evaluators to award NSQF Level 3 national certificate.',
      status: 'upcoming',
      duration: 'Month 3',
      milestones: ['National Skills Registry Entry', 'Level 3 Digitally Verifiable Credential']
    },
    {
      id: 'stg-05',
      stepNumber: 5,
      stageName: 'LOCAL OPPORTUNITY',
      title: 'Matching with Verified District Openings',
      description: 'Direct placement matchmaking with solar contractors and residential rooftop installers within 20 km of Pune.',
      status: 'upcoming',
      duration: 'Month 4',
      milestones: ['48 Vacancies in 20km Radius', 'District Employment Exchange Linkage']
    },
    {
      id: 'stg-06',
      stepNumber: 6,
      stageName: 'EMPLOYMENT / ENTERPRISE',
      title: 'Sustainable Livelihood Launch',
      description: 'Commence full-time wage employment (₹16k-₹22k) OR launch registered local solar servicing kiosk with PM-AJAY subsidy.',
      status: 'upcoming',
      duration: 'Month 4 onwards',
      milestones: ['Wage Offer Letter', 'Optional MUDRA Enterprise Credit']
    },
    {
      id: 'stg-07',
      stepNumber: 7,
      stageName: 'FOLLOW-UP & RETENTION',
      title: '30-Day, 90-Day & 180-Day Impact Tracking',
      description: 'Automated voice check-ins to monitor wage stability, workplace safety, and further upskilling towards NSQF Level 4.',
      status: 'upcoming',
      duration: 'Ongoing Milestone Check-ins',
      milestones: ['Automated Vernacular Voice Follow-up', 'Retention Audit & Career Ladder']
    }
  ]
};

export const mockPathway = mockLivelihoodPathway;

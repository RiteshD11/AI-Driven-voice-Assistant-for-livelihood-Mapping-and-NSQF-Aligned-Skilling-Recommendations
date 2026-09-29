import { Opportunity } from '../../types';

export const mockOpportunities: Opportunity[] = [
  {
    id: 'opp-001',
    title: 'Solar PV Field Technician',
    type: 'employment',
    sector: 'Clean Energy & Green Jobs',
    companyOrScheme: 'Mahavitaran Empanelled Solar EPC Partner',
    location: 'Shivajinagar & Hadapsar, Pune',
    distanceKm: 14,
    employmentType: 'full_time',
    salaryOrEarningsRange: '₹16,000 – ₹22,000 / month',
    requiredSkills: ['Solar Installation', 'Electrical Safety', 'Inverter Wiring', 'Basic Hand Tools'],
    minNsqfLevel: 3,
    qualificationRequired: '10th Pass + NSQF Level 3 Solar Certification',
    applicationDeadline: '2026-05-30',
    contactPerson: 'Kailash Deshmukh (Placement Officer)',
    contactPhone: '+91 98230 45678',
    isDemoData: true,
    openPositions: 8
  },
  {
    id: 'opp-002',
    title: 'Electrical Maintenance Assistant',
    type: 'employment',
    sector: 'Manufacturing & Infrastructure',
    companyOrScheme: 'Bhosari Industrial Estate Facility Network',
    location: 'Bhosari MIDC, Pimpri-Chinchwad',
    distanceKm: 18,
    employmentType: 'full_time',
    salaryOrEarningsRange: '₹15,000 – ₹19,500 / month',
    requiredSkills: ['Domestic Wiring', 'MCB Servicing', 'Appliance Diagnostics'],
    minNsqfLevel: 3,
    qualificationRequired: '10th Pass + Electrical Skilling',
    applicationDeadline: '2026-06-15',
    contactPerson: 'Sunil Patil (HR Supervisor)',
    contactPhone: '+91 97654 32109',
    isDemoData: true,
    openPositions: 12
  },
  {
    id: 'opp-003',
    title: 'Solar Water Pump Service Technician',
    type: 'employment',
    sector: 'Agri-Tech & Irrigation',
    companyOrScheme: 'PM-KUSUM Agri-Vendor Service Consortium',
    location: 'Baramati & Haveli Rural Clusters, Pune',
    distanceKm: 22,
    employmentType: 'full_time',
    salaryOrEarningsRange: '₹18,000 – ₹25,000 / month',
    requiredSkills: ['Solar Pump Maintenance', 'VFD Drives', 'Micro-Irrigation'],
    minNsqfLevel: 4,
    qualificationRequired: '10th / 12th Pass + NSQF Level 4',
    applicationDeadline: '2026-06-10',
    contactPerson: 'Dr. Anand Kulkarni',
    contactPhone: '+91 94220 11223',
    isDemoData: true,
    openPositions: 5
  },
  {
    id: 'opp-004',
    title: 'Village Solar & Electrical Maintenance Kiosk (Entrepreneur)',
    type: 'self_employment',
    sector: 'Micro-Enterprise & Rural Services',
    companyOrScheme: 'PM-AJAY Capital Subsidy + MUDRA Shishu Support',
    location: 'Candidate Village Gram Panchayat, Pune District',
    distanceKm: 2,
    employmentType: 'micro_enterprise',
    salaryOrEarningsRange: '₹22,000 – ₹38,000 / month (Estimated Net Profit)',
    requiredSkills: ['Solar Servicing', 'Domestic Wiring', 'Customer Dealing', 'Basic Bookkeeping'],
    minNsqfLevel: 3,
    qualificationRequired: 'NSQF Level 3 Certified Technician',
    applicationDeadline: 'Open Enrollment for PM-AJAY Beneficiaries',
    contactPerson: 'District Social Welfare Officer (PM-AJAY Cell)',
    contactPhone: 'Toll-Free 1800-233-4567',
    isDemoData: true,
    openPositions: 25
  },
  {
    id: 'opp-005',
    title: 'Common Service Centre (CSC) Digital & Agri Facilitator',
    type: 'self_employment',
    sector: 'Digital Governance & Citizen Services',
    companyOrScheme: 'Digital India VLE Scheme Alignment',
    location: 'Local Panchayat Samiti Center, Pune Peri-Urban',
    distanceKm: 5,
    employmentType: 'micro_enterprise',
    salaryOrEarningsRange: '₹18,000 – ₹32,000 / month (Commission Basis)',
    requiredSkills: ['Computer Literacy', 'AePS Banking', 'DBT Portal Services'],
    minNsqfLevel: 3,
    qualificationRequired: '10th / 12th Pass + Digital Skills',
    applicationDeadline: 'Rolling Admissions',
    contactPerson: 'District CSC Manager',
    contactPhone: '+91 98901 23456',
    isDemoData: true,
    openPositions: 15
  }
];

export const mockEmploymentPipeline = {
  applicationStatus: 'submitted',
  submissionDate: '2026-03-25',
  targetCompany: 'Mahavitaran Empanelled Solar EPC Partner',
  interviewScheduled: '2026-04-05 at 11:00 AM',
  interviewLocation: 'Pune District Skill Exchange, Aundh',
  placementStage: 'Interview Round 1 (Hands-on Practical Demo)',
  assignedMentor: 'Suresh More (District Placement Executive)'
};

export const mockSelfEmploymentRoadmap = {
  enterpriseName: 'Shinde Solar Care & Domestic Electrical Works',
  legalStructure: 'Sole Proprietorship / Village Micro-Enterprise',
  requiredCapital: 85000,
  grantSubsidyAmount: 42500, // PM-AJAY 50% GIA capital support
  concessionalLoanAmount: 42500, // MUDRA Shishu at 7% p.a.
  machineryKit: [
    'Digital Insulation Resistance Tester',
    'Heavy-Duty Cordless Drill & Impact Driver',
    'Safety Fall-Arrest Harness with Double Lanyard',
    'Solar PV MC4 Crimping & Wire Stripper Toolkit'
  ],
  setupTimelineDays: 30,
  incubationSupport: 'District Rural Development Agency (DRDA) Mentorship'
};

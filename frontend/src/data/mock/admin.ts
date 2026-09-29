import { AdminOverview, RegionalSkillData, TrainingDemandData, OutcomeAnalytics, SkillGapAnalytics } from '../../types';

export const mockAdminOverview: AdminOverview = {
  totalBeneficiariesProfiled: 2481,
  totalProfiled: 2481,
  totalTrainingEnrolled: 1246,
  trainingEnrolled: 1246,
  totalCertified: 874,
  certified: 874,
  totalWageEmployed: 632,
  employed: 632,
  totalSelfEmployed: 147,
  selfEmployed: 147,
  followUpPendingCount: 211,
  followUpRequired: 211,
  lastUpdated: '2026-03-29T18:00:00Z',
  isDemoData: true
};

export const mockSkillGapAnalytics: SkillGapAnalytics[] = [
  { gap: 'Solar PV Installation', beneficiariesCount: 640, bridgedCount: 420 },
  { gap: 'Electrical Safety Protocols', beneficiariesCount: 520, bridgedCount: 390 },
  { gap: 'Inverter & Battery Wiring', beneficiariesCount: 410, bridgedCount: 280 },
  { gap: 'Micro-Irrigation Controls', beneficiariesCount: 380, bridgedCount: 250 },
  { gap: 'Digital Literacy / UPI Apps', beneficiariesCount: 290, bridgedCount: 240 },
  { gap: 'Basic Bookkeeping / SHG Accts', beneficiariesCount: 210, bridgedCount: 180 }
];

export const mockTrainingDemandData: TrainingDemandData[] = [
  { trade: 'Solar PV Tech (L3)', demand: 920, enrolled: 780, sector: 'Renewable Energy', nsqfLevelAverage: 3.4 },
  { trade: 'Industrial Electrician (L3)', demand: 750, enrolled: 640, sector: 'Electronics', nsqfLevelAverage: 3.2 },
  { trade: 'Micro-Irrigation Tech (L4)', demand: 580, enrolled: 510, sector: 'Modern Agri', nsqfLevelAverage: 4.0 },
  { trade: 'CSC Digital Operator (L3)', demand: 490, enrolled: 420, sector: 'IT Services', nsqfLevelAverage: 3.0 },
  { trade: 'Agro Food Processor (L4)', demand: 390, enrolled: 310, sector: 'Food Processing', nsqfLevelAverage: 3.8 }
];

export const mockMonthlyProgressionData = [
  { month: 'Oct 2025', profiled: 280, enrolled: 140, certified: 90, placed: 65 },
  { month: 'Nov 2025', profiled: 420, enrolled: 210, certified: 140, placed: 98 },
  { month: 'Dec 2025', profiled: 560, enrolled: 290, certified: 195, placed: 142 },
  { month: 'Jan 2026', profiled: 710, enrolled: 370, certified: 260, placed: 185 },
  { month: 'Feb 2026', profiled: 890, enrolled: 480, certified: 340, placed: 245 },
  { month: 'Mar 2026', profiled: 1120, enrolled: 610, certified: 430, placed: 310 }
];

export const mockRegionalSkillData: RegionalSkillData[] = [
  { district: 'Pune', state: 'Maharashtra', totalBeneficiaries: 840, totalProfiled: 840, employed: 480, topSkillDemanded: 'Solar PV & Rooftop Energy', activeTrainingCenters: 8, placementRate: 82 },
  { district: 'Pimpri-Chinchwad', state: 'Maharashtra', totalBeneficiaries: 620, totalProfiled: 620, employed: 390, topSkillDemanded: 'Industrial Electrical Maintenance', activeTrainingCenters: 6, placementRate: 78 },
  { district: 'Solapur', state: 'Maharashtra', totalBeneficiaries: 410, totalProfiled: 410, employed: 240, topSkillDemanded: 'Solar Agri Water Pumps', activeTrainingCenters: 4, placementRate: 74 },
  { district: 'Kolhapur', state: 'Maharashtra', totalBeneficiaries: 330, totalProfiled: 330, employed: 195, topSkillDemanded: 'Modern Dairy & Cold Chain Tools', activeTrainingCenters: 3, placementRate: 76 },
  { district: 'Satara', state: 'Maharashtra', totalBeneficiaries: 281, totalProfiled: 281, employed: 160, topSkillDemanded: 'Agro-Processing & Packaging', activeTrainingCenters: 3, placementRate: 71 }
];

export const mockOutcomeAnalytics: OutcomeAnalytics = {
  employedRate: 78.4,
  avgIncomeUplift: 46.2,
  retentionRate90Days: 91.5,
  totalPlaced: 779
};

export const mockOutcomeDistribution = [
  { name: 'Full-Time Wage Employment', value: 632, color: '#f97316' },
  { name: 'Self-Employed Micro-Enterprise', value: 147, color: '#10b981' },
  { name: 'Apprenticeship / On-Job Training', value: 95, color: '#3b82f6' },
  { name: 'Seeking Higher Level Upskilling', value: 120, color: '#8b5cf6' }
];

export const mockAdminBeneficiaryList = [
  {
    id: 'ben-001',
    name: 'Rameshwar Shinde',
    district: 'Pune',
    education: '10th Pass',
    nsqfTrack: 'Solar PV Technician (Level 3)',
    status: 'Employed (MahaGreen Energy)',
    stipendPaid: '₹4,500',
    wageMonthly: '₹18,500',
    followUpDue: '2026-05-30',
    verified: true
  },
  {
    id: 'ben-002',
    name: 'Santosh Jadhav',
    district: 'Pimpri-Chinchwad',
    education: '12th Pass',
    nsqfTrack: 'Electrical Maintenance (Level 3)',
    status: 'Training In-Progress (Mod 3)',
    stipendPaid: '₹3,000',
    wageMonthly: 'Anticipated ₹17k',
    followUpDue: '2026-04-15',
    verified: true
  },
  {
    id: 'ben-003',
    name: 'Sunita Kamble',
    district: 'Solapur',
    education: '8th Pass',
    nsqfTrack: 'Solar Water Pump Service (Level 4)',
    status: 'Self-Employed (CSC Micro-Kiosk)',
    stipendPaid: '₹6,000',
    wageMonthly: '₹22,000 net profit',
    followUpDue: '2026-04-02',
    verified: true
  },
  {
    id: 'ben-004',
    name: 'Anil Waghmare',
    district: 'Pune',
    education: '10th Pass',
    nsqfTrack: 'Solar PV Technician (Level 3)',
    status: 'Certified (Awaiting Interview)',
    stipendPaid: '₹4,500',
    wageMonthly: 'Interview 05 Apr',
    followUpDue: '2026-04-10',
    verified: true
  },
  {
    id: 'ben-005',
    name: 'Pooja Gaikwad',
    district: 'Kolhapur',
    education: 'Graduate (BA)',
    nsqfTrack: 'Digital Banking & CSC Operator (Level 4)',
    status: 'Self-Employed (VLE Center)',
    stipendPaid: '₹4,000',
    wageMonthly: '₹24,500 net',
    followUpDue: '2026-04-20',
    verified: true
  }
];

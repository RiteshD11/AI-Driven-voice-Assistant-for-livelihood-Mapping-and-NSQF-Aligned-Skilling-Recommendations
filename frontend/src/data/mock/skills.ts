import { Skill, SkillGap } from '../../types';

export const mockCurrentSkills: Skill[] = [
  {
    id: 'sk-c1',
    name: 'Equipment Handling',
    category: 'technical',
    proficiency: 'intermediate',
    verified: true,
    acquiredFrom: 'on_job'
  },
  {
    id: 'sk-c2',
    name: 'Basic Electrical Knowledge',
    category: 'technical',
    proficiency: 'intermediate',
    verified: true,
    acquiredFrom: 'informal'
  },
  {
    id: 'sk-c3',
    name: 'Digital & Smartphone Literacy',
    category: 'digital',
    proficiency: 'beginner',
    verified: true,
    acquiredFrom: 'on_job'
  },
  {
    id: 'sk-c4',
    name: 'Basic Hand Tools Operations',
    category: 'technical',
    proficiency: 'advanced',
    verified: true,
    acquiredFrom: 'on_job'
  }
];

export const mockSkillGaps: SkillGap[] = [
  {
    id: 'gap-1',
    skillName: 'Solar PV Panel Installation',
    category: 'Renewable Energy',
    currentLevel: 'none',
    requiredLevel: 'competent',
    importance: 'critical',
    bridgedByModule: 'Module 02: Rooftop & Ground Mounted Solar Array Mounting'
  },
  {
    id: 'gap-2',
    skillName: 'High-Voltage Electrical Safety Standards',
    category: 'Occupational Safety',
    currentLevel: 'basic',
    requiredLevel: 'certified',
    importance: 'critical',
    bridgedByModule: 'Module 01: Electrical Safety Protocols & Earthing Systems'
  },
  {
    id: 'gap-3',
    skillName: 'Inverter & Battery System Maintenance',
    category: 'Preventative Maintenance',
    currentLevel: 'none',
    requiredLevel: 'competent',
    importance: 'critical',
    bridgedByModule: 'Module 03: Hybrid Inverter Wiring & Battery Bank Servicing'
  },
  {
    id: 'gap-4',
    skillName: 'Diagnostic Fault Finding & Troubleshooting',
    category: 'Quality Testing',
    currentLevel: 'none',
    requiredLevel: 'competent',
    importance: 'desirable',
    bridgedByModule: 'Module 04: Multimeter Diagnostics & Grid Synchronization'
  }
];

export const mockTargetRoleAssessment = {
  targetRole: 'Solar PV Technician (Suryamitra Aligned)',
  nsqfLevel: 3,
  qualificationCode: 'SGJ/Q0101',
  sector: 'Green Jobs & Renewable Energy',
  readinessPercentage: 45,
  masteredCompetenciesCount: 2,
  gapCompetenciesCount: 3,
  recommendedMilestone: 'Enroll in 3-Month NSQF Level 3 Certified Practical Training'
};

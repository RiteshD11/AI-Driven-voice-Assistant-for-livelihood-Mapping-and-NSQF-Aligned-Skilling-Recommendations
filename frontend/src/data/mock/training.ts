import { TrainingProgram, TrainingProgress } from '../../types';

export const mockTrainingDetail: TrainingProgram = {
  id: 'prog-suryamitra-01',
  title: 'Solar Photovoltaic Rooftop & Ground Installation Technician',
  nsqfLevel: 3,
  nsqfCode: 'SGJ/Q0101',
  sector: 'Green Jobs & Renewable Energy',
  durationMonths: 3,
  notionalHours: 360,
  deliveryMode: 'hybrid',
  trainingCenter: {
    name: 'Government Industrial Training Institute (ITI) & PMKK Skilling Campus',
    district: 'Pune',
    distanceKm: 14,
    address: 'Survey No. 42, ITI Road, Aundh, Pune, Maharashtra - 411007'
  },
  modules: [
    {
      moduleNumber: 1,
      title: 'Electrical Safety Protocols & Personal Protective Equipment',
      durationHours: 60,
      description: 'Covers high-voltage safety standards, electrical grounding/earthing, PPE inspection, and working at heights.'
    },
    {
      moduleNumber: 2,
      title: 'Solar PV Module Mounting & Structural Assembly',
      durationHours: 100,
      description: 'Hands-on civil mounting, azimuth and tilt angle orientation, shading analysis, and wind load considerations.'
    },
    {
      moduleNumber: 3,
      title: 'Inverter Circuit Wiring, Battery Storage & Cabling',
      durationHours: 120,
      description: 'MC4 connectors, string combiner boxes, charge controllers, and battery cycle testing.'
    },
    {
      moduleNumber: 4,
      title: 'Fault Diagnostics, Troubleshooting & Grid Sync',
      durationHours: 80,
      description: 'Using digital multimeters and clamp meters to detect open circuits, grounding faults, and net-metering synchronization.'
    }
  ],
  stipendAvailable: true,
  stipendAmountPerMonth: 1500,
  pmAjayGrantCovered: true,
  verifiedBadge: true
};

export const mockSkillBridgeMappings = [
  {
    currentSkill: 'Basic Electrical Knowledge',
    requiredCompetency: 'High-Voltage Safety & Earthing Protocols',
    trainingModule: 'Module 01: Electrical Safety Protocols & PPE',
    completionHours: 60
  },
  {
    currentSkill: 'Equipment & Tool Handling',
    requiredCompetency: 'Rooftop Framing & Solar Array Mounting',
    trainingModule: 'Module 02: Solar PV Module Mounting',
    completionHours: 100
  },
  {
    currentSkill: 'Informal Wiring & Fan Repair',
    requiredCompetency: 'Hybrid Inverter Cabling & Battery Maintenance',
    trainingModule: 'Module 03: Inverter Wiring & Battery Storage',
    completionHours: 120
  },
  {
    currentSkill: 'Smartphone App Operations',
    requiredCompetency: 'Digital Diagnostic Multimeter & Grid Sync',
    trainingModule: 'Module 04: Diagnostics, Troubleshooting & Testing',
    completionHours: 80
  }
];

export const mockActiveTrainingProgress: TrainingProgress = {
  id: 'prog-inst-001',
  programId: 'prog-suryamitra-01',
  beneficiaryId: 'ben-001',
  enrollmentDate: '2026-03-20',
  expectedCompletionDate: '2026-06-20',
  attendancePercentage: 88,
  modulesCompleted: 2,
  totalModules: 4,
  currentModule: 'Module 03: Inverter Circuit Wiring, Battery Storage & Cabling',
  assessmentStatus: 'in_progress',
  nsqfCertificateUrl: undefined
};

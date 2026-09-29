import { Recommendation } from '../../types';

export const mockRecommendations: Recommendation[] = [
  {
    id: 'rec-01',
    targetRole: 'Solar PV Technician',
    nsqfLevel: 3,
    matchScore: 94,
    badgeLabel: 'Highest Match',
    relevantSkillsCount: 2,
    skillGapsCount: 3,
    locationRelevance: 'Pune District Training Hub (14 km from residence)',
    program: {
      id: 'prog-suryamitra-01',
      title: 'Solar Photovoltaic Rooftop & Ground Installation Technician',
      nsqfLevel: 3,
      nsqfCode: 'SGJ/Q0101',
      sector: 'Green Jobs & Renewable Energy',
      durationMonths: 3,
      notionalHours: 360,
      deliveryMode: 'hybrid',
      trainingCenter: {
        name: 'Government ITI & PMKK Skilling Center',
        district: 'Pune',
        distanceKm: 14,
        address: 'Aundh Industrial Training Institute Campus, Pune, Maharashtra'
      },
      modules: [
        {
          moduleNumber: 1,
          title: 'Electrical Safety Protocols & Personal Protective Equipment',
          durationHours: 60,
          description: 'High-voltage insulation, earthing tests, safety harness, and hazard prevention on roofs.'
        },
        {
          moduleNumber: 2,
          title: 'Solar PV Panel Mounting & Array Civil Works',
          durationHours: 100,
          description: 'Mechanical framing, roof orientation, solar irradiance optimization, and torque tightening.'
        },
        {
          moduleNumber: 3,
          title: 'DC/AC Inverter Wiring & Battery Bank Servicing',
          durationHours: 120,
          description: 'Single-phase string inverter connections, charge controllers, and battery cycle testing.'
        },
        {
          moduleNumber: 4,
          title: 'Diagnostic Testing & Grid Interconnection',
          durationHours: 80,
          description: 'Multimeter troubleshooting, open circuit voltage testing, and net metering integration.'
        }
      ],
      stipendAvailable: true,
      stipendAmountPerMonth: 1500,
      pmAjayGrantCovered: true,
      verifiedBadge: true
    },
    reason: {
      educationMatched: true,
      educationDetail: 'Meets minimum qualification (10th pass required, candidate holds 10th SSC).',
      skillsMatched: ['Basic electrical work', 'Equipment handling', 'Basic hand tools'],
      skillsScore: 88,
      interestsMatched: ['Solar Photovoltaic & Clean Energy', 'Machines & Mechanical Systems'],
      mobilityFit: '14 km distance aligns within candidate daily travel ceiling of 20 km.',
      employmentPreferenceFit: 'Matches wage employment preference with structured local employer tie-ups.',
      localOpportunityAvailability: 'high',
      localJobCount: 38,
      capitalSupportEligible: 'PM-AJAY Capital Subsidy + MUDRA Shishu Loan eligible upon certification.',
      summaryExplanation: 'Directly bridges your foundational domestic wiring expertise into high-demand solar renewable infrastructure in Pune district.'
    }
  },
  {
    id: 'rec-02',
    targetRole: 'Electrical Maintenance Technician',
    nsqfLevel: 3,
    matchScore: 86,
    badgeLabel: 'Recommended',
    relevantSkillsCount: 3,
    skillGapsCount: 2,
    locationRelevance: 'Pimpri-Chinchwad Training Cluster (18 km)',
    program: {
      id: 'prog-elec-02',
      title: 'Domestic & Commercial Electrical Maintenance Specialist',
      nsqfLevel: 3,
      nsqfCode: 'ELE/Q6301',
      sector: 'Electronics & Construction',
      durationMonths: 3,
      notionalHours: 350,
      deliveryMode: 'classroom',
      trainingCenter: {
        name: 'State Skill Mission Partner Kendra',
        district: 'Pimpri-Chinchwad',
        distanceKm: 18,
        address: 'Bhosari MIDC Skilling Annex, Pimpri-Chinchwad'
      },
      modules: [
        {
          moduleNumber: 1,
          title: 'Circuit Layouts, MCB & Switchboard Wiring',
          durationHours: 90,
          description: 'Modern domestic 3-phase wiring, conduit pipes, and distribution box assembly.'
        },
        {
          moduleNumber: 2,
          title: 'Domestic Appliances Repair & Motors',
          durationHours: 110,
          description: 'Single-phase water pumps, ceiling fan rewinding, and induction load repair.'
        },
        {
          moduleNumber: 3,
          title: 'Preventative Maintenance & Safety Regulations',
          durationHours: 150,
          description: 'Inspection routines, short-circuit diagnostics, and energy efficiency audit.'
        }
      ],
      stipendAvailable: true,
      stipendAmountPerMonth: 1200,
      pmAjayGrantCovered: true,
      verifiedBadge: true
    },
    reason: {
      educationMatched: true,
      educationDetail: 'Candidate qualification (10th Pass) satisfies standard admission eligibility.',
      skillsMatched: ['Basic electrical work', 'Equipment handling'],
      skillsScore: 82,
      interestsMatched: ['Electrical Installation & Troubleshooting', 'Machines & Mechanical Systems'],
      mobilityFit: 'Within 18 km reach via local suburban rail and bus routes.',
      employmentPreferenceFit: 'High demand across residential facility maintenance and industrial clusters.',
      localOpportunityAvailability: 'high',
      localJobCount: 52,
      capitalSupportEligible: 'PM-AJAY Tool Kit Assistance Scheme grant eligible.',
      summaryExplanation: 'Builds upon your existing informal repair experience to grant official NSQF government certification for formal contracting roles.'
    }
  },
  {
    id: 'rec-03',
    targetRole: 'Solar Agri Pump Technician',
    nsqfLevel: 4,
    matchScore: 79,
    badgeLabel: 'Good Alternative',
    relevantSkillsCount: 2,
    skillGapsCount: 4,
    locationRelevance: 'Pune Rural Agri Hub (22 km / Transport Provided)',
    program: {
      id: 'prog-solar-pump-03',
      title: 'Solar Water Pumping & Micro-Irrigation Integration Technician',
      nsqfLevel: 4,
      nsqfCode: 'SGJ/Q0103',
      sector: 'Green Jobs & Agriculture Allied',
      durationMonths: 4,
      notionalHours: 420,
      deliveryMode: 'on_field',
      trainingCenter: {
        name: 'Regional Agricultural Skilling Hub',
        district: 'Pune Rural',
        distanceKm: 22,
        address: 'Agricultural Research Sub-Station, Hadapsar Extension, Pune'
      },
      modules: [
        {
          moduleNumber: 1,
          title: 'Solar Submersible & Surface Pump Installation',
          durationHours: 120,
          description: 'DC solar pumps, solar variable frequency drives (VFD), and borewell integration.'
        },
        {
          moduleNumber: 2,
          title: 'Drip & Sprinkler Micro-Irrigation Control Systems',
          durationHours: 140,
          description: 'Pressure valves, automated timers, and fertigation valve servicing.'
        },
        {
          moduleNumber: 3,
          title: 'PM-KUSUM Scheme Subsidy Field Auditing',
          durationHours: 160,
          description: 'Farmer subsidy verification, geotagging solar pumps, and maintenance reporting.'
        }
      ],
      stipendAvailable: true,
      stipendAmountPerMonth: 2000,
      pmAjayGrantCovered: true,
      verifiedBadge: true
    },
    reason: {
      educationMatched: true,
      educationDetail: '10th pass with farming background accepted for agricultural tech stream.',
      skillsMatched: ['Farm Machinery Operation', 'Equipment handling'],
      skillsScore: 74,
      interestsMatched: ['Agricultural Solar Pumps', 'Machines & Mechanical Systems'],
      mobilityFit: 'Free bus shuttle provided by training center from Pune central bus station.',
      employmentPreferenceFit: 'Excellent dual avenue: service vendor technician or own agro-service custom hiring center.',
      localOpportunityAvailability: 'moderate',
      localJobCount: 24,
      capitalSupportEligible: 'Eligible for PM-KUSUM Component C rural service center grants.',
      summaryExplanation: 'Leverages your farming background to specialize in rural solar irrigation, offering high seasonal earning potential.'
    }
  }
];

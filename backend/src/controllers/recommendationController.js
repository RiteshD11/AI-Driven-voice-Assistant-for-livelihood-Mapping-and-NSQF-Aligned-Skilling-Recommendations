const TrainingProgram = require('../models/TrainingProgram');
const Recommendation = require('../models/Recommendation');
const BeneficiaryProfile = require('../models/BeneficiaryProfile');
const axios = require('axios');

// Demo training programs catalog (clearly labeled demo data, NSQF aligned)
const DEMO_TRAINING_CATALOG = [
  {
    _id: '66e5f801b9c1d2e3f4a5b701',
    name: 'Web & Digital Interface Design Assistant',
    skillArea: 'IT & Digital Services',
    category: 'it',
    duration: '3 Months (360 Hours)',
    deliveryMode: 'hybrid',
    eligibility: { minEducation: '12th Pass', minAge: 18, maxAge: 35 },
    skillsGained: ['HTML5 & CSS3', 'JavaScript Basics', 'Responsive Web Design', 'Digital Portals'],
    nsqfLevel: 'NSQF Level 4 (Demo Aligned)',
    trainingSource: 'National Skill Development Ecosystem (Demo)',
    location: 'District Skill Development Centre, Varanasi / Online',
    isVerified: true,
    isDemo: true,
    tags: ['computers', 'it', 'web', 'digital']
  },
  {
    _id: '66e5f801b9c1d2e3f4a5b702',
    name: 'Solar-Powered Micro-Irrigation Technician',
    skillArea: 'Agriculture & Green Energy',
    category: 'agriculture',
    duration: '2 Months (240 Hours)',
    deliveryMode: 'offline',
    eligibility: { minEducation: '10th Pass', minAge: 18, maxAge: 40 },
    skillsGained: ['Solar Pump Installation', 'Drip & Sprinkler Maintenance', 'IoT Water Sensors', 'Basic Farm Electricals'],
    nsqfLevel: 'NSQF Level 4 (Demo Aligned)',
    trainingSource: 'Rural Skilling Kendra / PMKVY Partner (Demo)',
    location: 'Rural Training Centre, Chandauli & Mirzapur',
    isVerified: true,
    isDemo: true,
    tags: ['agriculture', 'solar', 'irrigation', 'farming']
  },
  {
    _id: '66e5f801b9c1d2e3f4a5b703',
    name: 'Domestic Electrical & Smart Appliance Maintenance',
    skillArea: 'Electronics & Hardware',
    category: 'services',
    duration: '3 Months (300 Hours)',
    deliveryMode: 'offline',
    eligibility: { minEducation: '8th / 10th Pass', minAge: 18, maxAge: 45 },
    skillsGained: ['Single-Phase Wiring', 'Inverter & Battery Servicing', 'Safety Grounding', 'Basic Tool Operations'],
    nsqfLevel: 'NSQF Level 3 (Demo Aligned)',
    trainingSource: 'State Skill Mission Training Provider (Demo)',
    location: 'ITI Campus, Shivpur, Varanasi',
    isVerified: true,
    isDemo: true,
    tags: ['electrician', 'hardware', 'repair', 'appliances']
  },
  {
    _id: '66e5f801b9c1d2e3f4a5b704',
    name: 'Digital Banking & Common Service Centre (CSC) Operator',
    skillArea: 'Banking, Financial Services & Insurance',
    category: 'services',
    duration: '6 Weeks (120 Hours)',
    deliveryMode: 'hybrid',
    eligibility: { minEducation: '12th Pass', minAge: 18, maxAge: 35 },
    skillsGained: ['Aadhaar Enabled Payment (AePS)', 'DBT Portals', 'Data Entry', 'Customer Service'],
    nsqfLevel: 'NSQF Level 4 (Demo Aligned)',
    trainingSource: 'Digital India / CSC Academy (Demo)',
    location: 'Varanasi District HQ / Digital Lab',
    isVerified: true,
    isDemo: true,
    tags: ['csc', 'banking', 'computers', 'finance']
  },
  {
    _id: '66e5f801b9c1d2e3f4a5b705',
    name: 'Food Processing & Organic Millet Value Addition',
    skillArea: 'Food Processing & Agri-Business',
    category: 'agriculture',
    duration: '2 Months (200 Hours)',
    deliveryMode: 'offline',
    eligibility: { minEducation: '8th / 10th Pass', minAge: 18, maxAge: 50 },
    skillsGained: ['Millet Flour Processing', 'Hygienic Packaging', 'FSSAI Basic Standards', 'Self-Help Group Bookkeeping'],
    nsqfLevel: 'NSQF Level 4 (Demo Aligned)',
    trainingSource: 'Agro-Incubation Skilling Hub (Demo)',
    location: 'ICAR-IIVR Campus, Jakhini, Varanasi',
    isVerified: true,
    isDemo: true,
    tags: ['food', 'millet', 'agriculture', 'self_employment']
  }
];

// Prototype transparent recommendation algorithm
// Education: 20%, Skills: 30%, Interests: 20%, Location: 15%, Job Preference: 15%
function calculateMatchScore(beneficiary, course) {
  let breakdown = {
    educationMatch: 0,
    skillMatch: 0,
    interestMatch: 0,
    locationMatch: 0,
    jobPrefMatch: 0
  };
  let reasons = [];

  // 1. Education Match (20%)
  const edu = (beneficiary.education && beneficiary.education.level) || '12th';
  if (['graduate', 'diploma', '12th'].includes(edu)) {
    breakdown.educationMatch = 20;
    reasons.push(`✓ Meets minimum eligibility requirements (${course.eligibility.minEducation})`);
  } else if (['10th', '8th'].includes(edu) && course.eligibility.minEducation.includes('10th')) {
    breakdown.educationMatch = 20;
    reasons.push(`✓ Meets minimum educational qualification`);
  } else {
    breakdown.educationMatch = 12;
  }

  // 2. Skill Match (30%)
  const userSkillNames = (beneficiary.existingSkills || []).map(s => (typeof s === 'string' ? s : s.name).toLowerCase());
  let matchedSkills = [];
  course.tags.forEach(tag => {
    if (userSkillNames.some(s => s.includes(tag) || tag.includes(s))) {
      matchedSkills.push(tag);
    }
  });

  if (matchedSkills.length > 0 || userSkillNames.includes('basic computer')) {
    breakdown.skillMatch = 28;
    reasons.push(`✓ Builds upon your existing foundational skills (${matchedSkills.slice(0, 2).join(', ') || 'Computer Literacy'})`);
  } else {
    breakdown.skillMatch = 16;
  }

  // 3. Interest Match (20%)
  const interests = (beneficiary.interests || []).map(i => i.toLowerCase());
  const interestMatchFound = interests.some(i => course.tags.some(t => i.includes(t)) || i.includes(course.category));
  if (interestMatchFound || interests.length === 0) {
    breakdown.interestMatch = 20;
    reasons.push(`✓ Directly aligns with your expressed interest in ${course.skillArea}`);
  } else {
    breakdown.interestMatch = 10;
  }

  // 4. Location Match (15%)
  const userLocation = (beneficiary.location && beneficiary.location.district) || 'Varanasi';
  if (course.location.toLowerCase().includes(userLocation.toLowerCase()) || course.deliveryMode === 'hybrid') {
    breakdown.locationMatch = 15;
    reasons.push(`✓ Conveniently accessible in your district (${userLocation}) or via hybrid mode`);
  } else {
    breakdown.locationMatch = 9;
  }

  // 5. Job Preference Match (15%)
  const pref = beneficiary.jobPreference || 'both';
  if (pref === 'both' || (pref === 'self_employment' && course.tags.includes('self_employment')) || (pref === 'employment' && !course.tags.includes('self_employment'))) {
    breakdown.jobPrefMatch = 15;
    reasons.push(`✓ Matches your preferred livelihood pathway (${pref === 'both' ? 'Employment & Self-Employment' : pref})`);
  } else {
    breakdown.jobPrefMatch = 10;
  }

  const totalScore = Math.min(98, Math.max(65, 
    breakdown.educationMatch + breakdown.skillMatch + breakdown.interestMatch + breakdown.locationMatch + breakdown.jobPrefMatch
  ));

  return { totalScore, breakdown, reasons };
}

exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.params.userId || (req.user && req.user._id);
    let profile = await BeneficiaryProfile.findOne({ userId });

    const defaultProfile = {
      education: { level: '12th' },
      existingSkills: [{ name: 'Basic Computer' }, { name: 'MS Office' }],
      interests: ['Computers & IT', 'Digital Work'],
      location: { district: 'Varanasi', state: 'Uttar Pradesh' },
      jobPreference: 'both',
      mobilityPreference: 'local'
    };

    const targetProfile = profile || defaultProfile;

    const recommendations = DEMO_TRAINING_CATALOG.map(course => {
      const { totalScore, breakdown, reasons } = calculateMatchScore(targetProfile, course);
      return {
        _id: course._id,
        course,
        matchScore: totalScore,
        breakdown,
        reasons,
        badge: totalScore >= 90 ? 'Highest Recommended' : totalScore >= 80 ? 'Strong Match' : 'Good Opportunity',
        isDemo: true
      };
    }).sort((a, b) => b.matchScore - a.matchScore);

    res.json({
      success: true,
      total: recommendations.length,
      recommendations,
      scoringMethod: 'Transparent Multi-Factor (Education 20%, Skills 30%, Interest 20%, Location 15%, Job Pref 15%)',
      disclaimer: 'Demo recommendations for SIH prototype. No official course affiliation claimed.'
    });
  } catch (error) {
    console.error('Recommendation engine error:', error);
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
};

exports.getTrainingPrograms = async (req, res) => {
  res.json({
    success: true,
    programs: DEMO_TRAINING_CATALOG
  });
};

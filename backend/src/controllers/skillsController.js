const BeneficiaryProfile = require('../models/BeneficiaryProfile');
const axios = require('axios');

// Catalog of target roles and required skills for NSQF gap detection
const TARGET_ROLES = {
  web_developer: {
    title: 'Web & Digital Front-End Developer',
    nsqfLevel: 'Level 5',
    category: 'it',
    requiredSkills: [
      { name: 'Basic Computer', level: 'Foundation' },
      { name: 'HTML & CSS', level: 'Core' },
      { name: 'JavaScript Essentials', level: 'Core' },
      { name: 'React UI Fundamentals', level: 'Advanced' },
      { name: 'Git & Collaboration', level: 'Tools' }
    ]
  },
  digital_agri_operator: {
    title: 'Solar & Micro-Irrigation Technician',
    nsqfLevel: 'Level 4',
    category: 'agriculture',
    requiredSkills: [
      { name: 'Soil & Water Testing', level: 'Foundation' },
      { name: 'Drip System Maintenance', level: 'Core' },
      { name: 'Solar Pump Handling', level: 'Core' },
      { name: 'Basic Digital App Tracking', level: 'Tools' }
    ]
  },
  data_entry_specialist: {
    title: 'Office & Banking Operations Assistant',
    nsqfLevel: 'Level 4',
    category: 'it',
    requiredSkills: [
      { name: 'Basic Computer', level: 'Foundation' },
      { name: 'MS Office & Excel', level: 'Core' },
      { name: 'Typing Speed (Hindi/English)', level: 'Core' },
      { name: 'Internet & Online Banking Portals', level: 'Core' }
    ]
  },
  electrician_rural_infra: {
    title: 'Rural Smart Energy & Electrical Fitter',
    nsqfLevel: 'Level 4',
    category: 'services',
    requiredSkills: [
      { name: 'Basic Electrical Safety', level: 'Foundation' },
      { name: 'Domestic Wiring & Repair', level: 'Core' },
      { name: 'Inverter & Solar Storage Maintenance', level: 'Core' },
      { name: 'Tools Handling', level: 'Core' }
    ]
  },
  healthcare_assistant: {
    title: 'General Duty Assistant (Community Healthcare)',
    nsqfLevel: 'Level 4',
    category: 'healthcare',
    requiredSkills: [
      { name: 'Patient Vitals Monitoring', level: 'Foundation' },
      { name: 'First Aid & CPR', level: 'Core' },
      { name: 'Hygiene & Infection Control', level: 'Core' },
      { name: 'Digital Health Records Entry', level: 'Tools' }
    ]
  }
};

// Analyze skills and detect skill gap
exports.analyzeSkillGap = async (req, res) => {
  try {
    const { targetRole = 'web_developer', userSkills = [] } = req.body;
    const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';

    // Try delegating to Python AI Service
    try {
      const response = await axios.post(`${aiServiceUrl}/api/skills/gap`, {
        target_role: targetRole,
        existing_skills: userSkills
      }, { timeout: 3000 });

      if (response.data && response.data.success) {
        return res.json(response.data);
      }
    } catch (aiErr) {
      // Graceful fallback to built-in rule-based NLP algorithm if AI service is offline
      console.log('AI service unavailable, using built-in rule-based analysis');
    }

    // Built-in rule-based skill gap detection engine
    const selectedRole = TARGET_ROLES[targetRole] || TARGET_ROLES.web_developer;
    const currentSkillNames = userSkills.map(s => (typeof s === 'string' ? s : s.name).toLowerCase());

    const masteredSkills = [];
    const missingSkills = [];

    selectedRole.requiredSkills.forEach(reqSkill => {
      const isMastered = currentSkillNames.some(cs => cs.includes(reqSkill.name.toLowerCase()) || reqSkill.name.toLowerCase().includes(cs));
      if (isMastered) {
        masteredSkills.push(reqSkill);
      } else {
        missingSkills.push(reqSkill);
      }
    });

    const completionPercent = Math.round((masteredSkills.length / selectedRole.requiredSkills.length) * 100);

    return res.json({
      success: true,
      role: selectedRole.title,
      nsqfLevel: selectedRole.nsqfLevel,
      category: selectedRole.category,
      completionPercent,
      masteredSkills,
      missingSkills,
      recommendedNextSkill: missingSkills[0] ? missingSkills[0].name : 'Certification Examination',
      explanation: `You currently have ${masteredSkills.length} out of ${selectedRole.requiredSkills.length} required competencies for ${selectedRole.title}. Bridging the gap in ${missingSkills.map(m => m.name).join(', ')} will make you eligible for NSQF certification.`,
      isDemoAnalysis: true
    });
  } catch (error) {
    console.error('Skill gap analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze skill gap' });
  }
};

// Get all roles supported for gap analysis
exports.getAvailableRoles = (req, res) => {
  const roles = Object.keys(TARGET_ROLES).map(key => ({
    key,
    title: TARGET_ROLES[key].title,
    nsqfLevel: TARGET_ROLES[key].nsqfLevel,
    category: TARGET_ROLES[key].category,
    skillsCount: TARGET_ROLES[key].requiredSkills.length
  }));
  res.json({ success: true, roles });
};

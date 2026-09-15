// Demo livelihood opportunities (clearly tagged as Demo Opportunity)
const DEMO_OPPORTUNITIES = [
  {
    _id: '66e5f901b9c1d2e3f4a5b801',
    title: 'Junior Web & Portal Maintenance Associate',
    type: 'employment',
    description: 'Assisting local digital service agencies, schools, and small enterprises in updating websites and public digital portals.',
    requiredSkills: ['HTML/CSS', 'Basic JavaScript', 'Computer Operations'],
    location: 'Varanasi / Local District',
    jobType: 'full_time',
    eligibility: { education: '12th Pass or Diploma', experience: '0-1 year / Freshers with Training' },
    source: 'District Employment Exchange / Industry Partner (Demo)',
    category: 'it',
    isDemo: true,
    lastUpdated: new Date()
  },
  {
    _id: '66e5f901b9c1d2e3f4a5b802',
    title: 'Common Service Centre (CSC) Digital Entrepreneur',
    type: 'self_employment',
    description: 'Setup and operate a village-level digital facilitation kiosk offering government schemes, Aadhaar banking, ticketing, and utility bill payments.',
    requiredSkills: ['Computer Literacy', 'CSC Portal Navigation', 'Customer Handling'],
    location: 'Rural Gram Panchayat, Varanasi District',
    jobType: 'freelance',
    eligibility: { education: '10th / 12th Pass', experience: 'Basic Computer Certification' },
    source: 'Village Level Entrepreneur (VLE) Scheme (Demo Pathway)',
    category: 'services',
    isDemo: true,
    lastUpdated: new Date()
  },
  {
    _id: '66e5f901b9c1d2e3f4a5b803',
    title: 'Solar Water Pump Service & Installation Technician',
    type: 'employment',
    description: 'Installation and maintenance of solar pumps for PM-KUSUM beneficiary farms and rural irrigation clusters.',
    requiredSkills: ['Solar Panel Assembly', 'Pump Electricals', 'Micro-Irrigation'],
    location: 'Chandauli, Mirzapur & Varanasi',
    jobType: 'full_time',
    eligibility: { education: '10th Pass + NSQF Level 4 Skilling', experience: 'Freshers eligible' },
    source: 'Renewable Agri-Tech Vendor Network (Demo)',
    category: 'agriculture',
    isDemo: true,
    lastUpdated: new Date()
  },
  {
    _id: '66e5f901b9c1d2e3f4a5b804',
    title: 'Millet Processing & Packaged Snacks Micro-Enterprise',
    type: 'self_employment',
    description: 'Community-scale micro-enterprise producing roasted and powdered millet nutritious snacks for local markets and schools.',
    requiredSkills: ['Food Processing', 'Packaging & Quality', 'Local Marketing'],
    location: 'Varanasi Peri-Urban Cluster',
    jobType: 'freelance',
    eligibility: { education: '8th / 10th Pass', experience: 'SHG / FPO Member preferred' },
    source: 'PM-FME Micro Food Enterprises Scheme Alignment (Demo Pathway)',
    category: 'agriculture',
    isDemo: true,
    lastUpdated: new Date()
  },
  {
    _id: '66e5f901b9c1d2e3f4a5b805',
    title: 'Home Appliance & Wiring Emergency Technician',
    type: 'self_employment',
    description: 'Independent localized on-demand electrical repair and domestic wiring maintenance service for rural and semi-urban households.',
    requiredSkills: ['Domestic Wiring', 'Appliance Servicing', 'Safety Protocol'],
    location: 'District-wide mobile service',
    jobType: 'freelance',
    eligibility: { education: '8th / 10th Pass + Electrical Skilling', experience: 'Hands-on practical training' },
    source: 'Rural Artisan Self-Employment Network (Demo)',
    category: 'services',
    isDemo: true,
    lastUpdated: new Date()
  },
  {
    _id: '66e5f901b9c1d2e3f4a5b806',
    title: 'Data Entry & Digital Inventory Clerk',
    type: 'employment',
    description: 'Inventory logging, invoices creation, and GST basic entry for local agricultural produce mandi and retail hubs.',
    requiredSkills: ['MS Excel', 'Hindi & English Typing', 'Basic Accounting'],
    location: 'Varanasi Mandi Hub',
    jobType: 'full_time',
    eligibility: { education: '12th Pass', experience: '0-2 years' },
    source: 'Local Merchant Association (Demo)',
    category: 'it',
    isDemo: true,
    lastUpdated: new Date()
  }
];

// Livelihood Pathways definition (Skills -> Training -> Opportunities)
const LIVELIHOOD_PATHWAYS = [
  {
    id: 'it_pathway',
    title: 'Digital & IT Livelihood Pathway',
    icon: 'Laptop',
    category: 'it',
    steps: [
      { step: 1, title: 'Current Skills', desc: 'Basic Computer, MS Office literacy', status: 'completed' },
      { step: 2, title: 'Skill Gap', desc: 'HTML/CSS, Web basics, JavaScript', status: 'current' },
      { step: 3, title: 'NSQF Skilling', desc: 'Web & Digital Interface Assistant (3 Months)', status: 'upcoming' },
      { step: 4, title: 'Certification', desc: 'NSQF Level 4 Assessment & Certificate', status: 'upcoming' },
      { step: 5, title: 'Livelihood Outcome', desc: 'Employment at digital agencies OR self-employed web/graphic freelancer', status: 'goal' }
    ],
    employmentOpportunity: 'Junior Web & Portal Associate (₹14,000 - ₹18,000/mo)',
    selfEmploymentOpportunity: 'Digital Kiosk / Freelance Web Assistant (₹15,000 - ₹25,000/mo)'
  },
  {
    id: 'agri_pathway',
    title: 'Solar & Modern Agriculture Pathway',
    icon: 'Sprout',
    category: 'agriculture',
    steps: [
      { step: 1, title: 'Current Skills', desc: 'Traditional farming knowledge', status: 'completed' },
      { step: 2, title: 'Skill Gap', desc: 'Micro-irrigation, solar pump operations', status: 'current' },
      { step: 3, title: 'NSQF Skilling', desc: 'Solar Micro-Irrigation Technician (2 Months)', status: 'upcoming' },
      { step: 4, title: 'Certification', desc: 'NSQF Level 4 Agri-Tech Certificate', status: 'upcoming' },
      { step: 5, title: 'Livelihood Outcome', desc: 'Technician role in solar agri firm OR custom hiring center', status: 'goal' }
    ],
    employmentOpportunity: 'Solar Pump Maintenance Tech (₹16,000 - ₹20,000/mo)',
    selfEmploymentOpportunity: 'Solar Agri Service & Spares Shop (₹20,000 - ₹35,000/mo)'
  }
];

exports.getOpportunities = async (req, res) => {
  try {
    const { type, location, skill, category } = req.query;

    let filtered = [...DEMO_OPPORTUNITIES];

    if (type && type !== 'all') {
      filtered = filtered.filter(item => item.type === type);
    }
    if (category && category !== 'all') {
      filtered = filtered.filter(item => item.category === category);
    }
    if (location) {
      filtered = filtered.filter(item => item.location.toLowerCase().includes(location.toLowerCase()));
    }
    if (skill) {
      filtered = filtered.filter(item => item.requiredSkills.some(s => s.toLowerCase().includes(skill.toLowerCase())));
    }

    res.json({
      success: true,
      total: filtered.length,
      opportunities: filtered,
      disclaimer: 'Demo opportunities for Smart India Hackathon 2026. Data is simulated for demonstration purposes.'
    });
  } catch (error) {
    console.error('Opportunities fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch opportunities' });
  }
};

exports.getLivelihoodPathway = async (req, res) => {
  try {
    const { category = 'it' } = req.query;
    const pathway = LIVELIHOOD_PATHWAYS.find(p => p.category === category) || LIVELIHOOD_PATHWAYS[0];

    res.json({
      success: true,
      pathway,
      allPathways: LIVELIHOOD_PATHWAYS,
      disclaimer: 'Simulated livelihood pathway mapped according to NSQF progression pathways.'
    });
  } catch (error) {
    console.error('Livelihood pathway error:', error);
    res.status(500).json({ error: 'Failed to fetch pathway' });
  }
};

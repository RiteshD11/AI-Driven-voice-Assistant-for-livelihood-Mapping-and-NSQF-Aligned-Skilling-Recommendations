require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const BeneficiaryProfile = require('../models/BeneficiaryProfile');
const TrainingProgram = require('../models/TrainingProgram');
const LivelihoodOpportunity = require('../models/LivelihoodOpportunity');

const seedData = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/aarohan';
    await mongoose.connect(uri);
    console.log('🌱 Connected to MongoDB for seeding...');

    // Clear existing demo data
    await User.deleteMany({ email: /@aarohan\.gov\.in/ });
    await TrainingProgram.deleteMany({ isDemo: true });
    await LivelihoodOpportunity.deleteMany({ isDemo: true });

    // 1. Create Demo User
    const demoUser = await User.create({
      name: 'Rajesh Kumar (Demo)',
      email: 'demo@aarohan.gov.in',
      phone: '9876543210',
      password: 'demoPassword123!',
      role: 'beneficiary',
      preferredLanguage: 'hi',
      consentGiven: true,
      consentDate: new Date()
    });

    // 2. Create Demo Profile
    await BeneficiaryProfile.create({
      userId: demoUser._id,
      name: 'Rajesh Kumar',
      age: 21,
      gender: 'male',
      location: { district: 'Varanasi', state: 'Uttar Pradesh', pincode: '221001' },
      education: { level: '12th', field: 'General', details: 'Passed 12th Standard' },
      occupation: { current: 'Apprentice / Job Seeker', experience: 0 },
      existingSkills: [
        { name: 'Basic Computer', proficiency: 'intermediate', category: 'it' },
        { name: 'MS Office & Word', proficiency: 'intermediate', category: 'it' }
      ],
      interests: ['Computers & Information Technology', 'Web Designing'],
      mobilityPreference: 'local',
      jobPreference: 'both',
      preferredLanguage: 'hi',
      profileCompletion: 85,
      aiExtracted: true,
      isDemo: true
    });

    console.log('✅ Demo user and profile seeded');
    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedData();

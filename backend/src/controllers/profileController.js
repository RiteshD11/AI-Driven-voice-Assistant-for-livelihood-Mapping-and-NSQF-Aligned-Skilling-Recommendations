const BeneficiaryProfile = require('../models/BeneficiaryProfile');
const axios = require('axios');

// Get profile by userId
exports.getProfileByUserId = async (req, res) => {
  try {
    const userId = req.params.userId || (req.user && req.user._id);
    let profile = await BeneficiaryProfile.findOne({ userId });

    if (!profile) {
      // Fallback demo profile for SIH demonstration
      return res.json({
        success: true,
        isDemoData: true,
        profile: {
          name: 'Rajesh Kumar',
          age: 21,
          gender: 'male',
          location: { district: 'Varanasi', state: 'Uttar Pradesh', pincode: '221001' },
          education: { level: '12th', field: 'Arts/Science', details: 'Passed Intermediate with 68%' },
          occupation: { current: 'Apprentice / Seeking Work', experience: 0, details: 'Basic computer operator' },
          existingSkills: [
            { name: 'Basic Computer', proficiency: 'intermediate', category: 'it' },
            { name: 'MS Office', proficiency: 'intermediate', category: 'it' },
            { name: 'Data Entry', proficiency: 'intermediate', category: 'it' }
          ],
          interests: ['Computers & Information Technology', 'Web Designing', 'Digital Services'],
          mobilityPreference: 'local',
          jobPreference: 'both',
          preferredLanguage: 'hi',
          profileCompletion: 85,
          aiExtracted: true
        }
      });
    }

    res.json({ success: true, profile });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.userId || (req.user && req.user._id);
    const updateData = req.body;

    let profile = await BeneficiaryProfile.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({ success: true, profile, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: error.message || 'Failed to update profile' });
  }
};

// Update profile from AI-extracted fields
exports.confirmAiExtraction = async (req, res) => {
  try {
    const userId = req.params.userId || (req.user && req.user._id);
    const { confirmedData } = req.body;

    let profile = await BeneficiaryProfile.findOne({ userId });
    if (!profile) {
      profile = new BeneficiaryProfile({ userId });
    }

    if (confirmedData.education) profile.education = { ...profile.education, ...confirmedData.education };
    if (confirmedData.skills) {
      // Merge skills without duplicates
      const currentSkillNames = new Set(profile.existingSkills.map(s => s.name.toLowerCase()));
      confirmedData.skills.forEach(skill => {
        if (!currentSkillNames.has(skill.name.toLowerCase())) {
          profile.existingSkills.push(skill);
        }
      });
    }
    if (confirmedData.interests) {
      profile.interests = Array.from(new Set([...profile.interests, ...confirmedData.interests]));
    }
    if (confirmedData.jobPreference) profile.jobPreference = confirmedData.jobPreference;
    if (confirmedData.mobilityPreference) profile.mobilityPreference = confirmedData.mobilityPreference;
    if (confirmedData.location) profile.location = { ...profile.location, ...confirmedData.location };

    profile.aiExtracted = true;
    await profile.save();

    res.json({ success: true, profile, message: 'AI extracted profile saved and verified' });
  } catch (error) {
    console.error('AI profile confirmation error:', error);
    res.status(500).json({ error: 'Failed to confirm AI profile' });
  }
};


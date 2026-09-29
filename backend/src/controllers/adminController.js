// Aggregated, anonymized statistics for government administrative oversight
exports.getAnalytics = async (req, res) => {
  try {
    // Simulated aggregate data for SIH PM-AJAY pilot districts
    const analytics = {
      summary: {
        totalBeneficiaries: 14820,
        activeThisMonth: 3840,
        profilesCompleted: 11950,
        skillAssessmentsDone: 9740,
        trainingEnrollmentMapped: 6820,
        livelihoodLinksCreated: 4210
      },
      topSkillsIdentified: [
        { skill: 'Basic Computer & Typing', count: 4890, percentage: 33 },
        { skill: 'Traditional Agriculture', count: 3720, percentage: 25 },
        { skill: 'Domestic Electrical Wiring', count: 2150, percentage: 15 },
        { skill: 'Tailoring & Garments', count: 1840, percentage: 12 },
        { skill: 'Mobile & Appliance Repair', count: 1240, percentage: 8 },
        { skill: 'Automotive & Driving', count: 980, percentage: 7 }
      ],
      commonSkillGaps: [
        { gap: 'Web & Digital Front-End Basics', affected: 3410 },
        { gap: 'Solar & Micro-Irrigation Controls', affected: 2980 },
        { gap: 'Digital Payments (AePS/UPI) Literacy', affected: 2450 },
        { gap: 'Micro-Enterprise Bookkeeping', affected: 1890 },
        { gap: 'Quality Standards & FSSAI Basics', affected: 1420 }
      ],
      jobPreferenceDistribution: {
        employmentOnly: 38,
        selfEmploymentOnly: 29,
        bothFlexible: 33
      },
      monthlyRegistrations: [
        { month: 'Apr 2026', count: 1420 },
        { month: 'May 2026', count: 2150 },
        { month: 'Jun 2026', count: 2890 },
        { month: 'Jul 2026', count: 3450 },
        { month: 'Aug 2026', count: 4120 },
        { month: 'Sep 2026', count: 4790 }
      ],
      districtWiseDemand: [
        { district: 'Varanasi', beneficiaries: 3820, primaryDomain: 'IT & Digital Services', skillCentres: 12 },
        { district: 'Chandauli', beneficiaries: 2940, primaryDomain: 'Modern Agriculture & Solar', skillCentres: 8 },
        { district: 'Mirzapur', beneficiaries: 2610, primaryDomain: 'Artisanal & Food Processing', skillCentres: 7 },
        { district: 'Jaunpur', beneficiaries: 2840, primaryDomain: 'Electrical & Hardware', skillCentres: 9 },
        { district: 'Ghazipur', beneficiaries: 2610, primaryDomain: 'Rural Logistics & CSC', skillCentres: 7 }
      ],
      languagePreferences: [
        { language: 'Hindi', percentage: 76 },
        { language: 'Bhojpuri / Local Dialect', percentage: 18 },
        { language: 'English', percentage: 6 }
      ],
      voiceVsTextAdoption: {
        voiceFirst: 78,
        textFirst: 22
      },
      nsqfAlignmentRates: {
        level3: 28,
        level4: 52,
        level5: 20
      },
      privacyCompliance: 'Fully anonymized k-anonymity aggregation. Zero PII exposed.'
    };

    res.json({
      success: true,
      analytics,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Admin analytics error:', error);
    res.status(500).json({ error: 'Failed to retrieve admin analytics' });
  }
};


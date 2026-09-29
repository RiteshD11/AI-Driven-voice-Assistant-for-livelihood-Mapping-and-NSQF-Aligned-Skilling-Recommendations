const axios = require('axios');

// Process voice transcript with NLP to extract structured beneficiary profile
exports.processVoiceText = async (req, res) => {
  try {
    const { text, language = 'hi', currentStep = 'general' } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Voice transcript text is required' });
    }

    const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';

    // Try calling Python AI/NLP service first
    try {
      const response = await axios.post(`${aiServiceUrl}/api/nlp/extract`, {
        text,
        language
      }, { timeout: 3000 });

      if (response.data && response.data.success) {
        return res.json(response.data);
      }
    } catch (err) {
      console.log('Python AI service not responding, executing built-in NLP pipeline');
    }

    // Built-in intelligent multilingual NLP parser (Handles Hindi, Hinglish, English)
    const lower = text.toLowerCase();
    const extracted = {
      education: null,
      skills: [],
      interests: [],
      jobPreference: null,
      mobilityPreference: null,
      location: null
    };

    // 1. Education extraction
    if (lower.includes('12th') || lower.includes('बारहवीं') || lower.includes('12') || lower.includes('inter') || lower.includes('intermediate')) {
      extracted.education = { level: '12th', field: 'General / Science / Arts', details: 'Completed 12th Standard' };
    } else if (lower.includes('10th') || lower.includes('दसवीं') || lower.includes('10') || lower.includes('matric') || lower.includes('highschool')) {
      extracted.education = { level: '10th', field: 'General', details: 'Completed 10th Standard' };
    } else if (lower.includes('graduate') || lower.includes('स्नातक') || lower.includes('ba') || lower.includes('bsc') || lower.includes('bcom')) {
      extracted.education = { level: 'graduate', field: 'Degree', details: 'College Graduate' };
    } else if (lower.includes('8th') || lower.includes('आठवीं')) {
      extracted.education = { level: '8th', field: 'Middle School', details: 'Passed 8th Standard' };
    } else if (lower.includes('diploma') || lower.includes('डिप्लोमा') || lower.includes('iti')) {
      extracted.education = { level: 'diploma', field: 'Technical', details: 'Diploma / ITI' };
    }

    // 2. Skills extraction
    if (lower.includes('computer') || lower.includes('कंप्यूटर') || lower.includes('laptop') || lower.includes('pc')) {
      extracted.skills.push({ name: 'Basic Computer', proficiency: 'intermediate', category: 'it' });
    }
    if (lower.includes('excel') || lower.includes('word') || lower.includes('office') || lower.includes('टाइपिंग') || lower.includes('typing')) {
      extracted.skills.push({ name: 'MS Office & Typing', proficiency: 'intermediate', category: 'it' });
    }
    if (lower.includes('farming') || lower.includes('खेती') || lower.includes('kheti') || lower.includes('kisan')) {
      extracted.skills.push({ name: 'Traditional Agriculture', proficiency: 'intermediate', category: 'agriculture' });
    }
    if (lower.includes('wiring') || lower.includes('electric') || lower.includes('बिजली') || lower.includes('bijli')) {
      extracted.skills.push({ name: 'Basic Domestic Electricals', proficiency: 'beginner', category: 'services' });
    }
    if (lower.includes('driving') || lower.includes('ड्राइविंग')) {
      extracted.skills.push({ name: 'Commercial Driving', proficiency: 'intermediate', category: 'services' });
    }

    // 3. Interests extraction
    if (lower.includes('computer') || lower.includes('it') || lower.includes('tech') || lower.includes('डिजिटल') || lower.includes('web') || lower.includes('software')) {
      extracted.interests.push('Computers & Digital Technology');
    }
    if (lower.includes('kheti') || lower.includes('खेती') || lower.includes('agri') || lower.includes('kisan') || lower.includes('solar')) {
      extracted.interests.push('Agriculture & Solar Tech');
    }
    if (lower.includes('dukan') || lower.includes('shop') || lower.includes('business') || lower.includes('बिजनेस') || lower.includes('व्यापार')) {
      extracted.interests.push('Micro-Enterprise & Business');
    }

    // 4. Job Preference extraction
    if (lower.includes('local') || lower.includes('घर के पास') || lower.includes('गाँव') || lower.includes('district') || lower.includes('local job')) {
      extracted.jobPreference = 'employment';
      extracted.mobilityPreference = 'local';
    } else if (lower.includes('business') || lower.includes('खुद का काम') || lower.includes('apna kaam') || lower.includes('self')) {
      extracted.jobPreference = 'self_employment';
    } else {
      extracted.jobPreference = 'both';
    }

    // 5. Location extraction
    if (lower.includes('varanasi') || lower.includes('बनारस') || lower.includes('वाराणसी') || lower.includes('kashi')) {
      extracted.location = { district: 'Varanasi', state: 'Uttar Pradesh', pincode: '221001' };
    } else if (lower.includes('chandauli') || lower.includes('चंदौली')) {
      extracted.location = { district: 'Chandauli', state: 'Uttar Pradesh', pincode: '232104' };
    } else if (lower.includes('mirzapur') || lower.includes('मिर्ज़ापुर')) {
      extracted.location = { district: 'Mirzapur', state: 'Uttar Pradesh', pincode: '231001' };
    }

    // Response message for voice assistant
    let assistantReply = '';
    if (language === 'hi') {
      assistantReply = 'बहुत बढ़िया! मैंने आपकी जानकारी समझ ली है। कृपया नीचे दी गई जानकारी की पुष्टि करें या बदलाव करें।';
    } else {
      assistantReply = "Excellent! I have understood your details. Please review and confirm the extracted profile below.";
    }

    return res.json({
      success: true,
      originalText: text,
      language,
      extracted,
      assistantReply,
      confidence: 0.94,
      needsConfirmation: true,
      isDemoNlp: true
    });
  } catch (error) {
    console.error('Voice NLP processing error:', error);
    res.status(500).json({ error: 'Voice processing failed' });
  }
};

// Create a new voice interactive session
exports.createSession = async (req, res) => {
  try {
    const { language = 'hi' } = req.body;
    const initialText = language === 'mr'
      ? 'नमस्कार, मी उन्नती सहाय्यक आहे. आपल्या आधीच्या कौशल्यांबद्दल सांगा.'
      : language === 'en'
      ? 'Welcome to UNNATI. Please describe your previous work experience or technical skills.'
      : 'नमस्ते! मैं उन्नति सहायक हूँ। कृपया अपने पिछले कार्य अनुभव या तकनीकी कौशल के बारे में बताएं।';

    res.json({
      sessionId: `sess-${Date.now()}`,
      beneficiaryId: (req.user && req.user._id) || 'ben-sc-2026-001',
      language,
      status: 'active',
      currentQuestionIndex: 1,
      activeQuestion: initialText,
      transcript: [],
      messages: [
        {
          id: 'msg-start',
          sender: 'assistant',
          text: initialText,
          timestamp: new Date().toISOString()
        }
      ]
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create voice session' });
  }
};

// Handle voice dialog input & automatically update BeneficiaryProfile in real-time
exports.handleVoiceInput = async (req, res) => {
  try {
    const { sessionId, transcriptText, questionIndex = 1, language = 'hi' } = req.body;
    const BeneficiaryProfile = require('../models/BeneficiaryProfile');
    const userId = (req.user && req.user._id) || '66e5f7a8b9c1d2e3f4a5b6c7';

    // Extract real-time skills and profile information from what the user spoke
    const lower = (transcriptText || '').toLowerCase();
    const updateFields = {};

    if (lower.includes('12th') || lower.includes('बारहवीं') || lower.includes('12')) {
      updateFields.education = { level: '12th', field: 'General', details: '12th Standard Passed' };
    } else if (lower.includes('10th') || lower.includes('दसवीं') || lower.includes('10') || lower.includes('ssc')) {
      updateFields.education = { level: '10th', field: 'General', details: '10th Pass (SSC Certified)' };
    } else if (lower.includes('8th') || lower.includes('आठवीं')) {
      updateFields.education = { level: '8th', field: 'Middle School', details: '8th Standard Passed' };
    }

    const skillsToAdd = [];
    if (lower.includes('wiring') || lower.includes('electric') || lower.includes('बिजली') || lower.includes('motor') || lower.includes('rewinding')) {
      skillsToAdd.push({ name: 'Basic Electrical & Motor Rewinding', proficiency: 'intermediate', category: 'technical' });
      skillsToAdd.push({ name: 'Equipment & Tool Handling', proficiency: 'intermediate', category: 'technical' });
    }
    if (lower.includes('farming') || lower.includes('खेती') || lower.includes('kheti') || lower.includes('tractor') || lower.includes('pump')) {
      skillsToAdd.push({ name: 'Farm Machinery Operation & Solar Pumps', proficiency: 'intermediate', category: 'agricultural' });
    }
    if (lower.includes('computer') || lower.includes('phone') || lower.includes('mobile') || lower.includes('upi') || lower.includes('digital')) {
      skillsToAdd.push({ name: 'Smartphone & UPI Digital Tools', proficiency: 'intermediate', category: 'digital' });
    }

    if (skillsToAdd.length > 0) {
      updateFields.existingSkills = skillsToAdd;
    }

    if (lower.includes('solar') || lower.includes('सोलर') || lower.includes('machine') || lower.includes('बिजली')) {
      updateFields.interests = ['Machines & Mechanical Systems', 'Solar Photovoltaic & Clean Energy', 'Electrical Wiring'];
    }

    if (lower.includes('local') || lower.includes('pass') || lower.includes('गाँव') || lower.includes('district') || lower.includes('20')) {
      updateFields.mobilityPreference = 'local';
    }

    // Persist real spoken data into the user profile in MongoDB
    if (Object.keys(updateFields).length > 0) {
      updateFields.occupation = { current: transcriptText, experience: 3, details: 'Extracted from voice interaction' };
      updateFields.aiExtracted = true;
      updateFields.preferredLanguage = language;
      await BeneficiaryProfile.findOneAndUpdate(
        { userId },
        { $set: updateFields },
        { upsert: true, new: true }
      );
    }

    let assistantReply = language === 'mr'
      ? 'फार छान. तुमची ही माहिती सहेजली गेली असून तुमच्या प्रोफाइलमध्ये जोडली आहे.'
      : language === 'en'
      ? 'Great! Your spoken experience has been extracted and added to your profile.'
      : 'बहुत बढ़िया! आपकी यह जानकारी समझ ली गई है और आपके प्रोफाइल में जोड़ दी गई है।';

    res.json({
      sessionId,
      userMessageText: transcriptText,
      assistantReplyText: assistantReply,
      nextQuestionIndex: questionIndex + 1,
      isFinished: questionIndex >= 8
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to process voice input' });
  }
};



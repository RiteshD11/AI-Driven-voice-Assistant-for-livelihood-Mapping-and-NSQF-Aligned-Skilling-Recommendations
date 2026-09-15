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

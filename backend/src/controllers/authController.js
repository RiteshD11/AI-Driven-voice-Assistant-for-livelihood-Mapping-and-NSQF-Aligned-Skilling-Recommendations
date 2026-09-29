const jwt = require('jsonwebtoken');
const User = require('../models/User');
const BeneficiaryProfile = require('../models/BeneficiaryProfile');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'aarohan-sih-2026-secret-key-32char', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, preferredLanguage, consentGiven } = req.body;

    if (!name || !password) {
      return res.status(400).json({ error: 'Name and password are required' });
    }

    // Check existing
    if (email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) return res.status(400).json({ error: 'Email already registered' });
    }
    if (phone) {
      const existingPhone = await User.findOne({ phone });
      if (existingPhone) return res.status(400).json({ error: 'Phone already registered' });
    }

    const user = await User.create({
      name,
      email,
      phone,
      password,
      preferredLanguage: preferredLanguage || 'hi',
      consentGiven: Boolean(consentGiven),
      consentDate: consentGiven ? new Date() : undefined
    });

    // Create an initial empty profile
    await BeneficiaryProfile.create({
      userId: user._id,
      name: user.name,
      preferredLanguage: user.preferredLanguage,
      isDemo: false
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        preferredLanguage: user.preferredLanguage,
        consentGiven: user.consentGiven
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: error.message || 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be email or phone

    if (!identifier || !password) {
      return res.status(400).json({ error: 'Please provide email/phone and password' });
    }

    // Find by email or phone
    const user = await User.findOne({
      $or: [{ email: identifier.toLowerCase() }, { phone: identifier }]
    });

    if (!user) {
      // If demo user shortcut
      if (identifier === 'demo@aarohan.gov.in' && password === 'demo1234') {
        return res.json({
          success: true,
          token: 'demo-jwt-token-sih-2026',
          user: {
            id: '66e5f7a8b9c1d2e3f4a5b6c7',
            name: 'Demo Beneficiary',
            email: 'demo@aarohan.gov.in',
            role: 'beneficiary',
            preferredLanguage: 'hi',
            consentGiven: true
          }
        });
      }
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        preferredLanguage: user.preferredLanguage,
        consentGiven: user.consentGiven
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    res.json({ success: true, user: req.user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch current user' });
  }
};


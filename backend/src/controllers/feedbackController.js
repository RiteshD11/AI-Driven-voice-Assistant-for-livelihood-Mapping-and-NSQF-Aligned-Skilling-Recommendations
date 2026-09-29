const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res) => {
  try {
    const { rating, message, type = 'general', page = 'general' } = req.body;
    const userId = req.user ? req.user._id : undefined;

    const feedback = await Feedback.create({
      userId,
      type,
      rating,
      message,
      page
    });

    res.status(201).json({
      success: true,
      message: 'Feedback received with thanks! This helps improve AAROHAN for all beneficiaries.',
      feedbackId: feedback._id
    });
  } catch (error) {
    console.error('Feedback error:', error);
    // In demo mode without MongoDB, still return success
    res.json({
      success: true,
      message: 'Demo feedback received successfully!',
      isDemo: true
    });
  }
};


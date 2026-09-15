const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    enum: ['general', 'voice', 'recommendation', 'training', 'bug'],
    default: 'general'
  },
  rating: { type: Number, min: 1, max: 5 },
  message: String,
  page: String
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);

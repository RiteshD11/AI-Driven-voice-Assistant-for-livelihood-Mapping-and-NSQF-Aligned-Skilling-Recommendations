const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  trainingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrainingProgram'
  },
  type: {
    type: String,
    enum: ['training', 'job', 'self_employment'],
    required: true
  },
  title: String,
  matchScore: { type: Number, min: 0, max: 100 },
  breakdown: {
    educationMatch: { type: Number, default: 0 },
    skillMatch: { type: Number, default: 0 },
    interestMatch: { type: Number, default: 0 },
    locationMatch: { type: Number, default: 0 },
    jobPrefMatch: { type: Number, default: 0 }
  },
  reasons: [String],
  saved: { type: Boolean, default: false },
  isDemo: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Recommendation', recommendationSchema);

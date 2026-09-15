const mongoose = require('mongoose');

const trainingProgramSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: String,
  skillArea: { type: String, required: true },
  category: {
    type: String,
    enum: ['it', 'agriculture', 'healthcare', 'manufacturing', 'services', 'construction', 'retail', 'beauty', 'other']
  },
  duration: String,
  deliveryMode: {
    type: String,
    enum: ['online', 'offline', 'hybrid'],
    default: 'offline'
  },
  eligibility: {
    minEducation: String,
    minAge: { type: Number, default: 14 },
    maxAge: { type: Number, default: 60 }
  },
  skillsGained: [String],
  nsqfLevel: String,
  trainingSource: String,
  location: String,
  isVerified: { type: Boolean, default: false },
  isDemo: { type: Boolean, default: true },
  tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('TrainingProgram', trainingProgramSchema);

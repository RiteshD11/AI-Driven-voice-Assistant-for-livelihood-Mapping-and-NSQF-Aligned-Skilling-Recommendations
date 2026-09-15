const mongoose = require('mongoose');

const livelihoodOpportunitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ['employment', 'self_employment'],
    required: true
  },
  description: String,
  requiredSkills: [String],
  location: String,
  jobType: {
    type: String,
    enum: ['full_time', 'part_time', 'contract', 'freelance', 'seasonal']
  },
  eligibility: {
    education: String,
    experience: String
  },
  source: String,
  category: String,
  isDemo: { type: Boolean, default: true },
  lastUpdated: { type: Date, default: Date.now },
  tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('LivelihoodOpportunity', livelihoodOpportunitySchema);

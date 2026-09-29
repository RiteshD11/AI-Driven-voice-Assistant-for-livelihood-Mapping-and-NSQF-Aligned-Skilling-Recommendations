const mongoose = require('mongoose');

const beneficiaryProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: { type: String, trim: true },
  age: { type: Number, min: 14, max: 100 },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer_not_to_say']
  },
  location: {
    district: String,
    state: String,
    pincode: String
  },
  education: {
    level: {
      type: String,
      enum: ['no_formal', 'primary', '8th', '10th', '12th', 'diploma', 'graduate', 'postgraduate', 'other']
    },
    field: String,
    details: String
  },
  occupation: {
    current: String,
    experience: { type: Number, default: 0, min: 0 },
    details: String
  },
  existingSkills: [{
    name: String,
    proficiency: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced']
    },
    category: String
  }],
  interests: [String],
  workExperience: [{
    role: String,
    duration: String,
    details: String
  }],
  mobilityPreference: {
    type: String,
    enum: ['local', 'district', 'state', 'national', 'flexible'],
    default: 'local'
  },
  jobPreference: {
    type: String,
    enum: ['employment', 'self_employment', 'both'],
    default: 'both'
  },
  preferredLanguage: {
    type: String,
    default: 'hi'
  },
  profileCompletion: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  aiExtracted: {
    type: Boolean,
    default: false
  },
  rawVoiceText: String,
  isDemo: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Calculate profile completion before saving
beneficiaryProfileSchema.pre('save', function(next) {
  let completed = 0;
  const fields = ['name', 'age', 'gender', 'education.level', 'occupation.current', 'preferredLanguage'];
  const totalFields = 10;

  if (this.name) completed++;
  if (this.age) completed++;
  if (this.gender) completed++;
  if (this.location && this.location.state) completed++;
  if (this.education && this.education.level) completed++;
  if (this.occupation && this.occupation.current) completed++;
  if (this.existingSkills && this.existingSkills.length > 0) completed++;
  if (this.interests && this.interests.length > 0) completed++;
  if (this.mobilityPreference) completed++;
  if (this.jobPreference) completed++;

  this.profileCompletion = Math.round((completed / totalFields) * 100);
  next();
});

module.exports = mongoose.model('BeneficiaryProfile', beneficiaryProfileSchema);


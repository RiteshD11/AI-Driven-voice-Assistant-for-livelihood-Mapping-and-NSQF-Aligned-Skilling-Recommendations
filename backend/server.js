require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./src/config/database');

const authRoutes = require('./src/routes/auth');
const profileRoutes = require('./src/routes/profile');
const skillsRoutes = require('./src/routes/skills');
const recommendationRoutes = require('./src/routes/recommendations');
const jobsRoutes = require('./src/routes/jobs');
const adminRoutes = require('./src/routes/admin');
const voiceRoutes = require('./src/routes/voice');
const feedbackRoutes = require('./src/routes/feedback');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'unnati-backend', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/voice', voiceRoutes);
app.use('/api/feedback', feedbackRoutes);

// Livelihood Pathway & Training routes
app.get('/api/pathway', (req, res) => {
  res.json({
    success: true,
    pathway: {
      currentStage: 2,
      stages: [
        { id: 1, name: 'Voice Dialogue', status: 'completed' },
        { id: 2, name: 'Profile Synthesis', status: 'completed' },
        { id: 3, name: 'Skill Gap Bridge', status: 'in_progress' },
        { id: 4, name: 'NSQF Training Track', status: 'pending' },
        { id: 5, name: 'Placement & Follow-up', status: 'pending' }
      ]
    }
  });
});

app.get('/api/training/:id?', (req, res) => {
  res.json({
    success: true,
    program: {
      id: req.params.id || 'tp-solar-pv-01',
      title: 'Solar PV & Micro-Irrigation Technician',
      nsqfLevel: 'Level 4',
      durationMonths: 3,
      stipendPerMonth: 1500,
      center: 'District Skill Development Center, Pune'
    }
  });
});

// Hyperlocal Opportunities route
app.get('/api/opportunities', (req, res) => {
  res.json({
    success: true,
    opportunities: [
      {
        id: 'opp-1',
        title: 'Solar PV Field Technician',
        company: 'Maharashtra Solar Energy Cluster',
        location: 'Pune / Haveli (Within 12 km)',
        salary: '₹14,500 - ₹18,000 / month',
        type: 'Wage Employment'
      },
      {
        id: 'opp-2',
        title: 'Micro-Irrigation Setup Partner',
        company: 'Agri-Tech Rural Cooperative',
        location: 'Pimpri-Chinchwad (Within 18 km)',
        salary: '₹16,000 / month + incentives',
        type: 'Self-Employment Toolkit'
      }
    ]
  });
});

// Longitudinal Outcomes route
app.get('/api/outcomes/employment', (req, res) => {
  res.json({
    success: true,
    retentionRate: '89%',
    averageWageUplift: '+68%',
    postPlacementCalls30Day: 'Verified'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`✅ UNNATI Backend running on http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
  console.log(`🔧 Demo Mode: ${process.env.DEMO_MODE === 'true' ? 'ON' : 'OFF'}`);
});

module.exports = app;


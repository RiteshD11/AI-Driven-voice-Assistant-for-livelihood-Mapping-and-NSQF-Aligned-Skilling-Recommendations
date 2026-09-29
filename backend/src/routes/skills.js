const express = require('express');
const router = express.Router();
const skillsController = require('../controllers/skillsController');

router.post('/gap', skillsController.analyzeSkillGap);
router.get('/roles', skillsController.getAvailableRoles);
router.get('/assessment', (req, res) => {
  res.json({
    success: true,
    assessment: {
      targetRole: 'Solar PV & Electrical Systems Technician',
      nsqfLevel: 'NSQF Level 4',
      readinessScore: 84
    }
  });
});
router.get('/gaps', (req, res) => {
  res.json({
    success: true,
    gaps: []
  });
});

module.exports = router;


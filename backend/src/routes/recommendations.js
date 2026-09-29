const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const { protect } = require('../middleware/auth');

router.get('/list', recommendationController.getTrainingPrograms);
router.get('/:id/explanation', (req, res) => {
  res.json({
    success: true,
    recommendationId: req.params.id,
    factors: [
      { factor: 'Prior Spoken Experience', impact: 'High (+42%)' },
      { factor: 'Local Industry Demand (Pune/PCMC)', impact: 'High (+35%)' },
      { factor: 'Stipend Eligibility under PM-AJAY GIA', impact: '100% Subsidized' }
    ]
  });
});
router.get('/:userId?', protect, recommendationController.getRecommendations);

module.exports = router;


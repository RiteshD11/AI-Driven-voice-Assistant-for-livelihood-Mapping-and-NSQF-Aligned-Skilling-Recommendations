const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');

router.get('/', jobsController.getOpportunities);
router.get('/pathway', jobsController.getLivelihoodPathway);

module.exports = router;


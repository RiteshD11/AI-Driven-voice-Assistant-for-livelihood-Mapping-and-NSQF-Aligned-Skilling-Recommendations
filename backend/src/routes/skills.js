const express = require('express');
const router = express.Router();
const skillsController = require('../controllers/skillsController');

router.post('/gap', skillsController.analyzeSkillGap);
router.get('/roles', skillsController.getAvailableRoles);

module.exports = router;

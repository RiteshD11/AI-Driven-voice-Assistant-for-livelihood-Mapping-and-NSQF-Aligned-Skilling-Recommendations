const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { protect } = require('../middleware/auth');

router.get('/:userId?', protect, profileController.getProfileByUserId);
router.put('/:userId?', protect, profileController.updateProfile);
router.post('/confirm-ai', protect, profileController.confirmAiExtraction);

module.exports = router;


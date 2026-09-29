const express = require('express');
const router = express.Router();
const voiceController = require('../controllers/voiceController');

router.post('/process', voiceController.processVoiceText);
router.post('/session', voiceController.createSession);
router.post('/input', voiceController.handleVoiceInput);

module.exports = router;


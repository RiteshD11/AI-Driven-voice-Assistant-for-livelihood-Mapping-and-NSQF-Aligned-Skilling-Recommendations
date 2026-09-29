const express = require('express');
const router = express.Router();
const voiceController = require('../controllers/voiceController');

router.post('/process', voiceController.processVoiceText);

module.exports = router;


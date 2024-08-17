const express = require('express');
const { getCourseRecommendations } = require('../controllers/gptController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/recommendations', authMiddleware, getCourseRecommendations);

module.exports = router;

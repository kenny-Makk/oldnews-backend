const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');

// Writer/Editor 共通の提出データ取得
router.get('/', submissionController.getAllSubmissions);

module.exports = router;
const express = require('express');
const router = express.Router();
const editorController = require('../controllers/editorController');

// Editor のレビュー用
router.get('/inbox', editorController.getInbox);
router.post('/submissions/:id/approve', editorController.approveSubmission);
router.post('/submissions/:id/reject', editorController.rejectSubmission);
router.post('/publish/:id', editorController.publishDocument);
router.post('/pull/:id', editorController.pullDocument);

module.exports = router;
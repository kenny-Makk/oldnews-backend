import express from "express";
const router = express.Router();
import * as editorController from "../controllers/editorController.js";

// Editor のレビュー用
router.get('/inbox', editorController.getInbox);
router.post('/submissions/:id/approve', editorController.approveSubmission);
router.post('/submissions/:id/reject', editorController.rejectSubmission);
router.post('/publish/:id', editorController.publishDocument);
router.post('/pull/:id', editorController.pullDocument);

export default router;
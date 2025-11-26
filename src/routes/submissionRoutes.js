import express from "express";
const router = express.Router();
import * as submissionController from "../controllers/submissionController.js";

// Writer/Editor 共通の提出データ取得
router.get('/', submissionController.getAllSubmissions);

export default router;
// Router for handling writer submissions
import { Router } from "express";
// Middleware to verify JWT before allowing actions
import authMiddleware from "../middleware/authMiddleware.js";
// Controller: creates a submission linking writer → editor
import { submitDocument } from "../controllers/submissionController.js";
// Controller: returns submissions created by the logged-in writer
import { getMySubmissions } from "../controllers/submissionController.js";

const router = Router();

// Writer submits a document to an editor
// Writer が Editor に提出
router.post("/submit", authMiddleware, submitDocument);
// Writer checks all submissions they have sent
router.get("/mine", authMiddleware, getMySubmissions);

export default router;
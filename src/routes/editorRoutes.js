// Routes exclusively for editors to process submissions
import { Router } from "express";
import { 
  getInbox,
  approveSubmission,
  rejectSubmission,
  publishDocument,
  getApprovedList
} from "../controllers/editorController.js";

// JWT validation for all editor actions
import authMiddleware from "../middleware/authMiddleware.js";
// Authorization: only users with role 'editor' can access these routes
import editorOnly from "../middleware/editorOnly.js";

const router = Router();

// Editor sees all pending submissions from writers
router.get("/inbox", authMiddleware, editorOnly, getInbox);
// Editor approves a submission
router.post("/approve/:id", authMiddleware, editorOnly, approveSubmission);
// Editor rejects a submission
router.post("/reject/:id", authMiddleware, editorOnly, rejectSubmission);
// Editor publishes an approved document
router.post("/publish/:id", authMiddleware, editorOnly, publishDocument);
// Editor views list of approved submissions
router.get("/approved", authMiddleware, editorOnly, getApprovedList);

export default router;
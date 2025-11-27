// Routes for all document CRUD operations and publishing
import express from "express";
const router = express.Router();
import * as documentController from "../controllers/documentController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { getPublishedDocuments } from "../controllers/documentController.js";

// Create a new draft document (writer only)
router.post('/create',authMiddleware, documentController.createDocument);
// Get all documents belonging to the logged-in writer
router.get('/my',authMiddleware, documentController.getMyDocuments);
// Update an existing document (writer only)
router.put('/:id',authMiddleware, documentController.updateDocument);
// Delete an owned document
router.delete('/:id',authMiddleware, documentController.deleteDocument);
// Submit this document (alternative endpoint, not primary)
router.post('/:id/submit',authMiddleware, documentController.submitDocument);
// Get all published documents
router.get("/published", authMiddleware, getPublishedDocuments);

export default router;
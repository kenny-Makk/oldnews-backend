import express from "express";
const router = express.Router();
import * as documentController from "../controllers/documentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

router.post('/create',authMiddleware, documentController.createDocument);
router.get('/my',authMiddleware, documentController.getMyDocuments);
router.put('/:id',authMiddleware, documentController.updateDocument);
router.delete('/:id',authMiddleware, documentController.deleteDocument);
router.post('/:id/submit',authMiddleware, documentController.submitDocument);

export default router;
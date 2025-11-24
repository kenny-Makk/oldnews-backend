const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const authMiddleware = require("../middleware/authMiddleware");

router.post('/create',authMiddleware, documentController.createDocument);
router.get('/my',authMiddleware, documentController.getMyDocuments);
router.put('/:id',authMiddleware, documentController.updateDocument);
router.delete('/:id',authMiddleware, documentController.deleteDocument);
router.post('/:id/submit',authMiddleware, documentController.submitDocument);

module.exports = router;
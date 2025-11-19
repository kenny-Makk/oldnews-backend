const express = require('express');
const router = express.Router();

// controllers は後で作る
const authController = require('../controllers/authController');

// 認証ルートの箱だけ先に用意
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
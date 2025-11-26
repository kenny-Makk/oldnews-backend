import express from "express";
const router = express.Router();

// controllers は後で作る
import * as authController from "../controllers/authController.js";

// 認証ルートの箱だけ先に用意
router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;
// Authentication routes: register and login
import express from "express";
const router = express.Router();

// controllers は後で作る
import * as authController from "../controllers/authController.js";

// Create a new user account (writer or editor)
router.post('/register', authController.register);
// Login and return JWT + role
router.post('/login', authController.login);

export default router;
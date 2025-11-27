/**
 * Authentication Controller
 * Handles user registration and login.
 * These endpoints are used by the frontend to create a new user
 * and authenticate existing users using JWT.
 */
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * REGISTER (POST /auth/register)
 * - Creates a new user account.
 * - Validates email uniqueness.
 * - Hashes the password before saving.
 * - Returns the created user without exposing raw password.
 */
// ===== REGISTER =====
export const register = async (req, res) => {
  try {
    console.log("Login request received:", req.body); 
    const { name, email, password, role } = req.body;

    // Check if email is already registered
    // email の重複チェック
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already in use" });

    // Hash the password before storing in DB
    // パスワードハッシュ化
    const hashed = await bcrypt.hash(password, 10);

    // Create and save the new user in database
    // ユーザー作成
    const user = await User.create({
      name,
      email,
      password: hashed,
      role
    });

    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * LOGIN (POST /auth/login)
 * - Authenticates a user using email + password.
 * - Validates password with bcrypt.
 * - Generates a JWT containing user id and role.
 * - Returns the token so the client can authorize further requests.
 */
// ===== LOGIN =====
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    // ユーザー検索
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Validate password using bcrypt
    // パスワード照合
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    // Generate a JWT token with user id and role
    // JWT 発行
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ===== REGISTER =====
export const register = async (req, res) => {
  try {
    console.log("Login request received:", req.body); 
    const { name, email, password, role } = req.body;

    // email の重複チェック
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already in use" });

    // パスワードハッシュ化
    const hashed = await bcrypt.hash(password, 10);

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

// ===== LOGIN =====
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ユーザー検索
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // パスワード照合
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

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
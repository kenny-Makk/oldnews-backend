/**
 * Middleware: authMiddleware
 * -------------------------
 * Purpose:
 *   - Validates incoming JWT tokens sent by the client.
 *   - Ensures that only authenticated users can access protected routes.
 *
 * Behaviour:
 *   - Looks for Authorization header: "Bearer <token>".
 *   - If missing → return 401 "No token provided".
 *   - If token is present → verifies using process.env.JWT_SECRET.
 *   - On success → attaches decoded { id, role } to req.user.
 *   - On failure → return 401 "Invalid or expired token".
 *
 * Used in:
 *   - All protected routes (documents, submissions, editor inbox, etc.)
 *
 * Note:
 *   - The JWT secret must be stored in environment variables (.env).
 */
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // トークンがない場合
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  
    req.user = {
      id: decoded.id,
      role: decoded.role
    };
    next(); // 認証成功 → 次の処理へ
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
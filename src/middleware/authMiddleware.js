const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // トークンがない場合
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");  
    req.user = {
      id: decoded.id,
      role: decoded.role
    };
    next(); // 認証成功 → 次の処理へ
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
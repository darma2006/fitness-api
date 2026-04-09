const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  // 🔥 QUITAR "Bearer "
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = verifyToken;
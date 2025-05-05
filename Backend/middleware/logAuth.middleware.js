const jwt = require("jsonwebtoken");

const logAuth = (req, res, next) => {
  const { token } = req.cookies;

  try {
    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }
    const decoded = jwt.verify(token, process.env.LOG_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = logAuth;

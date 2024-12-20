const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token)
    return res.status(403).json({ error: "Access denied, token missing!" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.error("Token verification failed:", err);

      return res.status(403).json({ error: "Invalid token!" });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;

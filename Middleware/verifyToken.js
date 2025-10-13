
import jwt from "jsonwebtoken"

export default function verifyToken(req, res, next) {
  const auth = req.headers.authorization;
  let token = null;

  if (auth?.startsWith("Bearer ")) token = auth.split(" ")[1];
  
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, "secretKey");
  
    req.user = { uid: decoded.uid, email: decoded.email, role: decoded.role };
    return next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

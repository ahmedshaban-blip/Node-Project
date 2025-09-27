
// //verifyToken.js
import jwt from "jsonwebtoken"
// function verifyToken(req, res, next) {
//     const token = req.cookies.token;
//     if (!token) {
//         return res.status(401).send("Access Denied. No Token Provided.");
//     }
//     try {
//         const decoded = jwt.verify(token, 'secretKey');
//         req.user = decoded;
//         next();
//     } catch (err) {
//         res.status(400).send("Invalid Token");
//     }
// }
// export default verifyToken




// Middleware/verifyToken.js

export default function verifyToken(req, res, next) {
  const auth = req.headers.authorization;    // دعم Authorization header
  let token = null;

  if (auth?.startsWith('Bearer ')) token = auth.split(' ')[1];

  // لو حابب تدعم كوكيز كمان:
  if (!token && req.cookies?.token) token = req.cookies.token;

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, "secretKey"); // نفس السر المستخدم في login
    // decoded هي اللي انت مضيتها في login: { uid, email, iat, exp }
    req.user = { uid: decoded.uid, email: decoded.email };
    return next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}


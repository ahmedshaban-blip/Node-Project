
//verifyToken.js
import jwt from "jsonwebtoken"
function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send("Access Denied. No Token Provided.");
    }
    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = decoded;
        next(); 
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
    }
export default verifyToken;

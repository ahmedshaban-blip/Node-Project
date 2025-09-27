import { Router } from "express";
import { register, login } from "./Controller.js";
import checkEmail from "../../Middleware/checkemail.js";
import existingEmailandpassword from "../../Middleware/checkEmailandPasswordInLogin.js";
import verifyToken from "../../Middleware/verifyToken.js";
//Route.js
const router = Router();




router.post('/register',checkEmail, register);

router.post('/login',existingEmailandpassword, login, verifyToken);


export default router;
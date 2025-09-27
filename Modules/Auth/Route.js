//Route.js

import { Router } from "express";
import { register, login, getProfile } from "./Controller.js";
import checkEmail from "../../Middleware/checkemail.js";
import existingEmailandpassword from "../../Middleware/checkEmailandPasswordInLogin.js";
import verifyToken from "../../Middleware/verifyToken.js";
const router = Router();




router.post('/register',checkEmail, register);

router.post('/login',existingEmailandpassword, login);

router.get("/profile",verifyToken,getProfile,);
export default router;
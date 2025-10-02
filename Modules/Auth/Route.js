//Route.js

import { Router } from "express";
import { register, login, getProfile } from "./Controller.js";
import checkEmail from "../../Middleware/checkemail.js";
import existingEmailandpassword from "../../Middleware/checkEmailandPasswordInLogin.js";
import verifyToken from "../../Middleware/verifyToken.js";


import {
    createPostController,
    getAllPostsController,
    getMyPostsController,
    updatePostController,
    deletePostController
} from "../Auth/Controller.js";


const router = Router();




router.post('/register', checkEmail, register);

router.post('/login', existingEmailandpassword, login);

router.get("/profile", verifyToken, getProfile,);




router.post("/", verifyToken, createPostController);
router.get("/", verifyToken, getAllPostsController);
router.get("/my", verifyToken, getMyPostsController);
router.put("/id", verifyToken, updatePostController);
router.delete("/id", verifyToken, deletePostController);




export default router;
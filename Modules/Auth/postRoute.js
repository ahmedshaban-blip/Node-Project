
import { Router } from "express";
import verifyToken from "../../Middleware/verifyToken.js";

import {
    createPostController,
    getAllPostsController,
    getMyPostsController,
    updatePostController,
    deletePostController
} from "./Controller.js";


const PRouter = Router();




PRouter.post("/", verifyToken, createPostController);
PRouter.get("/", verifyToken, getAllPostsController);
PRouter.get("/my", verifyToken, getMyPostsController);
PRouter.put("/:id", verifyToken, updatePostController);
PRouter.delete("/:id", verifyToken, deletePostController);




export default PRouter;
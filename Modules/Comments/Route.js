import { Router } from "express";
import verifyToken from "../../Middleware/verifyToken.js";
import {
  addComment,
  getPostComments,
  editComment,
  removeComment,
} from "./commentController.js";

const router = Router();


router.post("/posts/:postId/comments", verifyToken, addComment);
router.get("/posts/:postId/comments", getPostComments);


router.put("/comments/:id", verifyToken, editComment);
router.delete("/comments/:id", verifyToken, removeComment);

export default router;

import {
  createComment,
  getCommentsByPostId,
  getCommentById,
  updateComment,
  deleteComment,
} from "./commentModel.js";
import db from "../../Database/dbConection.js";


const STRICT_POST_CHECK = true;

export async function addComment(req, res) {
  try {
    const { content, imageURL } = req.body;
    const { postId } = req.params;
    const { uid } = req.user || {};

    if (!uid) return res.status(401).json({ message: "Unauthorized" });
    if (!postId) return res.status(400).json({ message: "postId is required" });
    if (!content || !String(content).trim())
      return res.status(400).json({ message: "content is required" });


    if (STRICT_POST_CHECK) {
      const postDoc = await db.collection("posts").doc(postId).get();
      if (!postDoc.exists) return res.status(404).json({ message: "Post not found" });
    }

    const created = await createComment({
      content: String(content).trim(),
      postId,
      userId: uid,
      imageURL,
    });
    return res.status(201).json(created);
  } catch (e) {
    return res.status(500).json({ message: "Failed to add comment", error: e.message });
  }
}

export async function getPostComments(req, res) {
  try {
    const { postId } = req.params;
    if (!postId) return res.status(400).json({ message: "postId is required" });

    const list = await getCommentsByPostId(postId);
    return res.status(200).json(list);
  } catch (e) {
    return res.status(500).json({ message: "Failed to fetch comments", error: e.message });
  }
}

export async function editComment(req, res) {
  try {
    const { id } = req.params;
    const { content, imageURL } = req.body;
    const { uid, role } = req.user || {};

    if (!uid) return res.status(401).json({ message: "Unauthorized" });

    const existing = await getCommentById(id);
    if (!existing) return res.status(404).json({ message: "Comment not found" });

    
    const isOwner = existing.userId === uid;
    const isAdmin = role === "admin";
    if (!isOwner && !isAdmin) return res.status(403).json({ message: "Forbidden" });

    const updated = await updateComment(id, { content, imageURL });
    return res.status(200).json(updated);
  } catch (e) {
    return res.status(500).json({ message: "Failed to edit comment", error: e.message });
  }
}

export async function removeComment(req, res) {
  try {
    const { id } = req.params;
    const { uid, role } = req.user || {};

    if (!uid) return res.status(401).json({ message: "Unauthorized" });

    const existing = await getCommentById(id);
    if (!existing) return res.status(404).json({ message: "Comment not found" });

    const isOwner = existing.userId === uid;
    const isAdmin = role === "admin";
    if (!isOwner && !isAdmin) return res.status(403).json({ message: "Forbidden" });

    await deleteComment(id);
    return res.status(200).json({ message: "Comment deleted" });
  } catch (e) {
    return res.status(500).json({ message: "Failed to delete comment", error: e.message });
  }
}

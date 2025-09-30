import db from "../../Database/dbConection.js";
import admin from "firebase-admin";


export async function createComment({ content, postId, userId, imageURL = null }) {
  const ref = db.collection("comments").doc();
  const data = {
    id: ref.id,
    content,
    postId,
    userId,
    imageURL,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  await ref.set(data);
  return data;
}


export async function getCommentsByPostId(postId) {
  const snap = await db.collection("comments").where("postId", "==", postId).get();
  return snap.docs.map(d => d.data());
}


export async function getCommentById(id) {
  const doc = await db.collection("comments").doc(id).get();
  return doc.exists ? doc.data() : null;
}


export async function updateComment(id, { content, imageURL }) {
  const ref = db.collection("comments").doc(id);
  const payload = {
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  if (typeof content === "string") payload.content = content;
  if (typeof imageURL === "string") payload.imageURL = imageURL;

  await ref.update(payload);
  const updated = await ref.get();
  return updated.data();
}

// حذف تعليق
export async function deleteComment(id) {
  await db.collection("comments").doc(id).delete();
}

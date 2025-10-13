import db from "../dbConnection.js"
const postCollection = db.collection('posts')


export async function createPost(data) {
    const newPost = {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()

    }

    const docRef = await postCollection.add(newPost)
    return {
        id: docRef.id,
        ...newPost
    }


}

export async function getPostById(postId) {
    const doc = await postCollection.doc(postId).get();
    if (!doc) {
        return "post not found "
    } else {
        return { id: doc.id, ...doc.data() }
    }
}

export async function getPostsByUser(userId) {
    const snapshot = await postCollection.where("userId", "==", userId).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getAllPosts() {
    const snapshot = await postCollection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updatePost(postId, updates) {
    updates.updatedAt = new Date();
    await postCollection.doc(postId).update(updates);

    const snapshot = await postCollection.doc(postId).get();

    if (!snapshot.exists) {
    }

    return { id: snapshot.id, ...snapshot.data() };
}

export async function deletePost(postId) {
    await postCollection.doc(postId).delete();
    return { message: "Post deleted successfully" };
}


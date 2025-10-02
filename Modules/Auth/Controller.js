import { createUser, getUserByEmail, getUserByUid } from "../../Database/Models/authModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//********************** */ import posts part

import {
  createPost,
  getPostById,
  getPostsByUser,
  getAllPosts,
  updatePost,
  deletePost,
} from "../../Database/Models/PostModel.js";

//********************** */ import posts part

export async function register(req, res) {
  try {
    const { name,email, password, role } = req.body;

    if (name.length < 3)
      return res.status(400).json({ message: 'Name must be at least 3 characters ' });

    if (password.length < 6)
      return res.status(400).json({ message: 'Password must be at least 6 characters ' });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({ message: 'Invalid email' });

    const hashed = await bcrypt.hash(password, 10);

    await createUser(name,email, hashed, role);
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (e) {
    return res.status(500).json({ message: 'Registration failed', error: e.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const passSuccess = await bcrypt.compare(password, user.password);
    if (!passSuccess) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { uid: user.uid, email: user.email, role: user.role },"secretKey",);

    return res.status(200).json({ message: 'User logged in successfully', token });
  } catch (e) {
    return res.status(500).json({ message: 'Login failed', error: e.message });
  }
}

export async function getProfile(req, res) {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    const { uid } = req.user;
    const user = await getUserByUid(uid);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const { password, ...S } = user;

    return res.status(200).json(S);
  } catch (e) {
    return res.status(500).json({ message: 'Profile fetch failed', error: e.message });
  }
}




// post Controller functions part



// create 
export async function createPostController(req, res) {
  try {
    const { title, content } = req.body;


    const newPost = await createPost({
      title,
      content,
      userId: req.user.uid,
    });

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// get all 
export async function getAllPostsController(req, res) {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// get the post of the curr usr
export async function getMyPostsController(req, res) {
  try {
    const posts = await getPostsByUser(req.user.uid);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// edit req
export async function updatePostController(req, res) {
  try {
    const postId = req.params.id;
    const post = await getPostById(postId);

    if (!post) return res.status(404).json({ error: "Post not found" });

    //edit based on role 
    if (req.user.role !== "admin" && req.user.uid !== post.userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const updated = await updatePost(postId, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Del
export async function deletePostController(req, res) {
  try {
    const postId = req.params.id;
    const post = await getPostById(postId);

    if (!post) return res.status(404).json({ error: "Post not found" });

    if (req.user.role !== "admin" && req.user.uid !== post.userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const result = await deletePost(postId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

import { createUser, getUserByEmail, getUserByUid } from "../../Database/Models/AuthModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  try {
    const { name,email, password, role } = req.body;
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

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

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
    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).json({ message: 'Profile fetch failed', error: e.message });
  }
}

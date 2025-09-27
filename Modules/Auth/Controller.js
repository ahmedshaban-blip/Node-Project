//Controller.js

import { createUser, getUserByEmail } from "../../Database/Models/AuthModel.js";
import bycrypt from "bcrypt"
import jwt from "jsonwebtoken"

async function register(req, res) {
    const { email, password } = req.body;
    const hashedPassword = await bycrypt.hash(password, 10);
    const user = await createUser(email, hashedPassword);
    res.status(201).json({ message: 'User registered successfully' });
}


async function login(req, res) {
    const { email } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const token = jwt.sign({ uid: user.uid, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({ message: 'User logged in successfully' });
}

export { register, login };




// login >>> token generate >> send to user >> user send token with each request >> auth middleware >> verify token >> next()>> access to resource
// register >> create user in db >> send success message
// login >> verify user in db >> generate token >> send token to user
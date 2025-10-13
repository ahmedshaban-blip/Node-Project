// middleware

import db from "../Database/dbConnection.js";

const checkEmail = async (req, res, next) => {
    const { email } = req.body;
    const existingEmail = await db.collection('users').where('email', '==', email).get();
    if (existingEmail.empty) {
        return next();
    }
    return res.status(409).send("User Already Registered");
}

export default checkEmail
import db from "../Database/dbConection.js";




async function existingEmailandpassword(req, res, next) {
    const { email, password } = req.body;
    const existingUser = await db.collection('users').where('email', '==', email).get();
    if (existingUser.empty) {
        res.status(504).send("User Not Registered");
    } else {
        next(); 
    }
}

export default existingEmailandpassword;
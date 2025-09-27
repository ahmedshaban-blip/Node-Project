//AuthModel.js

import db from "../dbConection.js";


// register function
async function createUser(email, password) {
    const userRef = db.collection('users').doc();

    const uid = userRef.id;
   await userRef.set({
        uid,
        email,
        password,
    });
    return { uid, email };
}


// login function 
async function getUserByEmail(email) {
    const userSnapshot = await db.collection('users').where('email', '==', email).get();
    if (userSnapshot.empty) {
        return null;
    }
    return userSnapshot.docs[0].data();
}

export { createUser, getUserByEmail };
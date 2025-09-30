//AuthModel.js

import db from "../dbConnection.js";


// register function
async function createUser(name, email, password, role = 'user') {
    const userRef = db.collection('users').doc();

    const uid = userRef.id;
    await userRef.set({
        name,
        uid,
        email,
        password,
        role: role,
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


//Get User Profile details by uid whatever in token
async function getUserByUid(uid) {
    const userSnapshot = await db.collection('users').where('uid', '==', uid).get();
    if (userSnapshot.empty) {
        return null;
    }
    return userSnapshot.docs[0].data();
}

export { createUser, getUserByEmail, getUserByUid };
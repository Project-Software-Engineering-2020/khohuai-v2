const firebaseDB = require('../firebaseDB');
const db = firebaseDB.firestore();

//Models DB
const User = require('../Models/User');

//*****Function Query Database*****
const addUser = async (req, res, next) => {
    try {
        const data = req.body;
        await db.collection('users').doc().set(data);
        res.send('Add to DB success');
    }
    catch (error) {
        res.status(400).send(error.massage);
    }
}

const getAllUser = async (req, res, next) => {
    try {
        const user = await db.collection('users');
        const usersdata = await user.get();
        const userArray = [];
        if (usersdata.empty) {
            res.status(404).send("No User in record")
        } else {
            usersdata.docs.forEach(doc => {

                //push into array
                const user = new User(
                    doc.id,
                    doc.data().firstname,
                    doc.data().lastname
                )
                // console.log(user)
                userArray.push(user);
            });
            console.log(userArray);
            res.send(userArray);
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        await db.collection('users').doc(id).delete();
        res.send('Delete success');
    }
    catch (error) {
        res.status(400).send(error.massage);
    }
}


const getProfile = async (req, res, next) => {
    try {
        const uid = req.params.id;
        await db.collection('users').doc(uid).get().then((doc) => {
            console.log(doc.data());
            res.send(doc.data())
        })

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addUser,
    getAllUser,
    deleteUser,
    getProfile
}
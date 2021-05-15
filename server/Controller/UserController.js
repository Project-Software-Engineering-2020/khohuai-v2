const { firestore, firebaseApp, auth, googleProvider } = require('../firebaseDB');
const sign = require("jwt-encode");

const secret = 'secret';
//Models DB
const User = require('../Models/User');

const addUser = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('users').doc().set(data);
        res.send('Add to DB success');
    }
    catch (error) {
        res.status(400).send(error.massage);
    }
}

const getAllUser = async (req, res, next) => {
    try {
        const user = await firestore.collection('users');
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
            res.send(userArray);
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('users').doc(id).delete();
        res.send('Delete success');
    }
    catch (error) {
        res.status(400).send(error.massage);
    }
}


const getProfile = async (req, res, next) => {

    const uid = req.params.id;
    let d = []
    try {
        await firestore.collection('users').doc(uid).get().then((doc) => {
            console.log(doc.data());

            if (doc.data().book_name || doc.data().book_number || doc.data().book_provider) {
                d.push({
                    id: doc.id,
                    displayName: doc.data().displayName,
                    firstname: doc.data().firstname,
                    lastname: doc.data().lastname,
                    phone: doc.data().phone,
                    email: doc.data().email,
                    book_name: doc.data().book_name,
                    book_number: doc.data().book_number,
                    book_provider: doc.data().book_provider,
                    photoURL: doc.data().photoURL,
                })
            }
            else {
                d.push({
                    id: doc.id,
                    firstname: doc.data().firstname,
                    lastname: doc.data().lastname,
                    displayName: doc.data().displayName,
                    email: doc.data().email,
                    phone: doc.data().phone,
                    book_name: "",
                    book_number: "",
                    book_provider: "",
                    photoURL: doc.data().photoURL,
                })

            }


        })
        res.status(200).send(d[0])
    } catch (error) {
        console.log(error);
    }

}

const updateProfile = async (req, res, next) => {

    const data = req.body.newProfile;

    try {
        firestore.collection('users').doc(data.uid).update(data)
            .then((result) => { res.status(200).send(result) })

    } catch (error) {
        console.log(error);
    }
}

const setCurrentUser = async (req, res) => {

    const uid = req.params.id;
    console.log(uid);

    try {
        await firestore.collection("users").doc(uid).update({new_user: false})
        await firestore.collection("users").doc(uid)
          .get().then((doc) => {
            user = {
              email: doc.data().email,
              uid: doc.data().uid,
              displayName: doc.data().displayName,
              photoURL: doc.data().photoURL,
              new_user: doc.data().new_user,
              exp: (Date.now() / 1000 + (60 * 60))//นี่ไง หนึ่งชั่วโมง
            }
          });
        const jwt = sign(user, secret)
        res.status(200).send(jwt)
    } catch (error) {
        
    }
}

module.exports = {
    addUser,
    getAllUser,
    deleteUser,
    getProfile,
    updateProfile,
    setCurrentUser
}
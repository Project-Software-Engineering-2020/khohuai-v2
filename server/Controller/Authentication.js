const { auth, firebaseApp, admin, firestore, googleProvider } = require('../firebaseDB');
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client("909598832056-4e7km1tuqnqp1k8l5mghsk912rsf3j93.apps.googleusercontent.com")
const User = require('../Models/User');
const { getProfile } = require('./UserController');

const googleLogin = async (req, res) => {

  // Sign in with credential from the Google user.
  const tokenID = req.body.token;
  const credential = googleProvider.credential(tokenID);
  const result = await firebaseApp.auth().signInWithCredential(credential);

  req.session.token = tokenID;
  console.log(req.session);
  // console.log(JSON.stringify(result, null, 2));

  const userRef = firestore.collection("users").doc(result.user.uid);

  await userRef.get().then((doc) => {

    if (!doc.data()) {
      //ผู้ใช้งานใหม่
      console.log("New user");
      userRef.set({
        uid: result.user.uid,
        displayName: result.user.displayName,
        firstname: "",
        lastname: "",
        phone: "",
        photoURL: result.user.photoURL,
        email: result.user.email,
        role: "user",
        provider: "google",
        status: true,
        token: tokenID
      })

      let user_1 = new User(
        uid = result.user.uid,
        firstname = "",
        lastname = "",
        displayName = result.user.displayName,
        photoURL = result.user.photoURL,
        email = result.user.email,
        role = "user",
        provider = "google",
        token = tokenID
      )
      res.status(200).send(user_1);
      //ดึงข้อมูล
    }
    else {
      //ผู้ใช้ปัจจุบัน
      console.log("Present", doc.data())
      // u.then((doc) => {
      const user = new User(
        uid = doc.data().uid,
        firstname = doc.data().firstname,
        lastname = doc.data().lastname,
        displayName = doc.data().displayName,
        photoURL = doc.data().photoURL,
        email = doc.data().email,
        role = doc.data().role,
        provider = doc.data().provider,
        token = tokenID
      )
      // console.log(user);
      res.status(200).send(user);
      // })
    }

  })


  // .catch((error) => {
  //   console.log("error")
  //   // Handle Errors here.
  //   // var errorCode = error.code;
  //   // var errorMessage = error.message;
  //   // // The email of the user's account used.
  //   // var email = error.email;
  //   // // The firebase.auth.AuthCredential type that was used.
  //   // var credential = error.credential;
  //   // ...
  // });


  // req.session.userId = user.id


  //   // Get the ID token passed and the CSRF token.
  //   const idToken = req.body.tokenn.toString();

  //   var credential = firebaseApp.auth.GoogleAuthProvider.credential(idToken);

  //   // Sign in with credential from the Google user.
  //   auth.signInWithCredential(credential)
  //   .then(r => console.log(r))
  //   .catch((error) => {
  //   });
}


const signin = async (req, res) => {
  const _email = req.body.email;
  const _password = req.body.password;
  try {
    auth.signInWithEmailAndPassword(_email, _password)
      .then((result) => { 
        console.log(result);
        const user = firestore.collection("users").doc(result.user.uid);
        user.get().then((doc) => {
          const user = new User(
            uid = doc.data().uid,
            firstname = doc.data().firstname,
            lastname = doc.data().lastname,
            displayName = doc.data().displayName,
            photoURL = doc.data().photoURL,
            email = doc.data().email,
            role = doc.data().role,
            provider = doc.data().provider
          )
          res.status(200).send(user);
        })
      }).catch((error) => {
        res.status(201).send(error.code);
      })
  } catch (error) {
    console.log(error);
  }

}

const signup = (req, res) => {

  const email = req.body.email;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phone = req.body.phone;
  const photoURL = "https://img2.thaipng.com/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg";
  const role = "user";
  const provider = "hotmail";

  try {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
       
        if (result.additionalUserInfo.isNewUser === true) {

          const userRef = firestore.collection("users").doc(result.user.uid);
          const doc = await userRef.get();
          if (!doc.data()) {
            await userRef.set({
              uid: result.user.uid,
              displayName: firstname,
              firstname: firstname,
              lastname: lastname,
              phone: phone,
              photoURL: photoURL,
              email: result.user.email,
              role: role,
              provider: provider,
            }).then((r) => {
              res.status(200).send(result.user.uid);
            });
          }
        }
        else {
          console.log("มีผู้ใช้อยู่แล้ว");
        }

      })
      .catch((err) => {
        console.log(err);
        // if (err.code === "auth/email-already-in-use") {
        //   setRegisterErr("อีเมลนี้ถูกใช้งานแล้ว");
        // }
      });

  }
  catch (error) {
    console.error(error);
  }
}

const logout = async (req, res) => {
  await auth.signOut();
  await req.session.destroy();
  console.log("logout",req.session);
  res.status(200).send("logout_success");
}


module.exports = {
  signin,
  logout,
  signup,
  googleLogin
}
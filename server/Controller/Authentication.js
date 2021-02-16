const { auth,firebaseApp, admin, firestore } = require('../firebaseDB');
const User = require('../Models/User');

const sessionLogin = async (req, res, next) => {

  // Get the ID token passed and the CSRF token.
  const idToken = req.body.tokenn.toString();
 
  var credential = firebaseApp.auth.GoogleAuthProvider.credential(idToken);

  // Sign in with credential from the Google user.
  auth.signInWithCredential(credential)
  .then(r => console.log(r))
  .catch((error) => {
  });
}


const signin = async (req, res) => {
  const _email = req.body.email;
  const _password = req.body.password;
  try {
    auth.signInWithEmailAndPassword(_email, _password)
      .then((result) => {
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
        res.status(200).send()
        console.log(error);
        // if (error.code === "auth/invalid-email") {
        //   setEmailError("อีเมลไม่ถูกต้อง")
        // }
        // else if(error.code === "auth/wrong-password") {
        //   setPasswordErr("รหัสผ่านไม่ถูกต้อง")
        // }
        // else if(error.code === "auth/user-not-found") {
        //   setUserErr("ไม่พบบัญชีผู้ใช้งาน")
        // }
        // else if(error.code === "auth/too-many-requests"){
        //   setUserErr("คุณใส่รหัสผ่านผิดเกิน 3 ครั้ง กรุณารอสักครู่")
        // }
      })
  } catch (error) {
    throw error;
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

const logout = (req, res) => {
  auth.signOut();
  res.status(200).send("logout_success");
}


module.exports = {
  signin,
  logout,
  signup,
  sessionLogin
}
const { auth, admin, firestore } = require('../firebaseDB');
const User = require('../Models/User');

const sessionLogin = async (req, res, next) => {



  // Get the ID token passed and the CSRF token.
  const idToken = req.body.tokenn.toString();
  console.log(idToken);
  // Guard against CSRF attacks.
  //   if (csrfToken !== req.cookies.csrfToken) {
  //     res.status(401).send('UNAUTHORIZED REQUEST!');
  //     return;
  //   }
  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  // Create the session cookie. This will also verify the ID token in the process.
  // The session cookie will have the same claims as the ID token.
  // To only allow session cookie setting on recent sign-in, auth_time in ID token
  // can be checked to ensure user was recently signed in before creating a session cookie.
  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        console.log(sessionCookie);
        // Set cookie policy for session cookie.
        const options = { maxAge: expiresIn, httpOnly: true, secure: true };
        res.cookie('session', sessionCookie, options);
        res.send(JSON.stringify({ status: 'success' }));
      },
      (error) => {
        res.status(401).send('UNAUTHORIZED REQUEST!');
      }
    );
}


const sigin = async (req, res) => {
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
  }).catch ((error) => {
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


  console.log(req.body);

  try {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        console.log(result);
        console.log("ลงทะเบียนเรียบร้อยแล้ว");

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
    console.error();
  }
}

module.exports = {
  sigin,
  signup,
  sessionLogin
}
const {
  auth,
  firebaseApp,
  admin,
  firestore,
  googleProvider,
} = require("../firebaseDB");
const { OAuth2Client } = require("google-auth-library");
const sign = require("jwt-encode")
const client = new OAuth2Client("909598832056-4e7km1tuqnqp1k8l5mghsk912rsf3j93.apps.googleusercontent.com");
const secret = 'secret';
const User = require("../Models/User");

const googleLogin = async (req, res) => {

  console.log("signin with google")

  // Sign in with credential from the Google user.
  const tokenID = req.body.token;
  const credential = await googleProvider.credential(tokenID);
  const result = await firebaseApp.auth().signInWithCredential(credential);
  let user = {};

  try {
    const userRef = firestore.collection("users").doc(result.user.uid);
    await userRef.get().then(async (doc) => {
      if (!doc.data()) {

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
          new_user: true,
        });

        let inventory = await firestore.collection("inventorys").get();
        await inventory.docs.forEach(async (item) => {
          await userRef.collection("inventory").doc().set({
            id: item.id,
            name: item.data().name,
            in_stock: item.data().in_stock,
          });
        });

        user = {
          email: result.user.email,
          uid: result.user.uid,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          new_user: true,
          exp: (Date.now() / 1000 + (60 * 60))//หนึ่งชั่วโมง
        }

        const jwt = sign(user, secret)
        res.status(200).send(jwt)

      } else {
        //ผู้ใช้ปัจจุบัน
        console.log("Present");

        user = {
          email: doc.data().email,
          uid: doc.data().uid,
          displayName: doc.data().displayName,
          photoURL: doc.data().photoURL,
          new_user: doc.data().new_user,
          exp: (Date.now() / 1000 + (60 * 60))//หนึ่งชั่วโมง
        }
        console.log(user);

        const jwt = sign(user, secret)
        res.status(200).send(jwt)

      }
    })


  } catch (error) {
    console.log(error)
  }



};

const signin = async (req, res) => {
  const _email = req.body.email;
  const _password = req.body.password;
  ;
  try {
    auth
      .signInWithEmailAndPassword(_email, _password)
      .then(async (result) => {
        result.user.getIdToken();
        let user = {};


        await firestore.collection("users").doc(result.user.uid)
          .get().then((doc) => {
            user = {
              email: doc.data().email,
              uid: doc.data().uid,
              displayName: doc.data().displayName,
              photoURL: doc.data().photoURL,
              exp: (Date.now() / 1000 + (60 * 60))//นี่ไง หนึ่งชั่วโมง
            }

          });
        const jwt = sign(user, secret)
        res.status(200).send(jwt)

      })
      .catch((error) => {
        console.log(error)
        res.status(201).send(error);
      });
  } catch (error) {
    console.log(error);
  }
};

const AuthDetail = (req, res) => {
  const YeeIdo = req.body.Userid;
  console.log("Uid UNee +++ ", YeeIdo)

  const user = firestore.collection("users").doc(YeeIdo);
  user.get().then((doc) => {
    const user = new User(
      (uid = doc.data().uid),
      (firstname = doc.data().firstname),
      (lastname = doc.data().lastname),
      (displayName = doc.data().displayName),
      (photoURL = doc.data().photoURL),
      (email = doc.data().email),
      (role = doc.data().role),
      (provider = doc.data().provider)
      // (localToken = UserToken)
    );
    res.status(200).send(user);
  });

}


const signup = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phone = req.body.phone;
  const photoURL =
    "https://img2.thaipng.com/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg";
  const role = "user";
  const provider = "hotmail";

  try {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        let ujer = {};
        if (result.additionalUserInfo.isNewUser === true) {
          const userRef = firestore.collection("users").doc(result.user.uid);
          const doc = await userRef.get();
          if (!doc.data()) {
            ujer = {
              email: email,
              uid: result.user.uid,
              displayName: firstname,
              photoURL: photoURL,
              new_user: true,
              exp: (Date.now() / 1000 + (60 * 60))
            }
            await userRef
              .set({
                uid: result.user.uid,
                displayName: firstname,
                firstname: firstname,
                lastname: lastname,
                phone: phone,
                photoURL: photoURL,
                email: result.user.email,
                role: role,
                status: true,
                provider: provider,
                new_user: true,
              })
              .then((r) => {
                const jwt = sign(ujer, secret)
                res.status(200).send(jwt)
              })


            let inventory = await firestore.collection("inventorys").get();
            await inventory.docs.forEach(async (item) => {
              await userRef.collection("inventory").doc().set({
                id: item.id,
                name: item.data().name,
                in_stock: item.data().in_stock,
              });
            });
          }
        } else {
          console.log("มีผู้ใช้อยู่แล้ว");
        }
      })
      .catch((err) => {
        // console.log(err);
        // if (err.code === "auth/email-already-in-use") {
        //   setRegisterErr("อีเมลนี้ถูกใช้งานแล้ว");
        // }
      });
  } catch (error) {
    console.error(error);
  }
};

const logout = async (req, res) => {
  await auth.signOut();
  await req.session.destroy();
  console.log("logout", req.session);
  res.status(200).send("logout_success");
};

module.exports = {
  signin,
  logout,
  signup,
  googleLogin,
  AuthDetail
};

import React, { useState, useEffect, useRef, useContext } from "react";
import { Link , Redirect } from "react-router-dom";
import {
  auth,
  firestore,
  googleProvider,
  storage,
} from "../../firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import "../../stylesheet/signin.css";
import { useDispatch, useSelector } from 'react-redux';

const Sign_in = () => {
  const stetus = useSelector(state => state.auth)
  const stotus = stetus.status;
  const [redirect, setredirect] = useState(null)
  const [user, setuser] = useState(null);
  const [loader, setloader] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const userRef = useRef(firestore.collection("users")).current;
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState("");

  const element = <FontAwesomeIcon icon={faGoogle} />;


  const dispatch = useDispatch();

  useEffect(() => {
    const stotus = stetus.status;
    setredirect(stotus)
  })
  const onEmaillogin = (e) => {
    e.preventDefault();
    setloader(true);
    console.log(email);
    console.log(password);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        setloader(false);
      })
      .catch((err) => {
        console.log(err);
        setloader(false);
      });
  };
  const onloginwithgoogle = async () => {
    const result = await auth.signInWithPopup(googleProvider);

    if (result) {
      const userref = firestore.collection("users").doc(result.user.uid);
      userref.get().then((doc) => {
        if (!doc.data()) {
          userref.set({
            uid: result.user.uid,
            displayName: result.user.displayName,
            firstname: "",
            lastname: "",
            phone: "",
            photoURL: result.user.photoURL,
            email: result.user.email,
            role: "user",
            status: true
          }).then((res) => {
            dispatch({
              type: 'SET_LOGIN',
              uid: result.user.uid,
              displayName: result.user.displayName,
              photoURL: result.user.photoURL,
              email: result.user.email,
              role: "user",
              status: true
            });
            console.log("เพิ่มข้อมูลแล้วเน้อ");
          });

        } else {
          dispatch({
            type: 'SET_LOGIN', 
            uid: doc.data().uid,
            displayName: doc.data().displayName,
            photoURL: doc.data().photoURL,
            email: doc.data().email,
            role: doc.data().role,
            status:true
          });
          console.log("มีผู้ใช้นี้แล้ว");

        }
      });
    }
  };

  // const handleChange = (e) => {
  //   if (e.target.files[0]) {
  //     setImage(e.target.files[0]);
  //   }
  // };

  // const handleUpload = () => {
  //   const uploadTask = storage.ref("images/" + user.uid).put(image);
  //   uploadTask.on(
  //     "state_change",
  //     (snapshot) => { },
  //     (error) => {
  //       console.log(error);
  //     },
  //     () => {
  //       storage
  //         .ref("images")
  //         .child(user.uid)
  //         .getDownloadURL()
  //         .then((url) => {
  //           setImgUrl(url);
  //           console.log(url);
  //           firestore.collection("users").doc(user.uid).update({
  //             photoURL: url,
  //           });
  //         });
  //     }
  //   );
  // };

  return (
    <div>
      {!redirect ? (
        <div className="signin">
          <div className="main-form">
            <form>
              <div className="d-flex justify-content-center">
                <h1>
                  ลงชื่อเข้าใช้
                  <hr />
                </h1>
              </div>
              <div className="form-group">
                <label htmlFor="username">อีเมล</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                ></input>
                <div className="valid-feedback">พบชื่อผู้ใช้</div>
              </div>

              <div className="form-group">
                <label htmlFor="password">รหัสผ่าน</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                ></input>
                <div className="invalid-feedback">รหัสผ่านสั้นเกินไป</div>
              </div>


              <div className="">
                <button
                  type="button"
                  className="btn-signin my-3"
                  onClick={onEmaillogin}
                >
                  ลงชื่อเข้าใช้
                  </button>
              </div>

              <div className="">
                <button
                  type="button"
                  onClick={onloginwithgoogle}
                  className="btn-google my-3"
                >
                  <FontAwesomeIcon icon={faGoogle} />
                    &nbsp;&nbsp;ล็อคอินด้วยกูเกิ้ล
                  </button>
              </div>

              <Link to="/signup">สร้างบัญชีผู้ใช้</Link>

            </form>
          </div>
        </div>
      ) : (
        <Redirect to='/'></Redirect>
        )}
    </div>
  );
}
export default Sign_in;

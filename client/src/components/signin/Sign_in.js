import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  auth,
  firestore,
  googleProvider,
} from "../../firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import "../../stylesheet/signin.css";
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios'
 
const Sign_in = () => {
  const stetus = useSelector(state => state.auth)
  // const stotus = stetus.status;
  const [redirect, setredirect] = useState(null)
  // const [user, setuser] = useState(null);
  // const [loader, setloader] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordErr] = useState("");
  const [UserError, setUserErr] = useState("");
  // const userRef = useRef(firestore.collection("users")).current;
  // const [image, setImage] = useState(null);
  // const [imgUrl, setImgUrl] = useState("");

  // const element = <FontAwesomeIcon icon={faGoogle} />;


  const dispatch = useDispatch();

  useEffect(() => {
    const stotus = stetus.status;
    setredirect(stotus)
  }, [stetus])

  function onEmaillogin(e) {

    setEmailError("");
    setPasswordErr("")
    setUserErr("")
    e.preventDefault();

    try {

      Axios.post("http://localhost:3001/auth/login",{
        email,
        password
      }).then((res) => {

        console.log(res);
          dispatch({
              type: 'SET_LOGIN',
              uid: res.data.uid,
              displayName: res.data.displayName,
              photoURL: res.data.photoURL,
              email: res.data.email,
              role: res.data.role,
              provider: "email",
              status: true
            });
      })
      
    } catch (error) {
      alert(error)
    }


  }
  const onloginwithgoogle = async () => {
    const result = await auth.signInWithPopup(googleProvider);
    console.log(result);
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
            provider: "google",
            status: true
          }).then((res) => {
            dispatch({
              type: 'SET_LOGIN',
              uid: result.user.uid,
              displayName: result.user.displayName,
              photoURL: result.user.photoURL,
              email: result.user.email,
              role: "user",
              provider: "google",
              status: true
            });
            // console.log("เพิ่มข้อมูลแล้วเน้อ");
          });

        } else {
          const tokenn = result.credential.idToken;
          Axios.post("http://localhost:3001/auth/session", {tokenn})
          dispatch({
            type: 'SET_LOGIN',
            uid: doc.data().uid,
            displayName: doc.data().displayName,
            photoURL: doc.data().photoURL,
            email: doc.data().email,
            role: doc.data().role,
            provider: "google",
            status: true
          });
          // console.log("มีผู้ใช้นี้แล้ว");

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
              { UserError.length > 0 ?
              <div className="alert alert-danger">{UserError}</div>
              :
                null
              }
              <div className="form-group">
                <label htmlFor="username">อีเมล</label>
                <input
                  type="email"
                  className= {emailError.length > 0 ? "form-control  is-invalid" : "form-control"}
                  name="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
                {emailError.length || UserError.length > 0 ? 
                  <div className="text-danger mt-1">{emailError}</div>
                : 
                  null
                }
                
              </div>

              <div className="form-group">
                <label htmlFor="password">รหัสผ่าน</label>
                <input
                  type="password"
                  className= {passwordError.length || UserError.length > 0 ? "form-control  is-invalid" : "form-control"}
                  name="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
                {passwordError.length > 0 ? 
                  <div className="text-danger mt-1">{passwordError}</div>
                : 
                  null
                }
              </div>

              <div>
                <p>ลืมรหัสผ่าน? <a href="/forgotpassword" >คลิก</a></p>
              </div>

              <div className="">
                <button
                  type="button"
                  className="btn-signin"
                  onClick={onEmaillogin}
                >
                  ลงชื่อเข้าใช้
                  </button>
              </div>

              <div className="text-center mt-1">
                หรือ
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

              <div>
                <p>หากคุณยังไม่มีบัญชีผู้ใช้งาน <a href="/signup"> สร้างบัญชีผู้ใช้</a> </p>
              </div>
              {/* <Link to="">สร้างบัญชีผู้ใช้</Link> */}

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

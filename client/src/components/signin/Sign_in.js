import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { GoogleLogin } from 'react-google-login'
import {
  auth,
  firestore,
  googleProvider,
} from "../../firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import "../../stylesheet/signin.css";
import { useDispatch, useSelector } from 'react-redux';
import { setloginWithEmail, setloginWithGoogle } from '../../redux/action/authAction';
import Axios from 'axios'

const Sign_in = () => {
  const stetus = useSelector(state => state.auth)
  const [redirect, setredirect] = useState(null)
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordErr] = useState("");
  const [UserError, setUserErr] = useState("");



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
      Axios.post("http://localhost:3001/auth/login", {
        email,
        password
      }).then((res) => {
        dispatch(setloginWithEmail(res));
      })
    } catch (error) {
      console.log(error);
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
          });

        } else {
          const tokenn = result.credential.idToken;
          Axios.post("http://localhost:3001/auth/session", { tokenn })

          // console.log(result.user.uid,doc.data().displayName)

          dispatch(setloginWithGoogle(doc, result.user.uid))

          // console.log("มีผู้ใช้นี้แล้ว");

        }
      });
    }
  };

  const handleLogin = async (googleData) => {
    alert("login")
    const res = await fetch("http://localhost:3001/auth/google", {
        method: "POST",
        body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    // store returned user somehow
  }

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
              {UserError.length > 0 ?
                <div className="alert alert-danger">{UserError}</div>
                :
                null
              }
              <div className="form-group">
                <label htmlFor="username">อีเมล</label>
                <input
                  type="email"
                  className={emailError.length > 0 ? "form-control  is-invalid" : "form-control"}
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
                  className={passwordError.length || UserError.length > 0 ? "form-control  is-invalid" : "form-control"}
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

              {/* <div className="">
                <button
                  type="button"
                  onClick={onloginwithgoogle}
                  className="btn-google my-3"
                >
                  <FontAwesomeIcon icon={faGoogle} />
                    &nbsp;&nbsp;ล็อคอินด้วยกูเกิ้ล
                  </button>
              </div> */}

              <GoogleLogin
                className="btn-google my-3"
                clientId="909598832056-fvgpul65lep8ufn3saohneehkaiddhhk.apps.googleusercontent.com"
                buttonText="ลงชื่อเข้าใช้ด้วย Google"
                onSuccess={handleLogin}
                onFailure={handleLogin}
                cookiePolicy={'single_host_origin'}
              />

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

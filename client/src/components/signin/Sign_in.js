import React, { useState, useEffect } from "react";
import { Redirect , useHistory} from "react-router-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { auth, firestore, googleProvider } from "../../firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import "../../stylesheet/signin.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setloginWithEmail,
  setloginWithGoogle,
} from "../../redux/action/authAction";
import Axios from "axios";
import { api } from '../../environment'
const Sign_in = () => {
  const history = useHistory();
  const stetus = useSelector((state) => state.auth);
  const [redirect, setredirect] = useState(null);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordErr] = useState("");
  const [UserError, setUserErr] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const stotus = stetus.status;
    setredirect(stotus);
  }, [stetus]);

  function onEmaillogin(e) {
    setEmailError("");
    setPasswordErr("");
    setUserErr("");
    e.preventDefault();
    
    try {
      Axios.post(api + "/auth/login", {
        email,
        password,
      }).then((res) => {
        if (res.status === 201) {
          if (res.data === "auth/invalid-email") {
            setEmailError("อีเมลไม่ถูกต้อง");
            setUserErr("อีเมลไม่ถูกต้อง");
          } else if (res.data === "auth/wrong-password") {
            setPasswordErr("รหัสผ่านไม่ถูกต้อง");
            setUserErr("รหัสผ่านไม่ถูกต้อง");
          } else if (res.data === "auth/user-not-found") {
            setUserErr("ไม่พบบัญชีผู้ใช้งาน");
          } else if (res.data === "auth/too-many-requests") {
            setUserErr("คุณใส่รหัสผ่านผิดเกิน 3 ครั้ง กรุณารอสักครู่");
          }
        } else if (res.status === 200) {
          history.push("/");
          localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
          // console.log(res)
          // dispatch(setloginWithEmail(res));
        }
      });
    } catch (error) {
      console.log(error);
    }
  }


  const onloginwithgoogle = async () => {
    const result = await auth.signInWithPopup(googleProvider);
    console.log(result);
    const token = result.credential.idToken;
    await Axios.post(api + "/auth/google", { token }).then(
      (res) => {
        dispatch(setloginWithGoogle(res, token));
      }
    );

    // console.log(result);
    // if (result) {
    //   // const userref = firestore.collection("users").doc(result.user.uid);
    //   // userref.get().then((doc) => {

    //   //   if (!doc.data()) {

    //   //       dispatch(setloginWithGoogle(res));
    //   //   } else {
    //   //     const token = result.credential.idToken;
    //   //     Axios.post("http://localhost:3001/auth/google", { token })
    //   //       .then((res) => { dispatch(setloginWithGoogle(res)) })
    //   //   }
    //   // });
    // }
  };

  // const handleLogin = async googleData => {
  //   await console.log("login", googleData.tokenId);
  //   const res = await fetch("http://localhost:3001/auth/google", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       token: googleData.tokenId
  //     }),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //   const data = await res.json()
  //   // store returned user somehow
  // }

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
              {UserError.length > 0 ? (
                <div className="alert alert-danger">{UserError}</div>
              ) : null}
              <div className="form-group">
                <label htmlFor="username">อีเมล</label>
                <input
                  type="email"
                  className={
                    emailError.length || UserError.length > 0
                      ? "form-control  is-invalid"
                      : "form-control"
                  }
                  name="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
                {emailError.length || UserError.length > 0 ? (
                  <div className="text-danger mt-1">{emailError}</div>
                ) : null}
              </div>

              <div className="form-group">
                <label htmlFor="password">รหัสผ่าน</label>
                <input
                  type="password"
                  className={
                    passwordError.length || UserError.length > 0
                      ? "form-control  is-invalid"
                      : "form-control"
                  }
                  name="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
                {passwordError.length > 0 ? (
                  <div className="text-danger mt-1">{passwordError}</div>
                ) : null}
              </div>

              <div>
                <p>
                  ลืมรหัสผ่าน? <a href="/forgotpassword">คลิก</a>
                </p>
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

              <div className="text-center mt-1">หรือ</div>

              <div>
                <button
                  type="button"
                  onClick={onloginwithgoogle}
                  className="btn-google my-3"
                >
                  <FontAwesomeIcon icon={faGoogle} />
                  &nbsp;&nbsp;ล็อคอินด้วยกูเกิ้ล
                </button>
              </div>

              {/* <GoogleLogin
                className="btn-google my-3"
                clientId="909598832056-4e7km1tuqnqp1k8l5mghsk912rsf3j93.apps.googleusercontent.com"
                buttonText="ลงชื่อเข้าใช้ด้วย Google"
                onSuccess={handleLogin}
                // onFailure={}
                cookiePolicy={'single_host_origin'}
                // isSignedIn={false}
              /> */}
              {/* <GoogleLogout
                clientId="909598832056-fvgpul65lep8ufn3saohneehkaiddhhk.apps.googleusercontent.com"
                buttonText="Logout"
                // onLogoutSuccess={alert("logout")}
              >
              </GoogleLogout> */}

              <div>
                <p>
                  หากคุณยังไม่มีบัญชีผู้ใช้งาน{" "}
                  <a href="/signup"> สร้างบัญชีผู้ใช้</a>{" "}
                </p>
              </div>
              {/* <Link to="">สร้างบัญชีผู้ใช้</Link> */}
            </form>
          </div>
        </div>
      ) : (
        <Redirect to="/"></Redirect>
      )}
    </div>
  );
};
export default Sign_in;

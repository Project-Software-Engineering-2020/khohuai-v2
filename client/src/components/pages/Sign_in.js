import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import {
  auth,
  firestore,
  googleProvider,
  storage,
} from "../../firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import "../../stylesheet/signin.css";
import { useDispatch } from 'react-redux';

const Sign_in = () => {
  const [user, setuser] = useState(null);
  const [loader, setloader] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const userRef = useRef(firestore.collection("users")).current;
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState("");

  const element = <FontAwesomeIcon icon={faGoogle} />;


  const dispatch = useDispatch();

  // setloader(false);
  // useEffect(() => {
    
    
    // const fetchData = () => {setuser(dispatch({ type: 'GET_STATUS_LOGIN' }));
    // fetchData();
  
    // const authUnsubscribe = auth.onAuthStateChanged((user) => {
    //   setloader(true);
    //   if (!!user) {
    //     userRef.doc(user.uid).onSnapshot((doc) => {
    //       if (doc.data()) {
    //         const userdata = {
    //           uid: doc.data().uid,
    //           displayName: doc.data().displayName,
    //           photoURL: doc.data().photoURL,
    //           email: doc.data().email,
    //           role: doc.data().role,
    //         };
    //         setuser(userdata);
    //         setloader(false);
    //       }
    //     });
    //   } else {
    //     setuser(null);
    //   }
    // });
    // return () => {
    //   authUnsubscribe();
    // };
  // }, []);

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
          }).then((res) => { 
             console.log("เพิ่มข้อมูลแล้วเน้อ");
          });
         
        } else {
          dispatch({
            type:'SET_LOGIN', payload: doc.data()
          });
          console.log("มีผู้ใช้นี้แล้ว");

        }
      });
    }
  };
  const signouthandle = () => {
    auth
      .signOut()
      .then(() => {
        // dispatch({type:'SET_LOGOUT'});
        console.log("Logout OK");
      })
      .catch((err) => {
        console.log("Logout Not work" + err);
      });
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref("images/" + user.uid).put(image);
    uploadTask.on(
      "state_change",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(user.uid)
          .getDownloadURL()
          .then((url) => {
            setImgUrl(url);
            console.log(url);
            firestore.collection("users").doc(user.uid).update({
              photoURL: url,
            });
          });
      }
    );
  };

  return (
    <div>
      {!user ? (
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
                  className="form-control is-valid"
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
                  className="form-control is-invalid"
                  name="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                ></input>
                <div className="invalid-feedback">รหัสผ่านสั้นเกินไป</div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <button
                    type="button"
                    className="btn-signin my-3"
                    onClick={onEmaillogin}
                  >
                    ลงชื่อเข้าใช้
                  </button>
                </div>

                <div className="col-md-6">
                  <button
                    type="button"
                    onClick={onloginwithgoogle}
                    className="btn-google my-3"
                  >
                    <FontAwesomeIcon icon={faGoogle} />
                    &nbsp;&nbsp;ล็อคอินด้วยกูเกิ้ล
                  </button>
                </div>
              
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="col-4 mx-auto card">
          <div className="card-body">
            <div>name:{user.firstname}</div>
            <div>email:{user.email}</div>
            <img src={user.photoURL} width="100" height="100"></img>
            <div>
              <p>เปลี่ยนรูปโปรไฟล์</p>
              <input type="file" onChange={handleChange} />
              <button onClick={handleUpload}>Upload</button>
            </div>
            <div>
              <button onClick={signouthandle}>Logout</button>
            </div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Sign_in;

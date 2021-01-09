import React, { useState, useEffect , useRef} from 'react';
import { Link } from 'react-router-dom';
import { auth, firestore, googleProvider } from '../../firebase/firebase'
import Axios from 'axios';


function Sign_in() {
    const [user, setuser] = useState(null);
    const [loader, setloader] = useState(false);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const userRef = useRef(firestore.collection("users")).current;
    // setloader(false);
    useEffect(() => {
        const authUnsubscribe = auth.onAuthStateChanged((user) => {
            setloader(true); 
            if(!!user){
                userRef.doc(user.uid).onSnapshot((doc)=> {
                    if(doc.data()) {
                        const userdata = {
                            uid: doc.data().uid,
                            displayName: doc.data().displayName,
                            photoURL: doc.data().photoURL,
                            email: doc.data().email,
                            role: doc.data().role,
                        };
                        setuser(userdata);
                        setloader(false);
                    }
                })
            }
            else{
                setuser(null);
            }  
        })
        return () => {
            authUnsubscribe();
        }
    }, [user])
    const onEmaillogin = (e) => {
        e.preventDefault();
        setloader(true);
        console.log(email)
        console.log(password)
        auth.signInWithEmailAndPassword(email,password).then(res => {
            setloader(false);
            // console.log("Login แล้ว")
        })
    .catch(err => {
        console.log(err)
        setloader(false)
    })

    }
    const onloginwithgoogle = async () => {
        const result = await auth.signInWithPopup(googleProvider);
        // console.log(result.user);
        if (result) {
            const userref = firestore.collection("users").
                doc(result.user.uid);
            userref.get().then((doc) => {
                console.log(doc.data());
                if (!doc.data()) {
                    userref.set({
                        uid: result.user.uid,
                        displayName: result.user.displayName,
                        photoURL: result.user.photoURL,
                        email: result.user.email,
                        role: "user",
                    })
                    console.log("เพิ่มข้อมูแล้วเน้อ")
                }
                else {
                    console.log("มีผู้ใช้นี้แล้ว")
                }
            })
        }
    };
    const signouthandle = () => {
        auth.signOut().then(() => {
            console.log("Logout OK");
        })
            .catch((err) => {
                console.log("Logout Not work" + err)
            })
    }

    return (
        <div>
            {!user ? (
                <div className="col-4 mx-auto card">
                    <div className="card-body">
                        <form>
                            <h3>Login Form</h3>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input 
                                    type="email" 
                                    className="form-control is-valid" 
                                    name="email"
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)}
                                >   
                                </input>
                                <div className="valid-feedback">พบชื่อผู้ใช้</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input 
                                type="password" 
                                className="form-control is-invalid" 
                                name="password"
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                                >
                                </input>
                                <div className="invalid-feedback">รหัสผ่านสั้นเกินไป</div>
                            </div>
                            <button type="button" className="btn btn-success" onClick={onEmaillogin}>Login</button>
                        </form>
                    </div>
                    <div>
                        <button onClick={onloginwithgoogle}>Google Login</button>
                    </div>
                </div>
            ) : (
                    <div className="col-4 mx-auto card">
                        <div className="card-body">
                            <div>name:{user.firstname}</div>
                            <div>email:{user.email}</div>
                            <img src={user.photoURL}></img>
                            <div>
                                <button onClick={signouthandle}>Logout</button>
                            </div>
                            <div></div>
                        </div>
                    </div>
            )
            }
                    </div>
                )
            }
{console.log("ไอชล")}
export default Sign_in;
import React, { useState, useEffect, useRef, useContext } from "react";
import { Redirect } from "react-router-dom";
import { auth } from "../../firebase/firebase";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGoogle } from "@fortawesome/free-brands-svg-icons";
// import "../../stylesheet/signin.css";
// import * as firebase from 'firebase';
import { useSelector } from 'react-redux';
// import { Alert } from "bootstrap";

const Updatepassword = () => {
    // const stotus = stetus.status;
    const stetus = useSelector(state => state.auth)
    const [redirect, setredirect] = useState(stetus.status)
    // const [user, setuser] = useState(null)
    // const [email, setemail] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")
    // const [currentpassword, setcurrentpassword] = useState("")
    const [password, setpassword] = useState("")
    const [loading, setloading] = useState(false)
    // const [email, setemail] = useState("")


    const [passwordErr, setPasswordErr] = useState({});
    const [confirmpasswordErr, setConfirmpasswordErr] = useState({});
    const [isvalid, setvalid] = useState(true);
    const ujer = auth.currentUser;
    // var uder = firebase.auth().currentUser;const formValidation = () => {
    useEffect(() => {
        const stotus = stetus.status;
        setredirect(stotus)
        setTimeout(() => {
            setloading(true)
        }, 500)
    }, [stetus.status])

    const formValidation = async () => {

        const passwordErr = {};
        const confirmpasswordErr = {};
        let isValid = true;

        if (!password) {
            passwordErr.noPassword = "กรุณากรอกรหัสผ่าน";
            isValid = false;
        } else if (typeof password !== "undefined") {
            var passpattern = new RegExp(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*\s)(?=.{8,})/i
            );
            if (!passpattern.test(password)) {
                passwordErr.incorrectPattern =
                    "รหัสผ่านต้องยาวอย่างน้อย 8 ตัวอักษร ประกอบไปด้วยตัวพิมพ์ใหญ่ พิมพ์เล็ก ตัวเลข และอักษรพิเศษอย่างน้อย1ตัว";
                isValid = false;
            }
        }

        if (!confirmpassword) {
            confirmpasswordErr.noConfirmpassword = "กรุณายืนยันรหัสผ่าน";
            isValid = false;
        } else if (
            typeof password !== "undefined" &&
            typeof confirmpassword !== "undefined"
        ) {
            if (password != confirmpassword) {
                confirmpasswordErr.dontMatch = "รหัสผ่านไม่ตรงกันกรุณากรอกใหม่อีกครั้ง";
                isValid = false;
            }
        }

        await setPasswordErr(passwordErr);
        await setConfirmpasswordErr(confirmpasswordErr);
        await setvalid(isValid);
        return isValid;
    };

    const validatePassword = (value) => {
        const password = value;
        const passwordErr = {};
        if (!password) {
            passwordErr.noPassword = "กรุณากรอกรหัสผ่าน";
        }
        else if (typeof password !== "undefined") {
            var passpattern = new RegExp(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*\s)(?=.{8,})/i
            );
            if (!passpattern.test(password)) {
                passwordErr.incorrectPattern =
                    "รหัสผ่านต้องยาวอย่างน้อย 8 ตัวอักษร ประกอบไปด้วยตัวพิมพ์ใหญ่ พิมพ์เล็ก ตัวเลข และอักษรพิเศษอย่างน้อย1ตัว";
            }
        }
        setPasswordErr(passwordErr);

    }

    const validateConfirmPassword = (value) => {
        const confirmpassword = value
        const confirmpasswordErr = {};

        if (!confirmpassword) {
            confirmpasswordErr.noConfirmpassword = "กรุณายืนยันรหัสผ่าน";
        }
        else if (
            typeof password !== "undefined" &&
            typeof confirmpassword !== "undefined"
        ) {
            if (password != confirmpassword) {
                confirmpasswordErr.dontMatch = "รหัสผ่านไม่ตรงกัน กรุณากรอกใหม่อีกครั้ง";
            }
        }

        setConfirmpasswordErr(confirmpasswordErr);
    }
    const Reauthen = (currentpassword) => {
        // console.log(ujer.email)
        // setemail(ujer.email)
        // console.log(currentpassword)
        const cred = auth.EmailAuthProvider.credential("chon26910@hotmail.com", "Chon26911");
        return ujer.reauthenticateWithCredential(cred);
    }


    const Wantchangepassword = async (e) => {
        // console.log(user2.email)
        const checkvalid = await formValidation();
        // setcurrentpassword("Chon26911");
        // Reauthen(currentpassword).then((res) => {
        // console.log(res);
        if (checkvalid == true) {
            const user2 = auth.currentUser;
            user2.updatePassword(password).then(() => {
                console.log("Change Laew")
                setredirect(false);
            })
                .catch((err) => {
                    // console.log("Err Na")
                })
        }
        else {
            // console.log("ใส่รหัสไม่ถูกนะ")
        }
        // })
        // .catch((err) => {
        //     console.log("Err น๊ะ :" + err);
        // })
    }
    return (
        <div>
            {redirect ? (
                <div className="container mt-auto col-xl-4 col-md-6  col-sm-12">

                    {loading ? (
                        <div className="update-password-page m-sm-5 m-2">
                            <div className="head-change-password">เปลี่ยนรหัสผ่านใหม่</div>
                            <div className="form-group">
                                <label htmlFor="password">รหัสผ่านใหม่</label>
                                <input
                                    type="password"
                                    id="exampleInputPassword1"
                                    placeholder="กรอกรหัสผ่าน"
                                    className={
                                        passwordErr.incorrectPattern || passwordErr.noPassword ?
                                            "form-control is-invalid"
                                            :
                                            "form-control"}
                                    onChange={(e) => {
                                        setpassword(e.target.value);
                                        validatePassword(e.target.value);
                                    }}
                                >
                                </input>
                                {Object.keys(passwordErr).map((key) => {
                                    return <div className="text-danger">{passwordErr[key]}</div>;
                                })}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">ยืนยันรหัสผ่าน</label>
                                <input
                                    type="password"
                                    id="exampleInputPassword1"
                                    placeholder="กรอกรหัสผ่านอีกครั้ง"
                                    className={
                                        confirmpasswordErr.dontMatch || confirmpasswordErr.noConfirmpassword ?
                                            "form-control is-invalid"
                                            :
                                            "form-control"}
                                    onChange={(e) => {
                                        setconfirmpassword(e.target.value);
                                        validateConfirmPassword(e.target.value);
                                    }}
                                >
                                </input>
                                {Object.keys(confirmpasswordErr).map((key) => {
                                    return <div className="text-danger">{confirmpasswordErr[key]}</div>;
                                })}
                            </div>
                            <button type="button" className="button-change-password" onClick={Wantchangepassword}>ยืนยัน</button>
                        </div>
                    ) : (
                            <div className="loader">Loading...</div>
                        )}
                </div>
            ) : (
                    <Redirect to="/me"></Redirect>
                )}
        </div>




    )
}
export default Updatepassword;
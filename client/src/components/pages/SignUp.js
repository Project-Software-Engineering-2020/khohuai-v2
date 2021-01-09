import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../stylesheet/signup.css";
import { auth, firestore, googleProvider } from "../../firebase/firebase";

const SignUp = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [phone, setPhone] = useState("");

  // ส่วน Error
  const [firstnameErr, setFirstnameErr] = useState({});
  const [lastnameErr, setLastnameErr] = useState({});
  const [emailErr, setEmailErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [confirmpasswordErr, setConfirmpasswordErr] = useState({});
  const [phoneErr, setPhoneErr] = useState({});

  const formValidation = () => {
    const firstnameErr = {};
    const lastnameErr = {};
    const emailErr = {};
    const passwordErr = {};
    const confirmpasswordErr = {};
    const phoneErr = {};
    let isValid = true;

    if (!firstname) {
      firstnameErr.noFirstname = "กรุณากรอกชื่อ";
      isValid = false;
    }

    if (!lastname) {
      lastnameErr.noLastname = "กรุณากรอกนามสกุล";
      isValid = false;
    }

    if (!phone) {
      phoneErr.noPhone = "กรุณากรอกเบอร์โทรศัพท์";
      isValid = false;
    } else if (typeof phone !== "undefined") {
      var phonepattern = new RegExp(/^(?=.*[0-9])/i);
      if (!phonepattern.test(phone)) {
        phoneErr.inputnumber = "กรุณากรอกเป็นตัวเลข";
        isValid = false;
      } else if (phone.length != 10) {
        phoneErr.tennumber = "กรุณากรอกหมายเลขโทรศัพท์ 10 หลัก";
        isValid = false;
      }
    }

    if (!email) {
      emailErr.noEmail = "กรุณากรอกอีเมล";
      isValid = false;
    } else if (typeof email !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        emailErr.invalidEmail = "กรุณากรอก invalid email";
        isValid = false;
      }
    }

    if (!password) {
      passwordErr.noPassword = "กรุณากรอกรหัสผ่าน";
      isValid = false;
    } else if (typeof password !== "undefined") {
      var passpattern = new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*\s)(?=.{8,})/i
      );
      if (!passpattern.test(password)) {
        passwordErr.incorrectPattern =
          "รหัสผ่านต้องยาวอย่างน้อย8ตัวอักษร ประกอบไปด้วยตัวพิมพ์ใหญ่ พิมพ์เล็ก ตัวเลข และอักษรพิเศษอย่างน้อย1ตัว";
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

    setFirstnameErr(firstnameErr);
    setLastnameErr(lastnameErr);
    setEmailErr(emailErr);
    setPasswordErr(passwordErr);
    setConfirmpasswordErr(confirmpasswordErr);
    setPhoneErr(phoneErr);
  };

  const [loading, setloading] = useState(false);

  const onEmailSignUpSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        console.log("ลงทะเบียนเรียบร้อยแล้ว");
        if (!!result) {
          {
            const userRef = firestore.collection("users").doc(result.user.uid);
            const doc = await userRef.get();
            if (!doc.data()) {
              await userRef.set({
                uid: result.user.uid,
                displayName: "",
                firstname: firstname,
                lastname: lastname,
                phone: phone,
                photoURL: "logo.jvg",
                email: result.user.email,
                role: "user",
              });
            }
          }
        }
      })
      .catch((err) => {
        console.log("Register ไม่ผ่าน");
      });
  };

  useEffect(() => {
    setloading(false);
    setTimeout(() => {
      setloading(true);
    }, 2000);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="signup">
          <form className="main-form">
            <div className="d-flex justify-content-center">
              <h1>
                สมัครสมาชิก
                <hr />
              </h1>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="name">ชื่อ:</label>
                  <input
                    type="text"
                    name="name"
                    value={firstname}
                    onChange={(e) => {
                      setFirstname(e.target.value);
                    }}
                    className="form-control"
                    placeholder="ระบุชื่อ"
                    id="name"
                  />

                  {Object.keys(firstnameErr).map((key) => {
                    return (
                      <div className="text-danger">{firstnameErr[key]}</div>
                    );
                  })}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="lastname">นามสกุล:</label>
                  <input
                    type="text"
                    name="lastname"
                    value={lastname}
                    onChange={(e) => {
                      setLastname(e.target.value);
                    }}
                    className="form-control"
                    placeholder="ระบุนามสกุล"
                    id="lastname"
                  />

                  {Object.keys(lastnameErr).map((key) => {
                    return (
                      <div className="text-danger">{lastnameErr[key]}</div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">เบอร์โทรศัพท์:</label>
              <input
                type="numeric"
                name="phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                className="form-control"
                placeholder="ระบุเบอร์โทรศัพท์"
                id="phone"
              />

              {Object.keys(phoneErr).map((key) => {
                return <div className="text-danger">{phoneErr[key]}</div>;
              })}
            </div>

            <div className="form-group">
              <label htmlFor="email">อีเมล:</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="form-control"
                placeholder="ระบุอีเมล"
                id="email"
              />

              {Object.keys(emailErr).map((key) => {
                return <div className="text-danger">{emailErr[key]}</div>;
              })}
            </div>

            <div className="form-group">
              <label htmlFor="password">รหัสผ่าน:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="form-control"
                placeholder="ระบุรหัสผ่าน"
                id="password"
              />

              {Object.keys(passwordErr).map((key) => {
                return <div className="text-danger">{passwordErr[key]}</div>;
              })}
            </div>

            <div className="form-group">
              <label htmlFor="password">ยืนยันรหัสผ่าน:</label>
              <input
                type="password"
                name="confirm_password"
                value={confirmpassword}
                onChange={(e) => {
                  setConfirmpassword(e.target.value);
                }}
                className="form-control"
                placeholder="ยืนยันรหัสผ่าน"
                id="confirm_password"
              />

              {Object.keys(confirmpasswordErr).map((key) => {
                return (
                  <div className="text-danger">{confirmpasswordErr[key]}</div>
                );
              })}
            </div>

            <div className="d-flex justify-content-center">
              <input
                type="submit"
                value="สมัครสมาชิก"
                className="btn-signup mt-3"
                onClick={onEmailSignUpSubmit}
              />
            </div>
          </form>
        </div>
      ) : (
        //loading
        <div className="loader">Loading...</div>
      )}
    </div>
  );
};

export default SignUp;

import React, { useState, useEffect ,useRef} from "react";
import { Link } from "react-router-dom";
import "../../stylesheet/signup.css";
import { auth, firestore, googleProvider } from '../../firebase/firebase'

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
    auth.createUserWithEmailAndPassword(email,password)
    .then(async (result) => {
      console.log("ลงทะเบียนเรียบร้อยแล้ว");
      if(!!result){{
        const userRef = firestore.collection("users").doc(result.user.uid);
        const doc = await userRef.get();
        if(!doc.data()) {
          await userRef.set({
            uid: result.user.uid,
            displayName:"",
            firstname:firstname,
            lastname:lastname,
            phone:phone,
            photoURL:"logo.jvg",
            email:result.user.email,
            role:"user",
          });
        }
      }
    }
    })
  .catch((err) => {
    console.log("Register ไม่ผ่าน")
  })
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
          <div className="col-md-4 col-sm-8 mx-auto card">
            <div className="card-body">
              <div className="d-flex justify-content-center">
                <h1>สมัครสมาชิก</h1>
              </div>
              <form>
                <div className="row mt-2">
                  <div className="form-group col-md-6">
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

                  <div className="form-group col-md-6">
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

                <div className="row">
                  <div className="form-group col-md-7">
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
                </div>

                <div className="row">
                  <div className="form-group col-md-7">
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
                </div>

                <div className="row">
                  <div className="form-group col-md-6">
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
                      return (
                        <div className="text-danger">{passwordErr[key]}</div>
                      );
                    })}
                  </div>
                  <div className="form-group col-md-6">
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
                        <div className="text-danger">
                          {confirmpasswordErr[key]}
                        </div>
                      );
                    })}
                  </div>
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
          </div>
        </div>
      ) : (
        //loading
        <div className="loader">Loading...</div>
      )}
    </div>
  );
};

export default SignUp;
// class SignUp extends Component {
//   constructor() {
//     super();
//     this.state = {
//       input: {},
//       errors: {},
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     let input = this.state.input;
//     input[event.target.name] = event.target.value;

//     this.setState({
//       input,
//     });
//   }

//   handleSubmit(event) {
//     event.preventDefault();

//     if (this.validate()) {
//       console.log(this.state);

//       let input = {};
//       input["name"] = "";
//       input["surname"] = "";
//       input["email"] = "";
//       input["phone"] = "";
//       input["password"] = "";
//       input["confirm_password"] = "";
//       this.setState({ input: input });

//       alert("Demo Form is submited");
//     }
//   }

//   validate() {
//     let input = this.state.input;
//     let errors = {};
//     let isValid = true;

//     if (!input["name"]) {
//       isValid = false;
//       errors["name"] = "กรุณากรอกชื่อ";
//     }

//     if (!input["surname"]) {
//       isValid = false;
//       errors["surname"] = "กรุณากรอกนามสกุล";
//     }

//     if (!input["email"]) {
//       isValid = false;
//       errors["email"] = "กรุณากรอกที่อยู่อีเมล";
//     }

//     if (typeof input["email"] !== "undefined") {
//       var pattern = new RegExp(
//         /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
//       );
//       if (!pattern.test(input["email"])) {
//         isValid = false;
//         errors["email"] = "Please enter valid email address.";
//       }
//     }

//     if (!input["phone"]) {
//       isValid = false;
//       errors["phone"] = "กรุณากรอกเบอร์โทรศัพท์";
//     }

//     if (typeof input["phone"] !== "undefined") {
//       var phonepattern = new RegExp(/^(?=.*[0-9])/i);
//       if (!phonepattern.test(input["phone"])) {
//         isValid = false;
//         errors["phone"] = "กรุณากรอกเป็นตัวเลข";
//       } else if (input["phone"].length != 10) {
//         isValid = false;
//         errors["phone"] = "กรุณากรอกหมายเลขโทรศัพท์ 10 หลัก";
//       }
//     }

//     if (!input["password"]) {
//       isValid = false;
//       errors["password"] = "กรุณากรอกรหัสผ่าน";
//     }

//     if (typeof input["password"] !== "undefined") {
//       var passpattern = new RegExp(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*\s)(?=.{8,})/i
//       );
//       if (!passpattern.test(input["password"])) {
//         isValid = false;
//         errors["password"] =
//           "รหัสผ่านต้องยาวอย่างน้อย8ตัวอักษร ประกอบไปด้วยตัวพิมพ์ใหญ่ พิมพ์เล็ก ตัวเลข และอักษรพิเศษอย่างน้อย1ตัว";
//       }
//     }

//     if (!input["confirm_password"]) {
//       isValid = false;
//       errors["confirm_password"] = "กรุณายืนยันรหัสผ่าน";
//     }

//     if (
//       typeof input["password"] !== "undefined" &&
//       typeof input["confirm_password"] !== "undefined"
//     ) {
//       if (input["password"] != input["confirm_password"]) {
//         isValid = false;
//         errors["password"] = "รหัสผ่านไม่ตรงกันกรุณากรอกใหม่อีกครั้ง";
//       }
//     }

//     this.setState({
//       errors: errors,
//     });

//     return isValid;
//   }

//   render() {
//     return (
//       <div className="signup">
//         <div className="col-md-4 col-sm-8 mx-auto card">
//           <div className="card-body">
//             <div className="d-flex justify-content-center">
//               <h1>สมัครสมาชิก</h1>
//             </div>
//             <form onSubmit={this.handleSubmit}>
//               <div className="row mt-2">
//                 <div className="form-group col-md-6">
//                   <label htmlFor="name">ชื่อ:</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={this.state.input.name}
//                     onChange={this.handleChange}
//                     className="form-control"
//                     placeholder="ระบุชื่อ"
//                     id="name"
//                   />

//                   <div className="text-danger">{this.state.errors.name}</div>
//                 </div>

//                 <div className="form-group col-md-6">
//                   <label htmlFor="surname">นามสกุล:</label>
//                   <input
//                     type="text"
//                     name="surname"
//                     value={this.state.input.surname}
//                     onChange={this.handleChange}
//                     className="form-control"
//                     placeholder="ระบุนามสกุล"
//                     id="surname"
//                   />

//                   <div className="text-danger">{this.state.errors.surname}</div>
//                 </div>
//               </div>

//               <div className="row">
//                 <div className="form-group col-md-7">
//                   <label htmlFor="email">อีเมล:</label>
//                   <input
//                     type="text"
//                     name="email"
//                     value={this.state.input.email}
//                     onChange={this.handleChange}
//                     className="form-control"
//                     placeholder="ระบุอีเมล"
//                     id="email"
//                   />

//                   <div className="text-danger">{this.state.errors.email}</div>
//                 </div>
//               </div>

//               <div className="row">
//                 <div className="form-group col-md-6">
//                   <label htmlFor="password">รหัสผ่าน:</label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={this.state.input.password}
//                     onChange={this.handleChange}
//                     className="form-control"
//                     placeholder="ระบุรหัสผ่าน"
//                     id="password"
//                   />

//                   <div className="text-danger">
//                     {this.state.errors.password}
//                   </div>
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label htmlFor="password">ยืนยันรหัสผ่าน:</label>
//                   <input
//                     type="password"
//                     name="confirm_password"
//                     value={this.state.input.confirm_password}
//                     onChange={this.handleChange}
//                     className="form-control"
//                     placeholder="ยืนยันรหัสผ่าน"
//                     id="confirm_password"
//                   />

//                   <div className="text-danger">
//                     {this.state.errors.confirm_password}
//                   </div>
//                 </div>
//               </div>

//               <div className="row">
//                 <div className="form-group col-md-7">
//                   <label htmlFor="phone">เบอร์โทรศัพท์:</label>
//                   <input
//                     type="numeric"
//                     name="phone"
//                     value={this.state.input.phone}
//                     onChange={this.handleChange}
//                     className="form-control"
//                     placeholder="ระบุเบอร์โทรศัพท์"
//                     id="phone"
//                   />

//                   <div className="text-danger">{this.state.errors.phone}</div>
//                 </div>
//               </div>

//               <div className="d-flex justify-content-center">
//                 <input
//                   type="submit"
//                   value="สมัครสมาชิก"
//                   className="btn-signup mt-3"
//                 />
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default SignUp;

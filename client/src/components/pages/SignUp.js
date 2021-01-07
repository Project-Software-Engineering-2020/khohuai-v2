import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../stylesheet/signup.css";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      input: {},
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      console.log(this.state);

      let input = {};
      input["name"] = "";
      input["surname"] = "";
      input["email"] = "";
      input["phone"] = "";
      input["password"] = "";
      input["confirm_password"] = "";
      this.setState({ input: input });

      alert("Demo Form is submited");
    }
  }

  validate() {
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    if (!input["name"]) {
      isValid = false;
      errors["name"] = "กรุณากรอกชื่อ";
    }

    if (!input["surname"]) {
      isValid = false;
      errors["surname"] = "กรุณากรอกนามสกุล";
    }

    if (!input["email"]) {
      isValid = false;
      errors["email"] = "กรุณากรอกที่อยู่อีเมล";
    }

    if (typeof input["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(input["email"])) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }

    if (!input["phone"]) {
      isValid = false;
      errors["phone"] = "กรุณากรอกเบอร์โทรศัพท์";
    }

    if (typeof input["phone"] !== "undefined") {
      var phonepattern = new RegExp(/^(?=.*[0-9])/i);
      if (!phonepattern.test(input["phone"])) {
        isValid = false;
        errors["phone"] = "กรุณากรอกเป็นตัวเลข";
      } else if (input["phone"].length != 10) {
        isValid = false;
        errors["phone"] = "กรุณากรอกหมายเลขโทรศัพท์ 10 หลัก";
      }
    }

    if (!input["password"]) {
      isValid = false;
      errors["password"] = "กรุณากรอกรหัสผ่าน";
    }

    if (typeof input["password"] !== "undefined") {
      var passpattern = new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*\s)(?=.{8,})/i
      );
      if (!passpattern.test(input["password"])) {
        isValid = false;
        errors["password"] =
          "รหัสผ่านต้องยาวอย่างน้อย8ตัวอักษร ประกอบไปด้วยตัวพิมพ์ใหญ่ พิมพ์เล็ก ตัวเลข และอักษรพิเศษอย่างน้อย1ตัว";
      }
    }

    if (!input["confirm_password"]) {
      isValid = false;
      errors["confirm_password"] = "กรุณายืนยันรหัสผ่าน";
    }

    if (
      typeof input["password"] !== "undefined" &&
      typeof input["confirm_password"] !== "undefined"
    ) {
      if (input["password"] != input["confirm_password"]) {
        isValid = false;
        errors["password"] = "รหัสผ่านไม่ตรงกันกรุณากรอกใหม่อีกครั้ง";
      }
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  }

  render() {
    return (
      <div className="signup">
        <div className="col-md-4 col-sm-8 mx-auto card">
          <div className="card-body">
            <div class="d-flex justify-content-center">
              <h1>สมัครสมาชิก</h1>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div class="row mt-2">
                <div class="form-group col-md-6">
                  <label for="name">ชื่อ:</label>
                  <input
                    type="text"
                    name="name"
                    value={this.state.input.name}
                    onChange={this.handleChange}
                    class="form-control"
                    placeholder="ระบุชื่อ"
                    id="name"
                  />

                  <div className="text-danger">{this.state.errors.name}</div>
                </div>

                <div class="form-group col-md-6">
                  <label for="surname">นามสกุล:</label>
                  <input
                    type="text"
                    name="surname"
                    value={this.state.input.surname}
                    onChange={this.handleChange}
                    class="form-control"
                    placeholder="ระบุนามสกุล"
                    id="surname"
                  />

                  <div className="text-danger">{this.state.errors.surname}</div>
                </div>
              </div>

              <div class="row">
                <div class="form-group col-md-7">
                  <label for="email">อีเมล:</label>
                  <input
                    type="text"
                    name="email"
                    value={this.state.input.email}
                    onChange={this.handleChange}
                    class="form-control"
                    placeholder="ระบุอีเมล"
                    id="email"
                  />

                  <div className="text-danger">{this.state.errors.email}</div>
                </div>
              </div>

              <div class="row">
                <div class="form-group col-md-6">
                  <label for="password">รหัสผ่าน:</label>
                  <input
                    type="password"
                    name="password"
                    value={this.state.input.password}
                    onChange={this.handleChange}
                    class="form-control"
                    placeholder="ระบุรหัสผ่าน"
                    id="password"
                  />

                  <div className="text-danger">
                    {this.state.errors.password}
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label for="password">ยืนยันรหัสผ่าน:</label>
                  <input
                    type="password"
                    name="confirm_password"
                    value={this.state.input.confirm_password}
                    onChange={this.handleChange}
                    class="form-control"
                    placeholder="ยืนยันรหัสผ่าน"
                    id="confirm_password"
                  />

                  <div className="text-danger">
                    {this.state.errors.confirm_password}
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="form-group col-md-7">
                  <label for="phone">เบอร์โทรศัพท์:</label>
                  <input
                    type="numeric"
                    name="phone"
                    value={this.state.input.phone}
                    onChange={this.handleChange}
                    class="form-control"
                    placeholder="ระบุเบอร์โทรศัพท์"
                    id="phone"
                  />

                  <div className="text-danger">{this.state.errors.phone}</div>
                </div>
              </div>

              <div class="row">
                <div class="form-group col-md-3">
                  <label for="inputDay">เกิดวันที่</label>
                  <select id="day" class="form-control">
                    <option selected>วัน</option>
                    <option>...</option>
                  </select>
                </div>

                <div class="form-group col-md-5">
                  <label for="inputMonth">เดือน</label>
                  <select id="month" class="form-control">
                    <option selected>เดือน</option>
                    <option>...</option>
                  </select>
                </div>

                <div class="form-group col-md-4">
                  <label for="inputYear">ปี</label>
                  <select id="year" class="form-control">
                    <option selected>ปี</option>
                    <option>...</option>
                  </select>
                </div>
              </div>

              <div class="d-flex justify-content-center">
                <input
                  type="submit"
                  value="สมัครสมาชิก"
                  class="btn-signup mt-3"
                />
              </div>
              <div class="d-flex justify-content-center">
                <input
                  type="submit"
                  value="สมัครสมาชิก"
                  class="btn-signup mt-3"
                />
              </div>
              <div class="d-flex justify-content-center">
                <input
                  type="submit"
                  value="สมัครสมาชิก"
                  class="btn-signup mt-3"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;

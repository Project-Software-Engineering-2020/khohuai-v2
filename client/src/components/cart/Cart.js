import React from "react";
import "./cart.css";
import AddDel from "./AddDel";

const Cart = () => {
  return (
    <div className="container cart">
      <div className="row">
        <div className="col-md-8 mt-4">
          <div class="card-header all">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                เลือกทั้งหมด
              </label>
            </div>
          </div>

          {/* รายละเอียดหวย */}
          <div class="card-header lotto mt-3">
            <div className="row">
              <div className="col-md-4">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                  />
                  <label class="form-check-label" for="defaultCheck1">
                    lotto pic
                  </label>
                </div>
              </div>

              <div className="col-md-8">
                <h1>
                  1&nbsp;&nbsp;2&nbsp;&nbsp;3&nbsp;&nbsp;4&nbsp;&nbsp;5&nbsp;&nbsp;6
                </h1>
                <h5>งวดประจำวันที่ 1 กุมภาพันธ์ 2563</h5>
                <AddDel /> คงเหลือจำนวน 2 ใบ
              </div>
            </div>
          </div>
        </div>

        {/* สรุปรายการสั่งซื้อ */}
        <div className="col-md-4 mt-4">
          <div class="card cartSum">
            <div class="card-body">
              <h5 class="card-title">สรุปรายการสั่งซื้อ</h5>

              {/* จำนวน */}
              <div className="row">
                <div className="col-md-6">
                  <p class="text-left">จำนวน</p>
                </div>
                <div className="col-md-6">
                  <p class="text-right">2 ใบ</p>
                </div>

                {/* ยอดรวม */}
                <div className="col-md-6">
                  <p class="text-left">ยอดรวม</p>
                </div>
                <div className="col-md-6">
                  <p class="text-right">160 บาท</p>
                </div>

                {/* โค้ดลด */}
                <div className="col-md-6">
                  <p class="text-left">โค้ดส่วนลด</p>
                </div>

                <div className="col-md-6">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">
                      โค้ด
                    </label>
                    <select class="custom-select" id="inputGroupSelect01">
                      <option selected>Choose...</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>

                {/* ยอดรวมทั้งสิ้น */}
                <div className="col-md-6 mt-3">
                  <h5 class="text-left">ยอดรวมทั้งสิ้น</h5>
                </div>
                <div className="col-md-6 mt-3">
                  <h5 class="text-right">160 บาท</h5>
                </div>
              </div>

              <button type="button" class="btn btn-primary btn-block mt-2">
                ดำเนินการชำระเงิน
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

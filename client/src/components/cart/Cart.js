import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import "./cart.css";
import CartItem from "./Cartitem";

const Cart = () => {
  const myCart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  // const [myCart, setmyCart] = useState();
  const [clearCart, setclearCart] = useState();

  const payfromcart = () => {
    alert("ชำระเงิน");
  };

  const clearBasket = () => {
    dispatch({ type: "CLEAR_CART" });
    setclearCart(true);
  };

  useEffect(async () => {
    // await setmyCart(cart);
    // await setclearCart(false);
    console.log(myCart);
    await setloading(false);
  }, [myCart]);

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

          {myCart.cart.map((item, index) => {
            return <CartItem key={index} item={item} />;
          })}
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
                  <p class="text-right">{myCart.totalItem} ใบ</p>
                </div>

                {/* ยอดรวม */}
                <div className="col-md-6">
                  <p class="text-left">ยอดรวม</p>
                </div>
                <div className="col-md-6">
                  <p class="text-right">{myCart.totalPrice} บาท</p>
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
                  <h5 class="text-right">{myCart.totalPrice} บาท</h5>
                </div>
              </div>

              <button
                type="button"
                class="btn btn-primary btn-block mt-2"
                onClick={payfromcart}
              >
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

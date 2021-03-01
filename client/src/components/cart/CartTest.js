import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
import CartitemTest from "./CartitemTest";
import CheckoutCreditcard from "../checkout/checkoutwithcard";
import Coupon from "./Coupon";
import { getMyCartFromDB } from "../../redux/action/cartAction";
import { selectAll } from "../../redux/action/cartAction";

const Basket = () => {
  const myCart = useSelector((state) => state.cart);
  const Usernaw = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [charge, setcharge] = useState(undefined);
  const [loading, setloading] = useState(true);
  // const [myCart, setmyCart] = useState();
  const [clearCart, setclearCart] = useState();
  const [removeFromCart, setremoveFromCart] = useState();

  const createCreditCardCharge = async (email, name, amount, token) => {
    console.log("Token Here ===>" + token);
    try {
      const res = await axios.post(
        "http://localhost:3001/checkout-credit-card",
        {
          email,
          name,
          amount,
          token,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resData = res.data;
      setcharge(resData);
    } catch (err) {
      console.log("Error Checkoutpage" + err);
    }
  };
  // const payfromcart = () => {
  //     alert("ชำระเงิน")
  // }

  useEffect(async () => {
    dispatch(getMyCartFromDB());
    await setloading(false);
  }, []);

  const selectAllitem = () => {
    dispatch(selectAll(myCart.check));
  };

  return (
    <div className="container mt-3 p-3">
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="row">
          <div className="col-md-8 mt-4">
            <div class="card-header all">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="defaultCheck1"
                  checked={myCart.check}
                  onChange={selectAllitem}
                />
                <label class="form-check-label" for="defaultCheck1">
                  เลือกทั้งหมด
                </label>
              </div>
            </div>
            {myCart.cart.map((item, index) => {
              return <CartitemTest key={index} item={item} />;
            })}

            {/* {JSON.stringify(myCart, null, 2)} */}
          </div>

          {/* สรุปรายการสั่งซื้อ */}
          <div className="col-md-4 mt-4">
            <div class="card cartSum">
              <div class="card-body">
                <h5 class="card-title">สรุปรายการสั่งซื้อ</h5>

                {/* จำนวน */}
                <div className="row">
                  <div className="col-md-12">
                    <p class="float-left">จำนวน</p>
                    <p class="float-right">{myCart.totalSelect} ใบ</p>
                  </div>

                  {/* ยอดรวม */}
                  <div className="col-md-12">
                    <p class="float-left">ยอดรวม</p>
                    <p class="float-right">{myCart.totalPrice} บาท</p>
                  </div>

                  {/* โค้ดลด */}
                  <div className="col-md-12">
                    <Coupon />
                  </div>

                  {/* ยอดรวมทั้งสิ้น */}

                  <div className="col-md-12 mt-3">
                    <h5 class="float-left">ยอดรวมทั้งสิ้น</h5>
                    <h5 class="float-right">{myCart.totalPrice} บาท</h5>
                  </div>
                </div>

                {/* <button
                type="button"
                class="btn btn-primary btn-block mt-2"
                onClick={payfromcart}
              >
                ดำเนินการชำระเงิน
              </button> */}
                <CheckoutCreditcard
                  user={Usernaw}
                  cart={myCart}
                  createCreditCardCharge={createCreditCardCharge}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;

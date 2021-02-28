import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from 'react-bootstrap';
import axios from "axios";
import { withRouter } from "react-router-dom";
import CartitemTest from "./CartitemTest";
import CheckoutCreditcard from "../checkout/checkoutwithcard";
import { getMyCartFromDB } from '../../redux/action/cartAction'

const Basket = () => {
  const myCart = useSelector((state) => state.cart);
  const Usernaw = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  // const [myCart, setmyCart] = useState();
  const [clearCart, setclearCart] = useState();
  const [removeFromCart, setremoveFromCart] = useState();
  const [success, setsuccess] = useState();
  const [show, setShow] = useState(false)



  const createCreditCardCharge = async (email, uid, macart, amount, token) => {
    console.log("Token Here ===>" + token);
    try {
      await axios.post(
        "http://localhost:3001/checkout-credit-card",
        {
          email,
          uid,
          amount,
          token,
          macart,
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        dispatch(getMyCartFromDB())
        setsuccess(res.data.amount);
        console.log(success);
        setShow(true);
      }
      )

      // const resData = res.data;
      // setcharge(resData);
    } catch (err) {
      console.log("Error Checkoutpage" + err);
    }
  };
  // const payfromcart = () => {
  //     alert("ชำระเงิน")
  // }

  const clearBasket = () => {
    dispatch({ type: "CLEAR_CART" });
    setclearCart(true);
  };

  const removeItem = () => {
    dispatch({ type: "REMOVE_FROM_CART" });
    setremoveFromCart(true);
  };

  useEffect(async () => {
    dispatch(getMyCartFromDB())
    await setloading(false);
  }, []);

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
                    value=""
                    id="defaultCheck1"
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
                    <div className="col-md-6">
                      <p class="text-left">จำนวน</p>
                    </div>
                    <div className="col-md-6">
                      <p class="text-right">{myCart.totalSelect} ใบ</p>
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

                  {/* <button
                type="button"
                class="btn btn-primary btn-block mt-2"
                onClick={payfromcart}
              >
                ดำเนินการชำระเงิน
              </button> */}
                  <CheckoutCreditcard
                    user={Usernaw}
                    cart={myCart.selected}
                    createCreditCardCharge={createCreditCardCharge}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="md"
        dialogClassName="modal-1"
        aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {/* <h4>ตรวจสลากของคุณ</h4> */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>ชำระเงินสำเร็จ</h4>
          <h5>จำนวนเงิน {success} บาท</h5>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Basket;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import CartitemTest from "./CartitemTest";
import CheckoutCreditcard from "../checkout/checkoutwithcard";
import Coupon from "./Coupon";
import { getMyCartFromDB } from "../../redux/action/cartAction";
import { selectAll } from "../../redux/action/cartAction";
import { api } from '../../environment';
import {uiddecoded,emaildecoded} from '../../util/decodeUID'

const Basket = () => {
  const myCart = useSelector((state) => state.cart);
  const Usernaw = useSelector((state) => state.auth);
  const token = useSelector(state => state.token)
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  const [success, setsuccess] = useState();
  const [show, setShow] = useState(false);
  const history = useHistory();

  const createCreditCardCharge = async (email, uid, macart, amount, token) => {
    const buyItem = myCart.selected;
    const totalItem = myCart.totalSelect;

    try {
      // const uid = uiddecoded(token)
      // const email = emaildecoded(token)

      await axios
        .post(api + "/checkout-credit-card", {
          email,
          uid,
          amount,
          token,
          buyItem,
          totalItem,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(async (res) => {
          await dispatch(getMyCartFromDB());
          await setsuccess(res.data.amount);

          await history.push("/purchase");
        });

      // const resData = res.data;
      // setcharge(resData);
    } catch (err) {
      console.log("Error Checkoutpage" + err);
    }
  };

  useEffect(async () => {
    await dispatch(getMyCartFromDB());
    await setloading(false);
  }, []);

  const selectAllitem = () => {
    dispatch(selectAll(myCart.check));
  };

  return (
    <div className="container mt-3 p-3">
      {myCart.loading ? (
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
                  checked={myCart.selectAll}
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
              <div class="card-body s">
                <div>
                  <h5 class="card-title">สรุปรายการสั่งซื้อ</h5>
                </div>


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

                  {/* ยอดรวม */}
                  {/* <div className="col-md-6">
                    <p class="text-left">ยอดรวม</p>
                  </div>
                  <div className="col-md-6">
                    <p class="text-right">{myCart.totalPrice} บาท</p>
                  </div> */}

                  <div className="col-md-12 mt-3">
                    <h5 class="float-left">ยอดรวมทั้งสิ้น</h5>
                    <h5 class="float-right">{myCart.totalPrice} บาท</h5>
                  </div>
                </div>

                <div className="">
                  {/* <div class="input-group mb-3">
                    <label class="input-group-text" for="inputGroupSelect01">
                      Options
                    </label>
                    <select class="form-select" id="inputGroupSelect01">
                      <option selected>Choose...</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div> */}
                  {/*  */}

                  {/* ยอดรวมทั้งสิ้น */}

                  {/* <div className="col-md-6">
                    <h5 class="text-left">ยอดรวมทั้งสิ้น</h5>
                  </div>
                  <div className="col-md-6">
                    <h5 class="text-right">{myCart.totalPrice} บาท</h5>
                  </div> */}

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
                    total={myCart.totalPrice}
                    createCreditCardCharge={createCreditCardCharge}
                  />
                </div>
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
          <h5>จำนวนเงิน {success / 100} บาท</h5>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Basket;

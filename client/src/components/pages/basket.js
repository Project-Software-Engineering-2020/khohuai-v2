import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
import BasketItem from "./basketItem";
import CheckoutCreditcard from "../checkout/checkoutwithcard";

const Basket = () => {
  const myCart = useSelector((state) => state.cart);
  const Usernaw = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [charge, setcharge] = useState(undefined);
  const [loading, setloading] = useState(true);
  // const [myCart, setmyCart] = useState();
  const [clearCart, setclearCart] = useState();

  const createCreditCardCharge = async (email, uid, macart, amount, token) => {

    console.log("Token Here ===>" + token);
    try {
      const res = await axios.post('http://localhost:3001/checkout-credit-card', {
        email,
        uid,
        macart,
        amount,
        token
        // headers: {
        //   "Content-Type": "application/json"
        // }
      });
      const resData = res.data
      if (resData) {
        setcharge(resData)
        clearBasket()
      }
      console.log('ส่งไปแล้ว')
    } catch (err) {
      console.log("Error Checkoutpage" + err)
    }
  }


  // const payfromcart = () => {
  //     alert("ชำระเงิน")
  // }

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
    <div className="container mt-3 p-3">

      {
        charge ? (
          <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">

              {/* <!-- Modal content--> */}
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                  <h4 class="modal-title">Modal Header</h4>
                </div>
                <div class="modal-body">
                  <p>Some text in the modal.</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>

            </div>
          </div>
        )
          :
          (
            <div>
              {loading ? (
                <div>loading...</div>
              ) : (
                  <div className="row">
                    <section className="col-8 from-group bg-white p-3">
                      {myCart.cart.map((item, index) => {
                        return <BasketItem key={index} item={item} />;
                      })}

                      {/* {JSON.stringify(myCart, null, 2)} */}
                    </section>
                    <aside className="col-4 from-group bg-white p-3">
                      <h4>ตะกร้าสินค้า</h4>
                      <h5>ทั้งหมด {myCart.cart.length} รายการ</h5>
                      <h5>ราคารวม {myCart.totalPrice} บาท</h5>
                      <button
                        type="button"
                        className="btn btn-danger m-2"
                        onClick={clearBasket}
                      >
                        ล้างตะกร้า
                </button>
                      {/* <button type="button" className="btn btn-success m-2" onClick={payfromcart}>ชำระเงิน</button> */}
                      <CheckoutCreditcard
                        user={Usernaw}
                        cart={myCart}
                        createCreditCardCharge={createCreditCardCharge}
                      />
                    </aside>
                  </div>
                )}
            </div>
          )
      }

    </div>
  );
}
export default Basket;

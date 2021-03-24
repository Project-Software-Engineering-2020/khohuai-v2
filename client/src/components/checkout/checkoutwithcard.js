import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { storage, firestore } from "../../firebase/firebase";

import "./Checkout.css";

const CheckoutCreditcard = ({ user, cart, total, createCreditCardCharge }) => {
    let OmiseCard;
    const dispatch = useDispatch();
    // const [money, setmoney] = useState();
    // setmoney(cart.totalPrice * 100)
    // const macart = useSelector(state => state.cart);
    const [clearCart, setclearCart] = useState();
    // const [cart, setcart] = useState(null);
    // setcart(Acart)
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
        publicKey: "pkey_test_5mrnjjlemwhhner4xgt",
        currency: "thb",
        frameLabel: "Khohuai",
        submitLabel: "Pay Now",
        buttomLabel: "Pay with Omise",
    });

    const creditCardConfigure = () => {
        OmiseCard.configure({
            defaultPaymentMethod: "credit_card",
            otherPaymentMethods: [],
        });
        OmiseCard.configureButton("#creditcard");
        OmiseCard.attach();
    };

    const omiseHandler = () => {
        // const { cart, createCreditCardCharge } = this.props;
        OmiseCard.open({
            amount: total * 100,
            onCreateTokenSuccess: (token) => {
                createCreditCardCharge(
                    user.email,
                    user.uid,
                    cart,
                    total * 100,
                    token)
                console.log("Here =====>", user.uid);

            },
            onFormClosed: () => { },
        });
    };

    const handleClick = (e) => {
        e.preventDefault();
        creditCardConfigure();
        omiseHandler();
    };

    return (
        <div className="own-form">
            <form>
                <button
                id="creditcard"
                className="btn btn-block btn-primary"
                type="button"
                disabled={total  === 0}
                onClick={handleClick}>
                    ชำระเงินด้วย credit card
          </button>
            </form>
        </div>
    );
};


export default CheckoutCreditcard;

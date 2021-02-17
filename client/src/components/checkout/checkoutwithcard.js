import React, { useState } from "react";
// import "./Checkout.css";


const CheckoutCreditcard = ({cart,user,createCreditCardCharge}) => {

    let OmiseCard;
    // const [cart, setcart] = useState(null);
    // setcart(Acart)
        OmiseCard = window.OmiseCard;
        OmiseCard.configure({
            publicKey: "pkey_test_5mrnjjlemwhhner4xgt",
            currency: "thb",
            frameLabel: "Khohuai",
            submitLabel: "Pay Now",
            buttomLabel: "Pay with Omise"
        })

    const creditCardConfigure = () => {
        OmiseCard.configure({
            defaultPaymentMethod: "credit_card",
            otherPaymentMethods: [],
        })
        OmiseCard.configureButton('#creditcard');
        OmiseCard.attach();
    }

    const omiseHandler = () => {
        // const { cart, createCreditCardCharge } = this.props;
        OmiseCard.open({
            amount: cart.totalPrice * 100,
            onCreateTokenSuccess: (token) => {
                createCreditCardCharge(user.email, user.displayName, cart.totalPrice * 100, token)
                console.log("Here =====>")
            },
            onFormClosed: () => {
            },
        })
    }

    const handleClick = e => {
        e.preventDefault()
        creditCardConfigure()
        omiseHandler()
    }

    return (
        <div className="own-form">
            <form>
                <button id="creditcard" className="btn" type="button" onClick={handleClick}>
                    Pay with Credit Card
          </button>
            </form>
        </div>
    );
}

export default CheckoutCreditcard;

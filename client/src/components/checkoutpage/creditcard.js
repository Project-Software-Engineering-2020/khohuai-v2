import React, { useState } from "react";

let OmiseCard;
const Checkoutcerditcard = () => {
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
        OmiseCard.open({
            amount: 10000,
            submitFormTarget: '#creditcard',
            onCreateTokenSuccess: (token) => {
                console.log(token)
            },
            onFormClosed: () => {
            },
        })
    }

    const handleClick = (e) => {
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

export default Checkoutcerditcard;

import React from 'react'
function Checkout() {

    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
        publicKey: "pkey_test_5noeh4lp1k7qqkioftf",
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
        <div>
            <button onClick={} >Checkout</button>
        </div>
    )
}

export default Checkout;

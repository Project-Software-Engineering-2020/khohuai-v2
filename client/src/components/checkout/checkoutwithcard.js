import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import Axios from "axios";
import { storage, firestore } from "../../firebase/firebase";
import { api } from '../../environment'
import "./Checkout.css";
import { Modal, Button } from 'react-bootstrap'

const CheckoutCreditcard = ({ user, cart, total, createCreditCardCharge }) => {
    let OmiseCard;
    const dispatch = useDispatch();

    const history = useHistory()

    const [warn, setwarn] = useState(false)
    // const [money, setmoney] = useState();
    // setmoney(cart.totalPrice * 100)
    // const macart = useSelector(state => state.cart);
    const [clearCart, setclearCart] = useState();

    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
        publicKey: "pkey_test_5noeh4lp1k7qqkioftf",
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

    const handleClick = async (e) => {

        e.preventDefault();

        await Axios.get(api + "/checkout-credit-card/checkprofilecomplete").then(async (res) => {
            console.log(res);
            if (res.data === true) {

                await creditCardConfigure();
                await omiseHandler();
            }
            else {
                setwarn(true);
            }
        })
    };

    const redirect = () => { 
        history.push("/me/false")
    }


    return (
        <div className="own-form">
            <form>
                <button
                    id="creditcard"
                    className="btn btn-block btn-primary"
                    type="button"
                    disabled={total === 0}
                    onClick={handleClick}>
                    ชำระเงินด้วย credit card
          </button>
            </form>
            <Modal show={warn}>
                <Modal.Header closeButton>
                    <Modal.Title>คำเตือน</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>ข้อมูลส่วนตัวของคุณยังไม่สมบูรณ์   โปรดกรอกข้อมูลให้ครบถ้วน</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" type="button" onClick={redirect}>ไปหน้าข้อมูลส่วนตัว</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};


export default CheckoutCreditcard;

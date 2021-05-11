// import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux'
// import './LotteryItem.css'

// let OmiseCard;

// const LotteryItem = ({ data }) => {

//     const dispatch = useDispatch();
//     OmiseCard = window.OmiseCard;
//     OmiseCard.configure({
//         publicKey: "pkey_test_5mr6tkdorlixflztwxu",
//         currency: "thb",
//         frameLabel: "Khohuai",
//         submitLabel: "Pay Now",
//         buttomLabel: "Pay with Omise"
//     })

//     const creditCardConfigure = () => {
//         OmiseCard.configure({
//             defaultPaymentMethod: "credit_card",
//             otherPaymentMethods: [],
//         })
//         OmiseCard.configureButton('#creditcard');
//         OmiseCard.attach();
//     }

//     const omiseHandler = () => {
//         OmiseCard.open({
//             amount: 10000,
//             submitFormTarget: '#creditcard',
//             onCreateTokenSuccess: (token) => {
//                 console.log(token)
//             },
//             onFormClosed: () => {
//             },
//         })
//     }

//     const handleClick = (e) => {
//         e.preventDefault()
//         creditCardConfigure()
//         omiseHandler()
//     }
//     // const addtoCart = () => {
//     //     dispatch({ type:"ADD_TO_CART", data: data })
//     // }
//     // useEffect(async ()  => {
//     //     await setLottery(data)
//     //     await setloading(false);
//     // }, [])

//     return (

//         <div className="lottery-item">

//             <figure className="lottery-item-image">
//                 <a href={"/product/" + data.id} >
//                     <img src={data.photoURL}></img>
//                 </a>
//             </figure>
//             <form>
//                 <button id="creditcard" className="btn" type="button" onClick={handleClick}>
//                     <i className="fas fa-cart-plus">
//                     </i>
//                     เพิ่มลงในตะกร้า
//                     </button>
//             </form>

//         </div>

//     )
// }

// export default LotteryItem;
import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
// import Checkoutcerditcard from '../checkoutpage/creditcard';
import "./LotteryItem.css";
import { addToCart } from "../../redux/action/cartAction";
import { useHistory } from 'react-router-dom'
// let OmiseCard;

const LotteryItem = ({ data, number }) => {
  const history = useHistory()
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  const addtoCart = () => {

    const item = data;

    if (auth.status === true) {
      dispatch(addToCart(item));
    }
    else {
      history.push('/login');
    }

  };

  return (
    <div className="lottery-item">
      <figure className="lottery-item-image">

        <img src={data.photoURL} alt={data.id}></img>

      </figure>
      <button className="add-to-cart" type="button" onClick={addtoCart}>
        <i className="fas fa-cart-plus"> </i> เพิ่มลงในตะกร้า
        </button>
    </div>
  );
};

export default LotteryItem;

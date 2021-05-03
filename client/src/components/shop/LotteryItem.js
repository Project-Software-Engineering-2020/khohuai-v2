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
import { useDispatch } from "react-redux";
// import Checkoutcerditcard from '../checkoutpage/creditcard';
import "./LotteryItem.css";
import { addToCart } from "../../redux/action/cartAction";

// let OmiseCard;

const LotteryItem = ({ data, number }) => {
  const dispatch = useDispatch();

  const addtoCart = () => {
    // dispatch({ type:"ADD_TO_CART", data: data }
    console.log(data);

    const item = data;

    dispatch(addToCart(item));
  };
  // useEffect ()  => {
  //     // await setLottery(data)
  //     // await setloading(false);
  // }, [])

  return (
    <div className="lottery-item">
      <figure className="lottery-item-image">

          <img src={data.photoURL} alt={data.id}></img>
 
      </figure>
      <form>
        <button className="add-to-cart" type="button" onClick={addtoCart}>
          <i className="fas fa-cart-plus"> </i> เพิ่มลงในตะกร้า
        </button>
      </form>
    </div>
  );
};

export default LotteryItem;

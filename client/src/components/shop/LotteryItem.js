import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LotteryItem.css";
import { addToCart } from "../../redux/action/cartAction";
import { useHistory } from 'react-router-dom'


const LotteryItem = ({ data }) => {
  const history = useHistory()
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  const addtoCart = () => {

    const item = data;

    if (auth.authenticated === true) {
      dispatch(addToCart(item));
    }
    else {
      history.push('/login');
    }

  };

  return (
    <div className="lottery-item">
      {data ? (
        <>
          <figure className="lottery-item-image">
            <img src={data.photoURL} alt={data.id}></img>
            <div>คงเหลือ {data.photoURL.length} ใบ</div>
          </figure>
          <button className="add-to-cart" type="button" onClick={addtoCart}>
            <i className="fas fa-cart-plus"> </i> เพิ่มลงในตะกร้า
        </button>
        </>
      ) : null}

    </div>
  );
};

export default LotteryItem;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { selectItemCart } from '../../redux/action/cartAction';
import "./cart.css";


function CartitemTest({ item }) {
  const [qty, setQty] = useState();
  const dispatch = useDispatch();
  const [increast, setIncrease] = useState();

  // const state = useSelector(state => state.cart)

  const increaseItem = () => {
    dispatch({ type: "INCREASE_ITEM" });
    setIncrease(true);
  };

  function DecreaseItem() {
    setQty(qty - 1);
  }

  function IncrementItem() {
    setQty(qty + 1);
  }

  const onSelectItem = (id) => {
    console.log("this...")
    dispatch(selectItemCart(id))
  }

  return (
    <div className="card p-3 mt-3">
      <div className="row">
        <section className="col-md-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              // checked={item.selected}
              onChange={(e) => onSelectItem(item.id)}
            />
            <figure>
              <img src={item.photoURL} width="200px" height="100px" />
            </figure>
          </div>
        </section>

        <section className="col-md-8">
          <h1>
            {/* 1&nbsp;&nbsp;2&nbsp;&nbsp;3&nbsp;&nbsp;4&nbsp;&nbsp;5&nbsp;&nbsp;6 */}
            {item.id}
          </h1>
          <h5>งวดประจำวันที่ 1 กุมภาพันธ์ 2563</h5>

          <button type="button" className="btnDel" onClick={DecreaseItem}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span className="item-qty">{item.qty}</span>
          <button type="button" className="btnAdd" onClick={increaseItem}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </section>
      </div>
    </div>
    // <div className="card p-3">
    //   <div className="row">
    //     <section className="col-8">
    //       <figure>
    //         <img src={item.photoURL} width="200px" height="100px" />
    //       </figure>
    //     </section>
    //     <section className="col-4">
    //       <div>จำนวน {item.qty} ใบ</div>
    //     </section>
    //   </div>
    // </div>
  );
}

export default CartitemTest;

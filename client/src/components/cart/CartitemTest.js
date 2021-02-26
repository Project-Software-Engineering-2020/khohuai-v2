import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import "./cart.css";

function CartitemTest({ item }) {
  const [qty, setQty] = useState(item.qty);
  const dispatch = useDispatch();
  const [increast, setIncrease] = useState();

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

  return (
    <div className="card p-3 mt-3">
      <div className="row">
        <section className="col-md-4">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="defaultCheck1"
            />
            <figure>
              <img src={item.photoURL} width="200px" height="100px" />
            </figure>
          </div>
        </section>

        <section className="col-md-8">
          <h1>
            { item.id }
          </h1>
          <h5>งวดประจำวันที่ 1 กุมภาพันธ์ 2563</h5>

          <button type="button" className="btnDel" onClick={DecreaseItem}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span>{item.qty}</span>
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

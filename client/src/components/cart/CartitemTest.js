import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import "./cart.css";

function CartitemTest({ item }) {
  const [qty, setQty] = useState(item.qty);

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
            1&nbsp;&nbsp;2&nbsp;&nbsp;3&nbsp;&nbsp;4&nbsp;&nbsp;5&nbsp;&nbsp;6
          </h1>
          <h5>งวดประจำวันที่ 1 กุมภาพันธ์ 2563</h5>

          <button type="button" className="btnDel" onClick={DecreaseItem}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span>{item.qty}</span>
          <button type="button" className="btnAdd" onClick={IncrementItem}>
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

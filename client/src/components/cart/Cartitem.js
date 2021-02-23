import React, { useState } from "react";
import AddDel from "./AddDel";

function BasketItem({ item }) {
  // const [qty, setQty] = useState(item.qty)
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
          <div>จำนวน {item.qty} ใบ</div>
          <AddDel />
        </section>
      </div>
    </div>
  );
}

export default BasketItem;

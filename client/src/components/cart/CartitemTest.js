import React from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import "./cart.css";
import {
  incrementQty,
  decrementQty,
  removeItemInCart,
  selectItem,
} from "../../redux/action/cartAction";

function CartitemTest({ item }) {
  // const [qty, setQty] = useState(item.qty);
  const dispatch = useDispatch();
  // const [increast, setIncrease] = useState();

  // const increaseItem = () => {
  //   dispatch({ type: "INCREASE_ITEM" });
  //   setIncrease(true);
  // };

  function DecreaseItem() {
    if (item.qty - 1 > 0) {
      dispatch(decrementQty(item));
    }
  }

  function IncrementItem() {
    dispatch(incrementQty(item));
  }

  function removeItem() {
    dispatch(removeItemInCart(item.id));
  }

  const selectToggle = () => {
    const select = !item.selected;
    dispatch(selectItem(item.id, select));
  };

  return (
    <div className="card p-3 mt-3">
      <div className="row">
        <section className="col-md-4">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              checked={item.selected}
              id="defaultCheck1"
              onChange={selectToggle}
            />
            <figure className="d-flex justify-content-center ">
              <img src={item.photoURL} width="200px" height="100px" />
            </figure>
          </div>
        </section>

        <section className="col-md-8">
          <h1>{item.id}</h1>
          <h5>งวดประจำวันที่ 1 กุมภาพันธ์ 2563</h5>

          <button type="button" className="btnDel" onClick={DecreaseItem}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span>{item.qty}</span>
          <button type="button" className="btnAdd" onClick={IncrementItem}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button type="button" onClick={removeItem}>
            ลบ
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

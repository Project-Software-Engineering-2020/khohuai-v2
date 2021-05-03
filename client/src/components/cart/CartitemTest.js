import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import SweetAlert from "react-bootstrap-sweetalert";
import "./cart.css";
import {
  incrementQty,
  decrementQty,
  removeItemInCart,
  selectItem,
  addToCart,
} from "../../redux/action/cartAction";

function CartitemTest({ item }) {
  // const [qty, setQty] = useState(item.qty);
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const [confirmRM, setConfirmRM] = useState(false);
  const [delID, setdelID] = useState("");

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
    dispatch(addToCart(item));
  }

  function removeItem() {
    setConfirmRM(false);
    dispatch(removeItemInCart(delID));
    // dispatch(removeItemInCart(item.id));
  }

  // function removeComfirm() {
  //   dispatch(removeItemInCart(item.id));
  // }

  const selectToggle = () => {
    const select = !item.selected;
    dispatch(selectItem(item.id, select));
  };

  const openAlert = (id) => {
    console.log(id);
    setConfirmRM(true);
    setdelID(id);
  };

  return (
    <div className="card p-3 mt-3">
      <SweetAlert
        show={confirmRM}
        title="ต้องการลบสลากออกจากตะกร้าใช่หรือไม่"
        text="ลบมั้ย"
        type={"warning"}
        showConfirm={true}
        showCancel={true}
        hideOverlay={true}
        onConfirm={(e) => removeItem()}
        onCancel={(e) => setConfirmRM(false)}
        confirmBtnText="ยืนยัน"
        confirmBtnBsStyle="error"
        cancelBtnText="ยกเลิก"
      ></SweetAlert>
      <div className="row">
        <section className="col-md-4">
          <div className="item-detail">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                checked={item.selected}
                id="defaultCheck1"
                onChange={selectToggle}
              />
              <div className="picture">
                <img src={item.photoURL} className="w-100" />
              </div>
            </div>
          </div>
        </section>

        <section className="col-md-8">
          <div className="col-6"></div>
          <h3 className="lottery-number-in-cart">{item.id}</h3>
          <h6>งวดประจำวันที่ 16 มีนาคม 2564</h6>

          <button type="button" className="btnDel" onClick={DecreaseItem}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span className="itemQty">{item.qty}</span>
          <button type="button" className="btnAdd" onClick={IncrementItem}>
            <FontAwesomeIcon icon={faPlus} />
          </button>

          <button
            type="button"
            onClick={(e) => openAlert(item.id)}
            className="remove_button"
          >
            <FontAwesomeIcon icon={faTrash} /> ลบ
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

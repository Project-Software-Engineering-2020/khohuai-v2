import { store } from "../store";
import Axios from "axios";
import { api } from '../../environment'

export function getMyCartFromDB() {
  return function (dispatch) {
    return Axios.get(api + "/cart").then((result) => {

      const data = result.data.data;
      const message = result.data.message;
      dispatch({ type: "SET_CART", data });
      dispatch({ type: "CALCULATE_CART" });
    });
  };
}

export function addToCart(item) {
  return function (dispatch) {
    return Axios.post(api + "/cart", { item }).then((result) => {
      if (result.status === 200) {
        const data_alert = {
        title: "เพิ่มลงตระกร้าสำเร็จ",
        text: "",
        type: "success",
    }
    store.dispatch({ type: "OPEN_ALERT", data: data_alert });
      } else {
        const data_alert = {
          title: "คุณได้เพิ่มสลากถึงจำนวนที่กำหนดแล้ว",
          text: "",
          type: "error"
      }
      store.dispatch({ type: "OPEN_ALERT", data: data_alert });
      }

      const data = result.data.data;
      const message = result.data.message;
      dispatch({ type: "SET_CART", data });
      dispatch({ type: "CALCULATE_CART" });
    });
  };
}

export function decrementQty(item) {

  return function (dispatch) {
    return Axios.put(api + "/cart", { item }).then(
      (result) => {
        const data = result.data.data;
        const message = result.data.message;
        dispatch({ type: "SET_CART", data });
        dispatch({ type: "CALCULATE_CART" });
      }
    );
  };
}

export function removeItemInCart(id) {

  return function (dispatch) {
    return Axios.delete(api+"/cart/" + id).then((result) => {
      if (result.status === 200) {
        const data_alert = {
          title: "ลบสลากออกจากตะกร้าสำเร็จ",
          text: "",
          type: "success"
      }
      store.dispatch({ type: "OPEN_ALERT", data: data_alert });
      }

      const data = result.data.data;
      const message = result.data.message;
      dispatch({ type: "SET_CART", data });
    });
  };
}

export function selectItem(id, select) {

  return store.dispatch({ type: "SELECT_ITEM_CART", id, select });
}

export function selectAll(check) {
  return store.dispatch({ type: "SELECT_ALL", check });
}



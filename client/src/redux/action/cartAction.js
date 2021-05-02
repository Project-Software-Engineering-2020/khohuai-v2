import { store } from "../store";
import Axios from "axios";

export function getMyCartFromDB() {
  return function (dispatch) {
    return Axios.get("http://localhost:3001/cart").then((result) => {

      const data = result.data.data;
      const message = result.data.message;
      dispatch({ type: "SET_CART", data });
      dispatch({ type: "CALCULATE_CART" });
    });
  };
}

export function addToCart(item) {
  return function (dispatch) {
    return Axios.post("http://localhost:3001/cart", { item }).then((result) => {

      const data = result.data.data;
      const message = result.data.message;
      dispatch({ type: "SET_CART", data });
      dispatch({ type: "CALCULATE_CART" });
    });
  };
}

export function decrementQty(item) {

  return function (dispatch) {
    return Axios.put("http://localhost:3001/cart", { item }).then(
      (result) => {
        const data = result.data.data;
        const message = result.data.message;
        console.log(data);
        dispatch({ type: "SET_CART", data });
        dispatch({ type: "CALCULATE_CART" });
      }
    );
  };
}

export function removeItemInCart(id) {
  console.log(id);
  return function (dispatch) {
    return Axios.delete("http://localhost:3001/cart/" + id).then((result) => {
      const data = result.data.data;
      const message = result.data.message;
      dispatch({ type: "SET_CART", data });
    });
  };
}

export function selectItem(id, select) {
  console.log(id, select);
  return store.dispatch({ type: "SELECT_ITEM_CART", id, select });
}

export function selectAll(check) {
  return store.dispatch({ type: "SELECT_ALL", check });
}



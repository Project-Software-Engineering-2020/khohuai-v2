import { store } from '../store';
import Axios from 'axios'

export function getMyCartFromDB() {

    return function (dispatch) {
        return Axios.get("http://localhost:3001/cart")
            .then(result => {
                const data = result.data
                console.log(data);
                dispatch({type: "SET_CART", data})
            });
    }
}

export function addToCart(item) {

    return function (dispatch) {
        return Axios.post("http://localhost:3001/cart", {item})
            .then(result => {
                const data = result.data
                console.log(data);
                dispatch({type: "SET_CART", data})
            });
    }
}

export function incrementQty(item) {

    const qty = 1;

    return function (dispatch) {
        return Axios.put("http://localhost:3001/cart", {item, qty})
            .then(result => {
                const data = result.data

                dispatch({type: "SET_CART", data})
            });
    }
}

export function decrementQty(item) {

    const qty = -1;

    return function (dispatch) {
        return Axios.put("http://localhost:3001/cart", {item, qty})
            .then(result => {
                const data = result.data

                dispatch({type: "SET_CART", data})
            });
    }
}

export function removeItemInCart(id) {
    console.log(id)
    return function (dispatch) {
        return Axios.delete("http://localhost:3001/cart/"+id)
        .then(result => { 
            const data = result.data
            dispatch({type: "SET_CART", data})
         })
    }
}


export function selectItem(id, select) {
    console.log(id,select)
    return store.dispatch({type: "SELECT_ITEM_CART", id, select });
}
import { store } from '../store';
import Axios from 'axios'

export function getMyCartFromDB() {

    return function (dispatch) {
        return Axios.get("http://localhost:3001/cart")
            .then(result => {
                const data = result.data
                console.log(data);
                dispatch({type: "ADD_CART", data})
            });
    }
}

// export function setMyCart() {

// }

export function addToCart(item) {

    return function (dispatch) {
        return Axios.post("http://localhost:3001/cart", {item})
            .then(result => {
                const data = result.data
                console.log(data);
                dispatch({type: "ADD_CART", data})
            });
    }
}

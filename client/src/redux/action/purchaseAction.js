import { store } from '../store';
import Axios from 'axios';

export function getPurchase() {

    //set loading
    store.dispatch({type:"IS_FETCHING_PURCHASE"});

    //get data 
    return function (dispatch) {
        return Axios.get("https://khohuai-server.herokuapp.com/purchase")
            .then(purchase => {
                dispatch({type:"FETCHED_PURCHASE",data:purchase.data})
            });
    }
}
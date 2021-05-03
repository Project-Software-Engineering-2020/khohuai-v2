import { store } from '../store';
import Axios from 'axios';
import { api } from '../../environment'
export function getPurchase() {

    //set loading
    store.dispatch({type:"IS_FETCHING_PURCHASE"});

    //get data 
    return function (dispatch) {
        return Axios.get(api + "/purchase")
            .then(purchase => {
                dispatch({type:"FETCHED_PURCHASE",data:purchase.data})
            });
    }
}
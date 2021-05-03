import { store } from '../store';
import { api } from '../../environment'

export function setPurchaseDetail(detail) {

    //set loading
    // store.dispatch({type:"IS_FETCHING_PURCHASE"});

    //get data 
    return function (dispatch) {
        dispatch({ type: "FETCHED_PURCHASE_DETAIL", data: detail })
    }
}

export function getPurchaseDetail(detail) {

    //set loading
    // store.dispatch({type:"IS_FETCHING_PURCHASE"});

    //get data 
    return function (dispatch) {
        dispatch({ type: "GET_PURCHASE_DETAIL"})
    }
}
import { store } from '../store';

export function getPurchase() {

    store.dispatch({type:"IS_FETCHING_PURCHASE"});

    return function (dispatch) {
        return Axios.get("http://localhost:3001/purchase")
            .then(purchase => {
                dispatch({type:"FETCHED_PURCHASE",data:purchase.data})
            });
    }
}
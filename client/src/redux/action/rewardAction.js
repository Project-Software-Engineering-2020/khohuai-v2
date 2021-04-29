import { store } from '../store';

import Axios from 'axios';

export function getReward() {

    //set loading
    store.dispatch({type:"IS_FETCHING_REWARD"});

    //get data 
    return function (dispatch) {
        return Axios.get("http://localhost:3001/reward")
            .then(reward => {
                dispatch({type:"FETCHED_REWARD",data:reward.data[0]})
            });
    }
}
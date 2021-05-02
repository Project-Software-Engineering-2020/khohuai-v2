import { store } from '../store';

import Axios from 'axios';

export function getReward() {

    //set loading
    store.dispatch({type:"IS_FETCHING_REWARD"});

    //get data 
    return function (dispatch) {
        return Axios.get("http://localhost:3001/reward")
            .then(reward => {
                dispatch({type:"FETCHED_REWARD",data:reward.data})
            });
    }
}

export function getRewardDetail(reward_id) {
    //แสดง loading
    store.dispatch({type:"IS_FETCHING_REWARD"});
    //ดึงข้อมูล และส่งข้มูลไปแสดงผล
    return function (dispatch) {
        return Axios.get("http://localhost:3001/reward/detail/"+reward_id)
            .then(reward => {
                console.log(reward.data);
                dispatch({type:"FETCHED_REWARD",data:reward.data})
            });
    }
}
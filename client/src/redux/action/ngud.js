import { store } from '../store';
import Axios from 'axios';
import { api } from '../../environment';



export function getCurrent() {

    //get data 
    return function (dispatch) {
        return Axios.get(api + "/lottery/currentngud")
            .then(n => {

                dispatch({type:"SET_NGUD",data:n.data})
            });
    }
}
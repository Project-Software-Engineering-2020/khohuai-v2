import { store } from '../store';
import Axios from 'axios';

export function setProfile(user) {
    return {
        type: 'SET_PROFILE',
        data: {
            uid: user.uid,
            firstname: user.firstname,
            lastname: user.lastname,
            displayName: user.displayName,
            photoURL: user.photoURL,
            email: user.email,
            phone: user.phone
        }
    }
}
export function loadingProfile() {
    return {
        type: 'LOADING_PROFILE'
    }
}
export function getProfile(uid) {

    store.dispatch(loadingProfile());

    return function (dispatch) {
        return Axios.get("https://khohuai-server.herokuapp.com/user/profile/" + uid)
            .then(user => {
                console.log(user.data)
                dispatch(setProfile(user.data))
            });
    }
}

export function updateUserProfile(newProfile) {

    const user = Axios.put("https://khohuai-server.herokuapp.com/user/profile", { newProfile })
        .then((res) => {
            if (res.status === 200) {
            }
        })

    const data_alert = {
        title: "อัพเดพข้อมูลสำเร็จ",
        text: "",
        type: "success"
    }
    store.dispatch({ type: "OPEN_ALERT", data: data_alert });

    return function (dispatch) {

        return (
            dispatch(getProfile(newProfile.uid))
        )
    }

}

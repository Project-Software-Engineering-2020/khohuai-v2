import { store } from '../store';
import Axios from 'axios';
import { api } from '../../environment'

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
            phone: user.phone,
            book_name: user.book_name,
            book_number: user.book_number,
            book_provider: user.book_provider
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
        return Axios.get(api + "/user/profile/" + uid)
            .then(user => {
                console.log(user.data)
                dispatch(setProfile(user.data))
            });
    }
}

export function updateUserProfile(newProfile) {

    const user = Axios.put(api + "/user/profile", { newProfile })
        .then((res) => {
            if (res.status === 200) {
            }
        })

    const data_alert = {
        title: "อัพเดพข้อมูลสำเร็จ",
        text: "เกิดข้อผิดพลาด",
        type: 'success'
    }
    store.dispatch({ type: "OPEN_ALERT", data: data_alert });

    return function (dispatch) {

        return (
            dispatch(getProfile(newProfile.uid))
        )
    }

}

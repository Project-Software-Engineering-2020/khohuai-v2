import { store } from '../store';

export function setloginWithEmail(user) {
    return store.dispatch({
        type: 'SET_LOGIN',
        data: {
            uid: user.data.uid,
            displayName: user.data.displayName,
            photoURL: user.data.photoURL,
            role: user.data.role,
            email: user.data.email,
            provider: "email",
            authenticated: true,

            // status: true,
            // token: ""
        }
    });
}
export function setauthenticate(photoURL,displayName){
    return store.dispatch({
        type: 'SET_AUTHENTICATED',
        data:{
            photoURL:photoURL,
            displayName:displayName,
            authenticated: true,
        }
    })
}
export function setloginAfterSignup(user){
    return store.dispatch({
        type: 'SET_LOGIN',
        data:{
            uid: user.data.uid,
            displayName: user.data.displayName,
            photoURL: "https://img2.thaipng.com/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg",
            role: user.data.role,
            email: user.data.email,
            provider: "email",
            // status: true,
            // token: ""
        }
    })
}

export function setloginWithGoogle(user,token) {
    return store.dispatch({
        type: 'SET_LOGIN',
        data: {
            uid: user.data.uid,
            displayName: user.data.displayName,
            photoURL: user.data.photoURL,
            role: user.data.role,
            email: user.data.email,
            provider: "google",
            status: true,
            token: token
        }
    });

}

export function setlogout() {

    store.dispatch({ type: "SET_LOGOUT" })
    return function (dispatch) {

        return (
            dispatch({type:"SET_DELETETOKEN"})
        )
    }
}



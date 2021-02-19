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
            status: true,
            token: ""
        }
    });
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
    return store.dispatch({ type: "SET_LOGOUT" })
}



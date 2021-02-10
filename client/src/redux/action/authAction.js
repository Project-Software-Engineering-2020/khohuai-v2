import { store } from '../store';

export function setloginWithEmail(user) {
    return store.dispatch({
        type: 'SET_LOGIN',
        data: {
            uid: user.data.uid,
            displayName: user.data.displayName,
            photoURL: user.data.photoURL,
            role: user.data.role,
            provider: "email",
            status: true
        }
    });
}

export function setloginWithGoogle(doc, uid) {
    return store.dispatch({
        type: 'SET_LOGIN',
        data: {
            uid: uid,
            displayName: doc.data().displayName,
            photoURL: doc.data().photoURL,
            role: doc.data().role,
            provider: "google",
            status: true
        }
    });

}

export function setlogout() {
    return store.dispatch({ type: "SET_LOGOUT" })
}



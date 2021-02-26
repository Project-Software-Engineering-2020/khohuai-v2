import {store}from '../store';

// export function updateProfile(user) {
//     return store.dispatch({
//         type: 'SET_LOGIN',
//         data: {
//             uid: user.data.uid,
//             displayName: user.data.displayName,
//             photoURL: user.data.photoURL,
//             role: user.data.role,
//             email: user.data.email,
//             provider: "google",
//             status: true,
//             token: token
//         }
//     });

// }

export function selectItemCart(id) {
    console.log(id)
    return store.dispatch({
        type: 'SELECT_ITEM_CART',
        data : id
    })
}

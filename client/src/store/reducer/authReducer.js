const initialState = {
    uid : null,
    displayName: null,
    photoURL: null,
    email: null,
    role: null
};

function userAuth(state = initialState , action) {

    switch (action.type) {
        
        case 'SET_LOGIN':
            state = {
                ...state,
                uid : action.payload.uid,
                displayName: action.payload.displayName,
                photoURL: action.payload.photoURL,
                email: action.payload.email,
                role: action.payload.role
            };
            // console.log("Redux keep State Success")
            console.log(action.payload);
            return state;
        case 'SET_LOGOUT':
            state = null;
            break;
        case 'GET_STATUS_LOGIN':
            return state;
        
    }
    return state;
    
}

export default userAuth;
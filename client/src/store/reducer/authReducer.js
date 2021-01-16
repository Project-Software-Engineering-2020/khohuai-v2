const initialState = {
    uid : null,
    displayName: null,
    photoURL: null,
    email: null,
    role: null,
    status:false
};

function userAuth(state = initialState , action) {

    switch (action.type) {
        
        case 'SET_LOGIN':
            state = {
                ...state,
                uid : action.uid,
                displayName: action.displayName,
                photoURL: action.photoURL,
                email: action.email,
                role: action.role,
                status:action.status
            };
            // console.log("Redux keep State Success")
            console.log(action.payload);
            return state;
        case 'SET_LOGOUT':
            state = initialState;
            break;
        case 'GET_STATUS_LOGIN':
            return state;
        
    }
    return state;
    
}

export default userAuth;
const initialState = {
    uid : null,
    displayName: null,
    photoURL: null,
    email: null,
    role: null,
    provider: null,
    status:false
};

function userAuth(state = initialState , action) {

    switch (action.type) {
        
        case 'SET_LOGIN':
            console.log(action);
            state = {
                ...state,
                uid : action.uid,
                displayName: action.displayName,
                photoURL: action.photoURL,
                email: action.email,
                role: action.role,
                provider: action.provider,
                status:action.status
            };
            // console.log("Redux keep State Success")
            
            return state;

        case 'UPDATE_PROFILE':
            console.log(action);
            state = {
                ...state,
                uid : action.uid,
                displayName: action.displayName,
                photoURL: action.photoURL,
                email: action.email,
                role: action.role,
                provider: state.provider,
                status:action.status
            };
            console.log("Redux Update State Success")
            
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
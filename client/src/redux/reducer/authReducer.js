const initialState = {
    uid : null,
    displayName: null,
    photoURL: null,
    role: null,
    provider: null,
    status:false
};

function userAuth(state = initialState , action) {

    switch (action.type) {
        
        case 'SET_LOGIN':
            state = {
                ...state,
                uid : action.data.uid,
                displayName: action.data.displayName,
                photoURL: action.data.photoURL,
                role: action.data.role,
                provider: action.data.provider,
                status:action.data.status
            };
            return state;

        case 'UPDATE_PROFILE':
            state = {
                ...state,
                uid : action.uid,
                displayName: action.displayName,
                photoURL: action.photoURL,
                role: action.role,
                provider: state.provider,
                status:action.status
            };
            return state;

        case 'SET_LOGOUT':
            state = initialState;
            return state;

        default:
            return state;
        
    }
}

export default userAuth;
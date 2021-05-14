const initialState = {
    uid : null,
    displayName: null,
    photoURL: null,
    role: null,
    email: null,
    provider: null,
    // status:false,
    // token:null,
    authenticated: false
};

function userAuth(state = initialState , action) {

    switch (action.type) {

        case 'SET_AUTHENTICATED':
            state = {
              ...state,
              photoURL:action.data.photoURL,
              displayName:action.data.displayName,
              authenticated: action.data.authenticated
            };
            return state;


        case 'SET_LOGIN':
            state = {
                ...state,
                uid : action.data.uid,
                displayName: action.data.displayName,
                photoURL: action.data.photoURL,
                role: action.data.role,
                email: action.data.email,
                provider: action.data.provider,
                authenticated: action.data.authenticated

                // status: action.data.status,
                // token: action.data.token
            };
            return state;

        case 'UPDATE_PROFILE':
            state = {
                ...state,
                uid : action.uid,
                displayName: action.displayName,
                photoURL: action.photoURL,
                role: action.role,
                email: action.data.email,
                provider: action.data.provider,
                // status: action.data.status,
                // token: action.data.token
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

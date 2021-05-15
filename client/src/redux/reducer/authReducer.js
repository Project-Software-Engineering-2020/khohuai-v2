const initialState = {
    displayName: null,
    photoURL: null,
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
                displayName: action.data.displayName,
                photoURL: action.data.photoURL,
                authenticated: action.data.authenticated
            };
            return state;

        case 'UPDATE_PROFILE':
            state = {
                ...state,
                displayName: action.displayName,
                photoURL: action.photoURL,
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

const initialState = {
    loading: false,
    data: {},
};

function profile(state = initialState, action) {

    switch (action.type) {

        case 'LOADING_PROFILE':
            state = {
                ...state,
                loading: true,
                data:{}
            }
            return state;

        case 'SET_PROFILE':
            state = {
                ...state,
                loading: false,
                data:action.data
            }
            return state;

        case 'UPDATE_PROFILE':
            state = {
                ...state,
                uid: action.data.uid,
                firstname: action.data.firstname,
                lastname: action.data.lastname,
                displayName: action.data.displayName,
                photoURL: action.data.photoURL,
                email: action.data.email,
                phone: action.data.phone
            };
            return state;
        default:
            return state;

    }
}

export default profile;
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
                phone: action.data.phone,
                book_name: action.data.book_name,
                book_number: action.data.book_number,
                book_provider: action.data.book_provider
            };
            return state;
        default:
            return state;

    }
}

export default profile;
const initialState = {
    loading: false,
    data: []
};

function Purchase(state = initialState, action) {

    switch (action.type) {

        case "IS_FETCHING_PURCHASE":
            state = {
                ...state,
                loading: true,
                data: []
            }
            return state

        case "FETCHED_PURCHASE":
            state = {
                ...state,
                loading: false,
                data: action.data
            }
            return state

        default:
            return state;

    }
}

export default Purchase;
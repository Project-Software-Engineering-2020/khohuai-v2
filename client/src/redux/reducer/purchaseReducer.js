const initialState = {
    loading: false,
    data: [],
    wait: 0
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

            const result = action.data.filter(r => r.result !== true);

            state = {
                ...state,
                loading: false,
                data: action.data,
                wait: result.length
            }
            return state

        default:
            return state;

    }
}

export default Purchase;
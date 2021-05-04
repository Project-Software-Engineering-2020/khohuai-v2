const initialState = {
    loading: false,
    data: [],
};

function Reward(state = initialState, action) {

    switch (action.type) {

        case "IS_FETCHING_REWARD":

            state = {
                ...state,
                loading: true,
                data: [],
                wait: 0
            }
            return state

        case "FETCHED_REWARD":

            // const result = action.data.filter(r => r.success === false);

            state = {
                ...state,
                loading: false,
                data: action.data,
            }
            return state

        default:
            return state;

    }
}

export default Reward;
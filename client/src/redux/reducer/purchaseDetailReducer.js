const initialState = {
    loading: false,
    data: []
};

function PurchaseDetail(state = initialState, action) {

    switch (action.type) {

        case "IS_FETCHING_PURCHASE_DETAIL":
            state = {
                ...state,
                loading: true,
                data: []
            }
            return state

        case "FETCHED_PURCHASE_DETAIL":
            state = {
                ...state,
                loading: false,
                data: action.data
            }
            return state
        case "GET_PURCHASE_DETAIL":
            return state
        default:
            return state;

    }
}

export default PurchaseDetail;
const initialState = null

const reducer = (state = initialState, action) => {

    switch(action.type) {

        case 'GET_STATUS_LOGIN' : 
            return state

        case 'SET_LOGIN' : 
            state = action.payload;
            console.log("Redux keep State Success")
            console.log(state)
            return state;

        case 'SET_LOGOUT' :
            state = null;
            console.log(state)
            return state

        default :
            break;
    }

    return state;
} 

export default reducer;
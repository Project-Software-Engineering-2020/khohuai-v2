

function userAuth(state = [] , action) {

    switch (action.type) {
        
        case 'SET_LOGIN':
            state = action.payload;
            // console.log("Redux keep State Success")
            // console.log(state)
            return state = action.payload;

        case 'SET_LOGOUT':
            state = null;
            console.log(state)
            break;

        default:
            return state;
    }

    
}

export default userAuth;
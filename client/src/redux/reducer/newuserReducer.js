function newuser(state = true, action) {

    switch (action.type) {

        case 'SET_NEWUSER':
            state = action.data
            return state;
            
        default:
            return state;
    }
}

export default newuser;
function ngud(state = [], action) {

    switch (action.type) {

        case 'SET_NGUD':
            state = action.data
            return state;
            
        default:
            return state;
    }
}

export default ngud;
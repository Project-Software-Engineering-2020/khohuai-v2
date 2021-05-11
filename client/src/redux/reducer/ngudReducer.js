function ngud(state = [], action) {

    switch (action.type) {

        case 'SET_NGUD':
            console.log(action.data)
            state = action.data
            console.log(state);
            return state;
        default:
            return state;
    }
}

export default ngud;
const initialState = {
    open: false,
    title: "",
    text: "",
    types: "",
    overlay: true,
    showCloseButton:false
};
function Alert(state = initialState, action) {

    switch (action.type) {

        case 'OPEN_ALERT':

            console.log(action.data);
            state = {
                ...state,
                open: true,
                title: action.data.title,
                text: action.data.text,
                types: action.data.type,
            }
            return state;

        case 'CLOSE_ALERT':
            state = {
                ...state,
                open: false,
                title: "",
                text: "",
                types: ""
            }

        default:
            return state;

    }
}

export default Alert;

export function openAlert(data) {

    return function (dispatch) {
        dispatch({ type: "OPEN_ALERT", data: data })
    }
}

export function closeAlert() {

    return function (dispatch) {
        dispatch({ type: "CLOSE_ALERT" })
    }
}

export function removeAlert(data) {

    return function (dispatch) {
        dispatch({ type: "REMOVE_ALERT", data: data })
    }
}
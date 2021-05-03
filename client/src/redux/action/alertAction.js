
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
          const data_alert = {
          title: "คุณต้องการที่จะลบสลากออกจากตะกร้าใช่ไหม",
          text: "",
          type: "warning",
          dataDel: data 
      }
      dispatch({ type: "DATA_DEL", data: data_alert });
       
    }
}


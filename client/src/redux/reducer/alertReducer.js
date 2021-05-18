const initialState = {
  open: false,
  title: "",
  text: "",
  types: "",
  time: 0,
  overlay: true,
  CancelButton: false,
  showCloseButton:false,
  onConfirm: false,
  dataDel: ""
};
function Alert(state = initialState, action) {
  switch (action.type) {
    case "OPEN_ALERT":
 
      state = {
        ...state,
        open: true,
        title: action.data.title,
        text: action.data.text,
        types: action.data.type,
        time: 1800,
      };
      return state;

    case "CLOSE_ALERT":
      state = {
        ...state,
        open: false,
        title: "",
        text: "",
        types: "",
      };
      return state;

    case "REMOVE_ALERT":
      state = {
        ...state,
        open: true,
        title: action.data.title,
        text: action.data.text,
        types: action.data.type,
        CancelButton: true,
        showCloseButton:true
      };
      return state

      case "DATA_DEL":
        state = {
          ...state,
          open: true,
          title: action.data.title,
          text: action.data.text,
          types: action.data.type,
          CancelButton: true,
          showCloseButton:true,
          dataDel: action.data.dataDel
        };
        return state

    default:
      return state;
  }
}

export default Alert;

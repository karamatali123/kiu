export const SET_UID='SET_UID';
export const SET_USER = 'SET_USER';
export const  SNACKBAR_OPEN = 'SNACKBAR_OPEN';
export const  SNACKBAR_CLOSE = 'SNACKBAR_CLOSE';
export const AUTH_STATUS='AUTH-STATUS';


export const initialState = {
  uid: null,
  user: { },
  snackbarOpen: false,
  snackbarType: "",
  message: "",
  authStatus:false

};


export const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user:action.payload,
      };
    case SET_UID:
      return{
        ...state,
        uid:action.payload
      }
      case SNACKBAR_OPEN:
        return {
          ...state,
          snackbarOpen: true,
          snackbarType: action.payload.snackbarType,
          message: action.payload.message,
        };
      case SNACKBAR_CLOSE:
        return {
          ...state,
          snackbarOpen: false,
  
          message: "",
        };
      case AUTH_STATUS:
        return{
          ...state,
          authStatus:action.payload
        }
   
    default:
      return state;
  }
};

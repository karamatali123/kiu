import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import {
  AUTH_STATUS,
  SET_UID,
  SET_USER,
  SNACKBAR_CLOSE,
  SNACKBAR_OPEN,
} from "./reducer";
import { ERROR, SUCCESS } from "../../constants/snackbarConstant";
import { setUid } from "../../localStroageServices";

const userActions = (dispatch) => {
  const registerEmailPassword = async (values, navigate) => {
    const auth = getAuth();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      dispatch({
        type: SET_UID,
        payload: res.user.uid,
      });
      setUid(res.user.uid);
      dispatch({
        type: SNACKBAR_OPEN,
        payload: {
          snackbarType: SUCCESS,
          message: "register successfully",
        },
      });

      const user = res.user;
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      });
      navigate("/register-as");
    } catch (error) {
      dispatch({
        type: SNACKBAR_OPEN,
        payload: {
          snackbarType: ERROR,
          message: error.message,
        },
      });
    }
  };
  const setUser = (user) => {
    dispatch({
      type: SET_USER,
      payload: user,
    });
  };
  const handleLogin = async (values, navigate) => {
    const auth = getAuth();
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      dispatch({
        type: SET_UID,
        payload: res.user.uid,
      });
      dispatch({
        type: AUTH_STATUS,
        payload: true,
      });
      dispatch({
        type: SNACKBAR_OPEN,
        payload: {
          snackbarType: SUCCESS,
          message: "login successfully",
        },
      });

      if (res.user.email.includes("admin")) {
        navigate("/add-catagories");
      } else {
        navigate("/my-complaints");
      }
    } catch (error) {
      dispatch({
        type: SNACKBAR_OPEN,
        payload: {
          snackbarType: ERROR,
          message: error.message,
        },
      });
    }
  };
  const closeSnackbar = () => {
    dispatch({ type: SNACKBAR_CLOSE });
  };
  const handleLogout = async (navigate) => {
    const auth = getAuth();
    try {
      await signOut(auth);
      dispatch({
        type: SET_UID,
        payload: "",
      });
      dispatch({
        type: SET_USER,
        payload: null,
      });
      dispatch({
        type: SNACKBAR_OPEN,
        payload: {
          snackbarType: SUCCESS,
          message: "logout successfully",
        },
      });
      dispatch({
        type: AUTH_STATUS,
        payload: false,
      });
      navigate("/");
    } catch (error) {
      dispatch({
        type: SNACKBAR_OPEN,
        payload: {
          snackbarType: ERROR,
          message: error.message,
        },
      });
    }
  };

  const checkAuthStatus = (status) => {
    dispatch({
      type: AUTH_STATUS,
      payload: status,
    });
  };

  return {
    registerEmailPassword,
    handleLogin,
    setUser,
    handleLogout,
    checkAuthStatus,
    closeSnackbar,
    dispatch,
  };
};
export default userActions;

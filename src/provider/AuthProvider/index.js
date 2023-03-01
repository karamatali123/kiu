import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useDocument } from "swr-firestore-v9";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import userActions from "./actions";
import { initialState, reducer } from "./reducer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const { children } = props;
  const [uid, setUid] = useState();
  const [loading, setLoading] = useState(true);

  const auth = getAuth();

  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = userActions(dispatch);

  const setUser = async (uid) => {
    const docRef = doc(db, "users", uid);
    try {
      const res = await getDoc(docRef);
      actions.setUser(res.data());
    } catch (error) {
      console.log(error.message, "error");
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        actions.checkAuthStatus(true);
        setUid(user.uid);
      } else {
        actions.checkAuthStatus(false);
      }
    });
    setUser(uid);
  }, [uid]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        registerUser: actions.registerEmailPassword,
        userLogin: actions.handleLogin,
        handleUserLogout: actions.handleLogout,
        closeSnackbar: actions.closeSnackbar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth can only be used inside AuthProvider");
  }
  return context;
};

export default AuthProvider;

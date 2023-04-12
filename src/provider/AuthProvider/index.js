import { createContext, useContext, useEffect, useReducer } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import userActions from "./actions";
import { initialState, reducer } from "./reducer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const { children } = props;

  // const [loading, setLoading] = useState(true);

  const auth = getAuth();

  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = userActions(dispatch);

  const setUser = async (uid) => {
    const docRef = doc(db, "users", uid);
    try {
      const res = await getDoc(docRef);

      actions.setUser(res.data());
      actions.checkAuthStatus(true);
    } catch (error) {
      console.log(error.message, "error");
      actions.checkAuthStatus(false);
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        registerUser: actions.registerEmailPassword,
        userLogin: actions.handleLogin,
        handleUserLogout: actions.handleLogout,
        closeSnackbar: actions.closeSnackbar,
        dispatch: actions.dispatch,
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

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import PrivateLayout from "../components/layout/PrivateLayout";
const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/");
    } else {
      return <PrivateLayout>{children}</PrivateLayout>;
    }
  });
  return <PrivateLayout>{children}</PrivateLayout>;
};
export default PrivateRoute;

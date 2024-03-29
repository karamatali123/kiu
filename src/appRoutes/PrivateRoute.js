import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/gernal/Loading";
import PrivateLayout from "../components/layout/PrivateLayout";
import AccessDenied from "../pages/accessDenied";
import { useAuth } from "../provider/AuthProvider";
const PrivateRoute = ({ children, roles }) => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  var userHasRequiredRole = (userHasRequiredRole =
    user && roles.includes(user.role) ? true : false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/");
    } else {
    }
  });
  return loading ? (
    <Loading />
  ) : userHasRequiredRole ? (
    <PrivateLayout>{children}</PrivateLayout>
  ) : (
    <AccessDenied />
  );
};
export default PrivateRoute;

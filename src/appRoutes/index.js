import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MyComplaints from "../pages/myComplaigns";
import LandingPage from "../pages/landingpage/Landingpage";
import { useAuth } from "../provider/AuthProvider";
import PrivateRoute from "./PrivateRoute";
import PrivateLayout from "../components/layout/PrivateLayout";
import NewComplaint from "../pages/SubmitNewComplaign";
import Profile from "../pages/profile";
<PrivateRoute></PrivateRoute>;

const AppRoutes = () => {
  const { user, authStatus } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={
            !authStatus ? (
              <LandingPage />
            ) : (
              <PrivateRoute>
                <MyComplaints />
              </PrivateRoute>
            )
          }
        ></Route>
        <Route
          path="/my-complaints"
          element={
            <PrivateRoute>
              <MyComplaints />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-new-complaints"
          element={
            <PrivateRoute>
              <NewComplaint />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile-setting"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

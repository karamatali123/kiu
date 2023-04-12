import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MyComplaints from "../pages/myComplaigns";
import LandingPage from "../pages/landingpage/Landingpage";
import { useAuth } from "../provider/AuthProvider";
import PrivateRoute from "./PrivateRoute";
import PrivateLayout from "../components/layout/PrivateLayout";
import NewComplaint from "../pages/SubmitNewComplaign";
import Profile from "../pages/profile";
import ComplaintDetails from "../pages/complaintDetails";
import AddCatagories from "../pages/addCatagories";
import AddDepartment from "../pages/addDepartment";
import ReceivedComplaints from "../pages/receivedComplaints";
<PrivateRoute></PrivateRoute>;

const AppRoutes = () => {
  const { user, authStatus } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<LandingPage />}></Route>
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
        <Route
          path="/my-complaints/:id"
          element={
            <PrivateRoute>
              <ComplaintDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/received-complaints"
          element={
            <PrivateRoute>
              <ReceivedComplaints />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-catagories"
          element={
            <PrivateRoute>
              <AddCatagories />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-department"
          element={
            <PrivateRoute>
              <AddDepartment />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

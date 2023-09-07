import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MyComplaints from "../pages/myComplaigns";
import LandingPage from "../pages/landingpage/Landingpage";
import { useAuth } from "../provider/AuthProvider";
import PrivateRoute from "./PrivateRoute";
import NewComplaint from "../pages/SubmitNewComplaign";
import Profile from "../pages/profile";
import ComplaintDetails from "../pages/complaintDetails";
import AddCatagories from "../pages/addCatagories";
import AddDepartment from "../pages/addDepartment";
import ReceivedComplaints from "../pages/receivedComplaints";
import { ADMIN, FACILITY, STUDENT } from "../constants/roles";
import AccessDenied from "../pages/accessDenied";
import SignUp from "../pages/signup";
import RegisterAs from "../pages/registerAs";
import Login from "../pages/login";
import AddInfo from "../pages/addInfo";
import AddRoles from "../pages/addRole";
import TrackComplaint from "../pages/trackComplaint/TrackComplaint";
import Dashboard from "../pages/dashboard/Dashboard";
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
              <PrivateRoute roles={[ADMIN, FACILITY, STUDENT]}>
                <MyComplaints />
              </PrivateRoute>
            )
          }
        ></Route>

        {/* <Route path={"/"} element={<LandingPage />}></Route> */}
        <Route path={"/access-denied"} element={<AccessDenied />}></Route>
        <Route path={"/signup"} element={<SignUp />}></Route>
        <Route path={"/login"} element={<Login />}></Route>
        <Route path={"/addInfo"} element={<AddInfo />}></Route>
        <Route path={"/register-as"} element={<RegisterAs />}></Route>
        <Route
          path="/my-complaints"
          element={
            <PrivateRoute roles={[ADMIN, FACILITY, STUDENT]}>
              <MyComplaints />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-new-complaints"
          element={
            <PrivateRoute roles={[ADMIN, FACILITY, STUDENT]}>
              <NewComplaint />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile-setting"
          element={
            <PrivateRoute roles={[ADMIN, FACILITY, STUDENT]}>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-complaints/:id"
          element={
            <PrivateRoute roles={[ADMIN, FACILITY, STUDENT]}>
              <ComplaintDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/track-complaint/:id"
          element={
            <PrivateRoute roles={[ADMIN, FACILITY, STUDENT]}>
              <TrackComplaint />
            </PrivateRoute>
          }
        />
        <Route
          path="/received-complaints"
          element={
            <PrivateRoute roles={[FACILITY]}>
              <ReceivedComplaints />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute roles={[ADMIN, FACILITY, STUDENT]}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-catagories"
          element={
            <PrivateRoute roles={[ADMIN]}>
              <AddCatagories />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-department"
          element={
            <PrivateRoute roles={[ADMIN]}>
              <AddDepartment />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-roles"
          element={
            <PrivateRoute roles={[ADMIN]}>
              <AddRoles />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

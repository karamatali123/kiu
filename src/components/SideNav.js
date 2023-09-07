import { Card } from "@mui/material";
import React from "react";

import logo from "../assests/Images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { StyledNavItem } from "./layout/styles";
import { Box } from "@mui/material";
import {
  AddBox,
  ExitToApp,
  NoteAdd,
  Settings,
  SubjectSharp,
} from "@mui/icons-material";
import { useAuth } from "../provider/AuthProvider";
import { ADMIN, FACILITY, STUDENT } from "../constants/roles";

const userItems = ["My Complaints", "Submit new Complain "];

const SideNav = () => {
  const { user, handleUserLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    handleUserLogout(navigate);
  };

  return (
    <Card
      style={{
        display: { xs: "none", lg: "block" },
        borderRadius: "0px",
        position: "relative",
        maxWidth: "295px",
        height: "calc(100vh - 75px)",
        width: "100%",
        margin: "unset",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
        padding: "2rem 0",
      }}
    >
      <div>
        <img src={logo} style={{ width: "50px", height: "50px" }}></img>
      </div>
      <Box paddingY={"2rem"}>
        {user.role == STUDENT && (
          <>
            <Link to="/my-complaints" style={{ textDecoration: "none" }}>
              <StyledNavItem>
                <SubjectSharp /> <span> My Complaints</span>
              </StyledNavItem>
            </Link>
            <Link to="/add-new-complaints" style={{ textDecoration: "none" }}>
              <StyledNavItem>
                <NoteAdd /> <span> Submit new Complain</span>
              </StyledNavItem>
            </Link>
          </>
        )}
        {user.role == FACILITY && (
          <>
            <Link to="/my-complaints" style={{ textDecoration: "none" }}>
              <StyledNavItem>
                <SubjectSharp /> <span> My Complaints</span>
              </StyledNavItem>
            </Link>
            <Link to="/received-complaints" style={{ textDecoration: "none" }}>
              <StyledNavItem>
                <SubjectSharp /> <span> Received Complaints</span>
              </StyledNavItem>
            </Link>
            <Link to="/add-new-complaints" style={{ textDecoration: "none" }}>
              <StyledNavItem>
                <NoteAdd /> <span> Submit new Complain</span>
              </StyledNavItem>
            </Link>
          </>
        )}
        {user.role == ADMIN && (
          <>
            <Link to="/add-catagories" style={{ textDecoration: "none" }}>
              <StyledNavItem>
                <AddBox /> <span> Add Catagories</span>
              </StyledNavItem>
            </Link>
            <Link to="/add-department" style={{ textDecoration: "none" }}>
              <StyledNavItem>
                <AddBox /> <span> Add Department</span>
              </StyledNavItem>
            </Link>
            <Link to="/add-roles" style={{ textDecoration: "none" }}>
              <StyledNavItem>
                <AddBox /> <span> Add Roles</span>
              </StyledNavItem>
            </Link>
          </>
        )}
        <Box
          sx={{
            paddingTop: "7rem",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <Link to="/profile-setting" style={{ textDecoration: "none" }}>
            <StyledNavItem>
              <Settings />
              <span> Profile Settings</span>
            </StyledNavItem>
          </Link>
          <Link onClick={handleLogout} style={{ textDecoration: "none" }}>
            <StyledNavItem>
              <ExitToApp />
              <span> Logout</span>
            </StyledNavItem>
          </Link>
        </Box>
      </Box>
    </Card>
  );
};

export default SideNav;

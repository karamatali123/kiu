import React from "react";
import { useState } from "react";
import Logo from "../assests/Images/logo.svg";
import MyButton from "./gernal/Button";

import { AppBar, Avatar, Box, Container, Toolbar } from "@mui/material";
import { useAuth } from "../provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";

const PublicHeader = () => {
  const { pathname } = useLocation();

  const [anchorElNav, setAnchorElNav] = useState();

  const { user, handleUserLogout } = useAuth();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    handleUserLogout(navigate);
  };

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "white", color: "black" }}
    >
      <Container>
        <Toolbar
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link to="/">
            <img src={Logo} style={{ height: "50px" }} alt="circle img" />
          </Link>

          <Box
            style={{
              display: { xs: "block", lg: "none" },
              alignItems: "center",
            }}
          >
            <MyButton
              variant={"text"}
              text="Contact us"
              style={{ color: "#444444" }}
            />
            <MyButton
              variant={"contained"}
              text={pathname == "/login" ? "Sign Up" : "Login"}
              style={{
                color: "#fff",
                margin: "5px",
                backgroundColor: "#003A91",
              }}
              size={"large"}
              onClick={() => {
                if (pathname == "/login") {
                  navigate("/signup");
                } else navigate("/login");
              }}
            />

            {/* <AccountCircleIcon style={{ color: '#1976d2',height:"30px",width:"30px" }} /> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default PublicHeader;

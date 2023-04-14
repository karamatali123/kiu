import React from "react";
import { useState } from "react";
import Logo from "../assests/Images/logo.svg";
import MyButton from "./gernal/Button";

import { makeStyles } from "@material-ui/styles";

import { AppBar, Avatar, Box, Container, Toolbar } from "@material-ui/core";
import { useAuth } from "../provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const PublicHeader = () => {
  const classes = useStyles();
  const { pathname } = useLocation();

  const [anchorElNav, setAnchorElNav] = useState();

  const { user, handleUserLogout } = useAuth();
  const navigate = useNavigate();
  console.log(user, "userrr");

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
          <img src={Logo} style={{ height: "50px" }} alt="circle img" />

          <Box className={classes.buttons}>
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

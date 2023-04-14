import React from "react";
import { useState } from "react";
import Logo from "../assests/Images/logo.svg";
import MyButton from "./gernal/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/styles";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useAuth } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { Person, Slideshow } from "@material-ui/icons";
import DesktopMenu from "./layout/MobileSideNav";
const pages = ["Home", "About us", "Stories", "Vc Office"];

const useStyles = makeStyles((theme) => ({
  Menu: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  links: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  icon: {
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const ResponsiveAppBar = () => {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const [signIn, setSignIn] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = useState();

  const { user, handleUserLogout, authStatus } = useAuth();
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
          <Menu
            style={{
              display: { xs: "block", md: "none", xl: "none" },
              fontSize: "17px",
            }}
          />
          {/* <Box className={classes.links}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                style={{ my: 1, color: "black", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box> */}
          {isOpen && <DesktopMenu isOpen={isOpen} setIsOpen={setIsOpen} />}
          {authStatus && (
            <div
              onClick={() => {
                setIsOpen(true);
              }}
              className={classes.icon}
            >
              <Slideshow className={classes.icon} />
            </div>
          )}
          <img src={Logo} style={{ height: "50px" }} alt="circle img" />
          <Box className={classes.Menu}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              className={classes.Menu}
            >
              <Box
                display={"flex"}
                alignItems="center"
                justifyContent={"center"}
                flexDirection={"column"}
                gap="15px"
              >
                <MyButton
                  variant={"text"}
                  text="Contact us"
                  style={{ color: "#003A91", width: "90%" }}
                />
                {authStatus ? (
                  <MyButton
                    variant={"contained"}
                    text={"Logout"}
                    style={{
                      width: "90%",
                      margin: "4px",
                      backgroundColor: "#c2e8fe",
                    }}
                    onClick={handleLogout}
                  />
                ) : (
                  <>
                    <MyButton
                      variant={"contained"}
                      text={"Sign Up"}
                      style={{ width: "90%", margin: "4px" }}
                      onClick={() => {
                        navigate("/signup");
                      }}
                    />
                    <MyButton
                      variant={"outlined"}
                      text={"Sign in"}
                      style={{ width: "90%" }}
                      onClick={() => {
                        navigate("/login");
                      }}
                    />
                  </>
                )}
              </Box>
            </Menu>
          </Box>

          <Box className={classes.buttons}>
            <MyButton
              variant={"text"}
              text="Contact us"
              style={{ color: "#444444" }}
            />
            {authStatus ? (
              <>
                <Button
                  variant={"contained"}
                  title="Logout"
                  style={{
                    color: "#fff",
                    margin: "5px",
                    backgroundColor: "#003A91",
                  }}
                  size={"large"}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                {
                  <Typography variant="body1" style={{ padding: "1rem" }}>
                    {user?.firstName} &nbsp;{user?.lastName}
                  </Typography>
                }
                <Link to="/profile-setting">
                  <Avatar>
                    <Person />
                  </Avatar>
                </Link>
              </>
            ) : (
              <>
                <MyButton
                  variant={"contained"}
                  text={"Sign Up"}
                  style={{
                    color: "#fff",
                    margin: "5px",
                    backgroundColor: "#003A91",
                  }}
                  size={"large"}
                  onClick={() => {
                    navigate("/signup");
                  }}
                />
                <MyButton
                  variant={"outlined"}
                  text={"Sign in"}
                  size={"large"}
                  style={{ color: "#444444", margin: "5px" }}
                  onClick={() => {
                    navigate("/login");
                  }}
                />
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;

import React from "react";
import { useState } from "react";
import Logo from "../assests/Images/logo.svg";
import MyButton from "./gernal/Button";

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
} from "@mui/material";
import { useAuth } from "../provider/AuthProvider";
import DragHandleOutlinedIcon from "@mui/icons-material/DragHandleOutlined";
import { Link, useNavigate } from "react-router-dom";

import DesktopMenu from "./layout/MobileSideNav";
import { MenuBook, Person, Slideshow } from "@mui/icons-material";
const pages = ["Home", "About us", "Stories", "Vc Office"];

const ResponsiveAppBar = () => {
  // const [open, setOpen] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const [signIn, setSignIn] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = useState();

  const { user, handleUserLogout, authStatus } = useAuth();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setIsOpen(true);
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
              display: { xs: "block", lg: "none" },
              fontSize: "17px",
            }}
          />

          {isOpen && <DesktopMenu isOpen={isOpen} setIsOpen={setIsOpen} />}
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            sx={{ display: { sm: "block", md: "none" } }}
            color="inherit"
          >
            <DragHandleOutlinedIcon />
          </IconButton>
          <img src={Logo} style={{ height: "50px" }} alt="circle img" />
          <Box sx={{ display: { xs: "block", lg: "none" } }}>
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

          <Box
            style={{
              display: { xs: "none", md: "flex" },
            }}
          >
            {authStatus ? (
              <Box display={"flex"}>
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

                <Typography
                  variant="body1"
                  style={{
                    padding: "1rem",
                    display: { xs: "none", md: "block" },
                  }}
                >
                  {user?.firstName} &nbsp;{user?.lastName}
                </Typography>

                <Link to="/profile-setting">
                  <Avatar>
                    <Person />
                  </Avatar>
                </Link>
              </Box>
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

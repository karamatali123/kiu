import { Card } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/styles";
import logo from "../assests/Images/logo.svg";
import { Link } from "react-router-dom";
import { StyledNavItem } from "./layout/styles";
import { Box } from "@mui/material";
import { ExitToApp, NoteAdd, Settings, SubjectSharp } from "@material-ui/icons";

const userItems = ["My Complaints", "Submit new Complain "];

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "8px",
    position: "relative",
    maxWidth: "260px",
    height: "calc(100vh - 100px)",
    width: "100%",
    margin: "unset",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    padding: "2rem 0",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  logo: {
    width: "50px",
    height: "50px",
  },
}));

const SideNav = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div>
        <img src={logo} className={classes.logo}></img>
      </div>
      <Box paddingY={"2rem"}>
        <Link to="/my-complaints" style={{ textDecoration: "none" }}>
          <StyledNavItem
          // sx={{
          //   backgroundColor:
          //     activeTab === 1 ? "#00000011" : theme.palette.white,
          // }}
          >
            <SubjectSharp /> <span> My Complaints</span>
          </StyledNavItem>
        </Link>
        <Link to="/add-new-complaints" style={{ textDecoration: "none" }}>
          <StyledNavItem
          // sx={{
          //   backgroundColor:
          //     activeTab === 1 ? "#00000011" : theme.palette.white,
          // }}
          >
            <NoteAdd /> <span> Submit new Complain</span>
          </StyledNavItem>
        </Link>
        <Box
          sx={{
            paddingTop: "7rem",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <Link to="/profile-setting" style={{ textDecoration: "none" }}>
            <StyledNavItem
            // sx={{
            //   backgroundColor:
            //     activeTab === 1 ? "#00000011" : theme.palette.white,
            // }}
            >
              <Settings />
              <span> Profile Settings</span>
            </StyledNavItem>
          </Link>
          <Link to="/my-requests" style={{ textDecoration: "none" }}>
            <StyledNavItem
            // sx={{
            //   backgroundColor:
            //     activeTab === 1 ? "#00000011" : theme.palette.white,
            // }}
            >
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

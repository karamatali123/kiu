import React from "react";
import { Box, Drawer, Card } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import logo from "../../assests/Images/logo.svg";
import { StyledNavItem } from "./styles";
import { ExitToApp, NoteAdd, Settings, SubjectSharp } from "@material-ui/icons";

export default function DesktopMenu({ isOpen, setIsOpen, scroll }) {
  const classes = useStyles();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  const list = (anchor) => (
    <Card
      sx={{
        backgroundColor: "#fff",
        borderRadius: "8px",
        position: "relative",
        maxWidth: "260px",
        width: "100%",
        margin: "unset",
        padding: "2rem 1rem",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <Box py={1}>
        <img
          width={"100px"}
          src={logo}
          alt="logo"
          style={{ margin: "0 auto", width: "50px" }}
        />
      </Box>
      <Box>
        {/* <Divider
          sx={{
            backgroundImage: theme.palette.gradient,
            opacity: "0.25",
            backgroundColor: "transparent",
          }}
        /> */}

        <Box
          sx={{ display: "flex", flexDirection: "column", rowGap: "5px" }}
          py={1.5}
        >
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
          <Box
            sx={{
              paddingTop: "7rem",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <Link to="/my-requests" style={{ textDecoration: "none" }}>
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
      </Box>
    </Card>
  );
  const anchor = "left";
  return (
    <div>
      <React.Fragment key={anchor}>
        <Drawer
          anchor={anchor}
          className={classes.Drawer}
          open={isOpen}
          variant="pr"
          onClose={toggleDrawer(false)}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  Drawer: {
    "& .MuiDrawer-paper": {
      backgroundColor: `#fff`,
      height: "100vh !important",
      width: 270,
      color: `#fff`,
    },
  },
  list: {
    "&:nth-of-type(1)": {
      color: `#fff`,
    },
  },
}));

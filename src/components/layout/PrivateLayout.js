import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import SideNav from "../SideNav";
import Header from "../Header";
import { Slideshow } from "@material-ui/icons";
import DesktopMenu from "./MobileSideNav";

const useStyles = makeStyles((theme) => ({
  [theme.breakpoints.down("md")]: {
    display: "block",
    gridTemplateColumns: "unset",
  },
}));

const PrivateLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <Container maxWidth={false} disableGutters sx={{ overflow: "hidden" }}>
      <Box
        sx={{
          display: { lg: "grid", md: "flex" },
          gridTemplateColumns: { lg: "304px 1fr", md: "30px 1fr" },
          height: "100vh",
          overflow: "hidden",
          columnGap: "10px",
          // padding: "10px",
          background: "#f1f1f1",
        }}
      >
        <div>
          <SideNav />
        </div>
        <div>
          <Header />
          <Box pt={"10px"}>{children}</Box>
        </div>
      </Box>
    </Container>
  );
};

export default PrivateLayout;

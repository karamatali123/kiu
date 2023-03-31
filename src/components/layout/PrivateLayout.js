import React from "react";
import { Box, Container } from "@mui/material";
import SideNav from "../SideNav";
import Header from "../Header";

const PrivateLayout = ({ children }) => {
  return (
    <Container maxWidth={false} disableGutters sx={{ overflow: "hidden" }}>
      <Box
        sx={{
          display: { lg: "grid", md: "flex" },
          gridTemplateColumns: { lg: "304px 1fr", md: "30px 1fr" },
          height: "100vh",
          overflow: "hidden",
          // columnGap: "10px",
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

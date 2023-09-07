import React from "react";
import { Box, Container } from "@mui/material";
import SideNav from "../SideNav";
import Header from "../Header";

const PrivateLayout = ({ children }) => {
  return (
    <Container maxWidth={false} disableGutters sx={{ overflow: "hidden" }}>
      <Box
        sx={{
          display: { sm: "flex", lg: "grid" },
          gridTemplateColumns: "304px 1fr",
          height: "100vh",
          overflow: "hidden",

          background: "#f1f1f1",
        }}
      >
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <SideNav />
        </Box>
        <div>
          <Header />
          <Box pt={"10px"}>{children}</Box>
        </div>
      </Box>
    </Container>
  );
};

export default PrivateLayout;

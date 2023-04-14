import { Box } from "@mui/material";
import React from "react";
import Registeras from "../../components/gernal/RegisterAs";
import Header from "../../components/PublicHeader";

const RegisterAs = () => {
  return (
    <div>
      <Header />
      <Box py="150px" px="10px">
        <Registeras />
      </Box>
    </div>
  );
};

export default RegisterAs;

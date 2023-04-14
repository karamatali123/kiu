import { Box } from "@mui/material";
import React from "react";
import Signup from "../../components/gernal/Popup";
import Header from "../../components/PublicHeader";

const SignUp = () => {
  return (
    <div>
      <Header />
      <Box py="70px" px="10px">
        <Signup />
      </Box>
    </div>
  );
};

export default SignUp;

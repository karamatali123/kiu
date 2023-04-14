import { Box } from "@mui/material";
import React from "react";
import SignIn from "../../components/gernal/SignInPopUp";
import Header from "../../components/PublicHeader";

const Login = () => {
  return (
    <div>
      <Header />
      <Box py="70px" px="10px">
        <SignIn />
      </Box>
    </div>
  );
};

export default Login;

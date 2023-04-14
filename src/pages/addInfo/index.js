import { Box } from "@mui/material";
import React from "react";
import AddAcademicInfo from "../../components/gernal/AcadamicInfo";
import SignIn from "../../components/gernal/SignInPopUp";
import Header from "../../components/PublicHeader";

const AddInfo = () => {
  return (
    <div>
      <Header />
      <Box py="70px" px="10px">
        <AddAcademicInfo />
      </Box>
    </div>
  );
};

export default AddInfo;

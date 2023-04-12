import { Card } from "@material-ui/core";
import { Typography } from "@mui/material";
import React from "react";
import ProfieCard from "../../components/ProfieCard";

import { useAuth } from "../../provider/AuthProvider";

const AddDepartment = () => {
  const { user } = useAuth();

  return (
    <>
      <Card
        style={{
          height: "calc(100vh - 150px)",
          padding: "2rem",
          overflowY: "scroll",
        }}
      >
        <Typography variant="h4">Add Department</Typography>
      </Card>
    </>
  );
};

export default AddDepartment;

import { Card } from "@material-ui/core";
import { Typography } from "@mui/material";
import React from "react";

import { useAuth } from "../../provider/AuthProvider";

const AddCatagories = () => {
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
        <Typography variant="h4">Add Catagories</Typography>
      </Card>
    </>
  );
};

export default AddCatagories;

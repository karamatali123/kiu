import { Card, Typography } from "@mui/material";
import React from "react";
import AddRoleForm from "./AddRoleForm";
const AddRoles = () => {
  return (
    <>
      <Card
        style={{
          height: "calc(100vh - 150px)",
          padding: "2rem",
          overflowY: "scroll",
        }}
      >
        <Typography variant="h4">Add Roles</Typography>
        <AddRoleForm />
      </Card>
    </>
  );
};

export default AddRoles;

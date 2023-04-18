import { Card, Paper } from "@material-ui/core";
import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import AddCatagoriesForm from "../../components/gernal/AddCatagoriesForm";
import CatagoriesList from "../../components/gernal/CatagoriesList";

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
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper style={{ height: "150px", padding: "50px 10px" }}>
              <Typography variant="h5">Add Catagories</Typography>
              <AddCatagoriesForm />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper style={{ height: "fit-content", padding: "50px 10px" }}>
              <CatagoriesList />
            </Paper>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default AddCatagories;

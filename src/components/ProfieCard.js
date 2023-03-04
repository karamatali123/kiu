import { Typography } from "@material-ui/core";
import { Stack, Card, Grid } from "@mui/material";
import React from "react";

const ProfieCard = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs="12" sm={12} md={6}>
        <Card sx={{ padding: "2rem" }}>
          <Typography variant="h4">Personal Information</Typography>
          <Stack mt={"2rem"}>
            <Typography variant="body1">First Name</Typography>
          </Stack>
          <Stack mt={"2rem"}>
            <Typography variant="body1">Last Name</Typography>
          </Stack>
          <Stack mt={"2rem"}>
            <Typography variant="body1">Father Name</Typography>
          </Stack>
        </Card>
      </Grid>
      <Grid item xs="12" sm={12} md={6}>
        <Card sx={{ padding: "2rem" }}>
          <Typography variant="h4">Contact Information</Typography>
          <Stack mt={"2rem"}>
            <Typography variant="body1">Email</Typography>
          </Stack>
          <Stack mt={"2rem"}>
            <Typography variant="body1">Contact</Typography>
          </Stack>
          <Stack mt={"2rem"}>
            <Typography variant="body1">Secondary Email</Typography>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfieCard;

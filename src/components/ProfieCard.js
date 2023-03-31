import { Typography } from "@material-ui/core";
import { Stack, Card, Grid } from "@mui/material";
import React from "react";

const ProfieCard = ({ user }) => {
  console.log(user, "user");
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs="12" sm={12} md={6}>
        <Card sx={{ padding: "2rem" }}>
          <Typography variant="h4">Personal Information</Typography>
          <Stack mt={"2rem"} direction="row" gap={"20px"}>
            <Typography variant="body1">First Name :</Typography>
            <Typography variant="body1">{user?.firstName}</Typography>
          </Stack>
          <Stack mt={"2rem"} direction="row" gap={"20px"}>
            <Typography variant="body1">{user?.firstName}</Typography>
            <Typography variant="body1">{user?.lastName}</Typography>
          </Stack>
          <Stack mt={"2rem"}>
            <Typography variant="body1">Father Name</Typography>
          </Stack>
        </Card>
      </Grid>
      <Grid item xs="12" sm={12} md={6}>
        <Card sx={{ padding: "2rem" }}>
          <Typography variant="h4">Contact Information</Typography>
          <Stack mt={"2rem"} direction="row" gap={"20px"}>
            <Typography variant="body1">Email</Typography>
            <Typography variant="body1">{user?.email}</Typography>
          </Stack>
          <Stack mt={"2rem"}>
            <Typography variant="body1">Contact</Typography>
          </Stack>
          <Stack mt={"2rem"}>
            <Typography variant="body1">Secondary Email</Typography>
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Card sx={{ padding: "2rem" }}>
          <Typography variant="h4">Academic Information</Typography>
          <Stack mt={"2rem"} direction="row" gap={"20px"}>
            <Typography variant="body1">Department Name</Typography>
            <Typography variant="body1">
              {user?.academicInfo?.dptName}
            </Typography>
          </Stack>
          <Stack mt={"2rem"} direction="row" gap={"20px"}>
            <Typography variant="body1">Program</Typography>
            <Typography variant="body1">
              {user?.academicInfo?.program}
            </Typography>
          </Stack>
          <Stack mt={"2rem"} direction="row" gap={"20px"}>
            <Typography variant="body1">Semester</Typography>
            <Typography variant="body1">
              {user?.academicInfo?.semester}
            </Typography>
          </Stack>
          <Stack mt={"2rem"} direction="row" gap={"20px"}>
            <Typography variant="body1">Registration Number</Typography>
            <Typography variant="body1">{user?.academicInfo?.regNo}</Typography>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfieCard;

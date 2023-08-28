import { Card, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { db } from "../../firebase";

import { useAuth } from "../../provider/AuthProvider";
import DataTable from "./Table";

const ReceivedComplaints = () => {
  return (
    <>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          height: "100%",
        }}
      >
        <Card sx={{ height: "calc(100vh - 147px)", padding: "30px" }}>
          <Typography variant="h4">Received Complaints</Typography>
          <DataTable />
        </Card>
      </Container>
    </>
  );
};

export default ReceivedComplaints;

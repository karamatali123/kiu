import { Card, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ComplaintCard from "../../components/complaints/ComplaintCard";
import { db } from "../../firebase";

import { useAuth } from "../../provider/AuthProvider";
import DataTable from "./Table";

const MyComplaints = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);

  const getComplaints = async () => {
    try {
      const q = query(
        collection(db, "complaints"),
        where("authorId", "==", user.uid)
      );
      let docData = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data(), "date");
        docData.push(doc.data());
        setComplaints(docData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getComplaints();
    }
  }, [user]);
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
          <Typography variant="h4">My Complaints</Typography>
          <DataTable />
        </Card>
      </Container>
    </>
  );
};

export default MyComplaints;

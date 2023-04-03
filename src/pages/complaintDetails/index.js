import { Card, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ComplaintCard from "../../components/complaints/ComplaintCard";
import { db } from "../../firebase";

import { useAuth } from "../../provider/AuthProvider";

const ComplaintDetails = () => {
  const { id } = useParams();
  console.log(id, "asd");

  const [complaintData, setComplaintData] = useState({});
  console.log(complaintData, "asd");

  const getComplaintDetails = async (id) => {
    const docRef = doc(db, "complaints", id);
    try {
      const res = await getDoc(docRef);
      setComplaintData(res.data());
    } catch (error) {
      console.log(error.message, "error");
    }
  };

  useEffect(() => {
    getComplaintDetails(id);
  }, []);
  return (
    <>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          height: "100%",
        }}
      >
        <Card
          sx={{
            height: "calc(100vh - 147px)",
            padding: "30px",
            overflow: "scroll",
          }}
        >
          <Typography variant="h4">My Complaints</Typography>
          <ComplaintCard complaint={complaintData} />
        </Card>
      </Container>
    </>
  );
};

export default ComplaintDetails;

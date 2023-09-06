import { StaticDatePicker } from "@mui/lab";
import { Card, CircularProgress, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ComplaintCard from "../../components/complaints/ComplaintCard";
import Loading from "../../components/gernal/Loading";
import { db } from "../../firebase";

import { useAuth } from "../../provider/AuthProvider";

const ComplaintDetails = () => {
  const { id } = useParams();
  console.log(id, "asd");

  const [complaintData, setComplaintData] = useState({});
  const [loading, setLoading] = useState(true);

  const getComplaintDetails = async (id) => {
    const docRef = doc(db, "complaints", id);
    try {
      const res = await getDoc(docRef);
      setComplaintData(res.data());
      setLoading(false);
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
          overflow: "scroll",
        }}
      >
        <Card
          style={{
            height: "calc(100vh - 150px)",
            padding: "2rem",
            overflowY: "scroll",
          }}
        >
          <Typography variant="h4">Complaint Details</Typography>
          {loading ? (
            <Loading />
          ) : (
            <ComplaintCard
              complaint={complaintData}
              getComplaintDetails={getComplaintDetails}
            />
          )}
        </Card>
      </Container>
    </>
  );
};

export default ComplaintDetails;

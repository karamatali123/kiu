import { Card, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TrackStepper from "../../components/gernal/TrackStepper";
import { db } from "../../firebase";

const TrackComplaint = () => {
  const { id } = useParams();
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
  console.log(complaintData, "cd");
  return (
    <Card
      style={{
        height: "calc(100vh - 150px)",
        padding: "4rem",
        overflowY: "scroll",
      }}
    >
      <Typography variant="h4">Track Complaint</Typography>
      <Card
        style={{
          height: "calc(100vh - 450px)",
          padding: "4rem",
          overflowY: "hidden",
        }}
      >
        <Stack alignItems={"center"} height="100%" justifyContent={"center"}>
          <TrackStepper
            steps={complaintData?.track}
            activeStep={complaintData?.track?.length}
          />
        </Stack>
      </Card>
    </Card>
  );
};

export default TrackComplaint;

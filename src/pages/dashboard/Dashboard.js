import { Card, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ComplaintCountCard from "./components/ComplaintCountCard";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import FeedRoundedIcon from "@mui/icons-material/FeedRounded";
import InboxIcon from "@mui/icons-material/Inbox";
import AutoAwesomeMotionRoundedIcon from "@mui/icons-material/AutoAwesomeMotionRounded";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../../provider/AuthProvider";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { complaintStatus } from "../../constants/complaintStatus";

const Dashboard = () => {
  const iconStyles = {
    width: "70px",
    height: "70px",
    color: "#fff",
  };
  const [complaints, setComplaints] = useState([]);
  const [receivedComplaints, setReceivedComplaints] = useState([]);
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams({});
  const navigate = useNavigate();
  console.log(user, receivedComplaints);
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

  const getReceivedComplaints = async () => {
    try {
      const q = query(
        collection(db, "complaints"),
        where("assigneeId", "==", user.uid)
      );
      let docData = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        docData.push(doc.data());
        setReceivedComplaints(docData);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getComplaints();
    getReceivedComplaints();
  }, []);

  const getPendingComplaints = () => {
    const pending = complaints.filter(
      (complaint) => complaint.status == "pending"
    );
    return pending.length;
  };
  const getInProgressComplaints = () => {
    const progess = complaints.filter(
      (complaint) => complaint.status == "Received"
    );
    return progess.length;
  };
  const getResolvedComplaints = () => {
    const resolved = complaints.filter(
      (complaint) => complaint.status == "Resolved"
    );
    return resolved.length;
  };
  return (
    <Card
      style={{
        height: "calc(100vh - 150px)",
        padding: "2rem",
        overflowY: "scroll",
      }}
    >
      <Typography variant="h4">Dashboard</Typography>
      <Stack direction={"row"} gap="20px" mt={"40px"} flexWrap="wrap">
        <ComplaintCountCard
          title={"Total Complaints"}
          icon={<AutoAwesomeMotionRoundedIcon sx={iconStyles} />}
          sx={{ backgroundColor: "#ffb70d" }}
          count={complaints.length}
          onClick={() => {
            navigate("/my-complaints");
          }}
        />
        <ComplaintCountCard
          title={"Resolved Complaints"}
          icon={<AssignmentTurnedInOutlinedIcon sx={iconStyles} />}
          sx={{ backgroundColor: "#34a853" }}
          count={getResolvedComplaints()}
          onClick={() => {
            navigate(`/my-complaints?status=${complaintStatus.RESOLVED}`);
          }}
        />
        <ComplaintCountCard
          title={"Pending complaints"}
          icon={<PendingActionsOutlinedIcon sx={iconStyles} />}
          sx={{ backgroundColor: "#dc143c" }}
          count={getPendingComplaints()}
          onClick={() => {
            navigate(`/my-complaints?status=${complaintStatus.PENDING}`);
          }}
        />
        <ComplaintCountCard
          title={"Complaints In Progress"}
          icon={<InboxIcon sx={iconStyles} />}
          sx={{ backgroundColor: "#ffb70d" }}
          count={getInProgressComplaints()}
          onClick={() => {
            navigate(`/my-complaints?status=${complaintStatus.RECEIVED}`);
          }}
        />

        {user.role === "facility" && (
          <ComplaintCountCard
            title={"Received complaints"}
            icon={<InboxIcon sx={iconStyles} />}
            sx={{ backgroundColor: "#673ab7" }}
            count={receivedComplaints.length}
            onClick={() => {
              navigate(`/my-complaints?status=${complaintStatus.RECEIVED}`);
            }}
          />
        )}

        <ComplaintCountCard
          title={"Suggestions"}
          icon={<FeedRoundedIcon sx={iconStyles} />}
          sx={{ backgroundColor: "#1266F1" }}
          count={""}
        />
      </Stack>
    </Card>
  );
};

export default Dashboard;

import { Card, Stack, Typography } from "@mui/material";
import React from "react";
import ComplaintCountCard from "./components/ComplaintCountCard";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import FunctionsSharpIcon from "@mui/icons-material/FunctionsSharp";

const Dashboard = () => {
  const iconStyles = {
    width: "70px",
    height: "70px",
    color: "#fff",
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
      <Stack direction={"row"} gap="20px" mt={"40px"}>
        <ComplaintCountCard
          title={"total Complaints"}
          icon={<FunctionsSharpIcon sx={iconStyles} />}
          sx={{ backgroundColor: "#996312" }}
          count="20"
        />
        <ComplaintCountCard
          title={"Resolved Complaints"}
          icon={<AssignmentTurnedInOutlinedIcon sx={iconStyles} />}
          sx={{ backgroundColor: "#003a91" }}
          count={10}
        />
        <ComplaintCountCard
          title={"Pending complaints"}
          icon={<PendingActionsOutlinedIcon sx={iconStyles} />}
          sx={{ backgroundColor: "#996312" }}
          count="10"
        />
      </Stack>
    </Card>
  );
};

export default Dashboard;

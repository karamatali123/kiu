import { Chip } from "@mui/material";
import React from "react";
import { complaintStatus } from "../../constants/complaintStatus";

const StatusChip = ({ status }) => {
  return (
    <Chip
      label={status}
      sx={{
        borderRadius: "2px",
        fontSize: "17px",
        height: "36px",
        color: "#fff",
        borderRadius: "5px",
        backgroundColor:
          status == complaintStatus.PENDING
            ? "#F2143F"
            : status == complaintStatus.RESOLVED
            ? "#288140"
            : "#1266F1",
      }}
    />
  );
};

export default StatusChip;

import * as React from "react";
import Dialog from "@mui/material/Dialog";
import ComplaintForm from "../../components/complaints/ComplaintForm";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export default function SubmitComplaintModal({ open, setOpen }) {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/login");
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        ".MuiDialog-paper": {
          maxWidth: "1200px",
        },
      }}
    >
      <ComplaintForm />
    </Dialog>
  );
}

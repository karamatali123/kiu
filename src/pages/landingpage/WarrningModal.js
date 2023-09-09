import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import SubmitComplaintModal from "./SubmitComplaintModal";

export default function WarrningModal({ open, setOpen }) {
  const [openForm, setOpenForm] = React.useState();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/login");
    setOpen(false);
  };

  return (
    <div>
      <SubmitComplaintModal open={openForm} setOpen={setOpenForm} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">Warning:</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description" fontSize={"20px"}>
            Join our Complaint Management portal for better experience
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>login</Button>
          <Button
            onClick={() => {
              setOpenForm(true);
              setOpen(false);
            }}
            autoFocus
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

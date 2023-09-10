import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import SubmitComplaintModal from "./SubmitComplaintModal";
import { Warning } from "@mui/icons-material";
import { Stack } from "@mui/material";

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
          <Stack direction={"row"} alignItems="center" gap="8px">
            <Warning sx={{ width: "40px", height: "40px", color: "#F6F810" }} />{" "}
            <DialogContentText id="alert-dialog-description" fontSize={"20px"}>
              Login is highly recommended as you can track the progress of your
              complaint and also access value added features
            </DialogContentText>
          </Stack>
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

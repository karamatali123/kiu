import { React, useEffect, forwardRef, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { SUCCESS } from "../../constants/snackbarConstant";
import { useAuth } from "../../provider/AuthProvider";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const [open, setOpen] = useState(false);
  const onClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const { snackbarOpen, snackbarType, message, closeSnackbar } = useAuth();

  useEffect(() => {
    if (snackbarOpen) {
      setOpen(true);
    }
  }, [snackbarOpen]);

  setTimeout(() => {
    closeSnackbar();
    setOpen(false);
  }, 7000);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      style={{
        backgroundColor: snackbarType === SUCCESS ? "#478e47" : "red",
      }}
    >
      <Alert
        onClose={onClose}
        severity={snackbarType}
        style={{
          width: "100%",
          backgroundColor: snackbarType === SUCCESS && "#478e47",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

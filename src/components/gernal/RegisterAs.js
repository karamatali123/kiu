import * as React from "react";
import "../../App.css";
import { Box, Button, Dialog } from "@material-ui/core";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import MyButton from "./Button";
import { useAuth } from "../../provider/AuthProvider";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { async } from "@firebase/util";
import { useState } from "react";
import AcademicInfo from "./AcadamicInfo";
import { useNavigate } from "react-router-dom";
import { AUTH_STATUS } from "../../provider/AuthProvider/reducer";

function SimpleDialog(props) {
  const { onClose, open, setOpen } = props;
  const [showAcademic, setShowAcademic] = useState(false);
  const { uid, dispatch } = useAuth();
  const navigate = useNavigate();
  console.log(showAcademic, "user");

  const handleClose = () => {
    onClose(open);
  };
  const handleOnClick = async (role) => {
    const docRef = doc(db, "users", uid);

    try {
      await updateDoc(docRef, {
        role: role,
      });
      setShowAcademic(true);
      console.log("Document updated successfully");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };
  const handleClick = async (role) => {
    const docRef = doc(db, "users", uid);

    try {
      await updateDoc(docRef, {
        role: role,
      });
      dispatch({
        type: AUTH_STATUS,
        payload: true,
      });
      setOpen(false);
      navigate("/my-complaints");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };
  return (
    <>
      {!showAcademic ? (
        <Dialog
          onClose={handleClose}
          aria-labelledby="simple-dialog-title"
          open={open}
          fullWidth
          style={{ height: "fit-content" }}
        >
          <Box p={"30px"}>
            <Typography variant="h4" textAlign={"center"}>
              Register As
            </Typography>
            <Stack gap="30px" p={"30px"}>
              <MyButton
                variant={"contained"}
                text=" Register As Student"
                style={{ backgroundColor: "#996312 !important" }}
                onClick={() => {
                  handleOnClick("student");
                }}
              />
              <MyButton
                variant={"contained"}
                text="Register As facility"
                onClick={() => {
                  handleClick("facility");
                }}
              />
            </Stack>
          </Box>
        </Dialog>
      ) : (
        <AcademicInfo open={showAcademic} setOpen={setShowAcademic} />
      )}
    </>
  );
}

export default function RegisterAs({ open, setOpen }) {
  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <br />
      <SimpleDialog open={open} setOpen={setOpen} onClose={handleClose} />
    </div>
  );
}

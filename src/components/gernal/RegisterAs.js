import * as React from "react";
import "../../App.css";
import { Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import MyButton from "./Button";
import { useAuth } from "../../provider/AuthProvider";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_STATUS } from "../../provider/AuthProvider/reducer";

export default function RegisterAs(props) {
  const { onClose, open, setOpen } = props;
  const [showAcademic, setShowAcademic] = useState(false);
  const { uid, dispatch } = useAuth();
  const navigate = useNavigate();
  console.log(showAcademic, "user");

  const handleOnClick = async (role) => {
    const docRef = doc(db, "users", uid);

    try {
      await updateDoc(docRef, {
        role: role,
      });
      navigate("/addInfo");
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
      <Paper
        p={"30px"}
        sx={{
          maxWidth: "600px",
          margin: "auto",
          padding: "20px",
          boxShadow: "1px 2px 9px #3a3a3a",
        }}
      >
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
      </Paper>
    </>
  );
}

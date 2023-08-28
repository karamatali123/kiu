import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik } from "formik";
import { InputField } from "../gernal/InputField";
import { ERROR, SUCCESS } from "../../constants/snackbarConstant";
import { SNACKBAR_OPEN } from "../../provider/AuthProvider/reducer";
import * as yup from "yup";
import { object, string } from "yup";
import { db } from "../../firebase";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { Stack } from "@mui/material";
import { ArrowForwardIos, Forward, Send } from "@mui/icons-material";
import { useAuth } from "../../provider/AuthProvider";
import { useState } from "react";
import useGetRoles from "../../api/useGetRoles";
import SelectRole from "../selectRole";

export default function ForwardComplaintBox({ open, setOpen, complaint }) {
  const { user, dispatch } = useAuth();
  const roles = useGetRoles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateComplaint = async (assignee) => {
    const docRef = doc(db, "complaints", complaint.uid);

    try {
      await updateDoc(docRef, {
        assignee: assignee,
      });
      console.log("role update");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };
  const ValidationSchema = object().shape({
    assignee: yup.object().required("Required"),
  });
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Forward Complaint</DialogTitle>
      <Formik
        onSubmit={(values, actions) => {
          updateComplaint(values.assignee);
          console.log(values);
          setOpen(false);
        }}
        validationSchema={ValidationSchema}
        initialValues={{
          comment: "",
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          setFieldValue,
          handleBlur,
        }) => (
          <form onSubmit={handleSubmit}>
            <Stack gap="10px" sx={{ width: "500px", padding: "20px" }}>
              <SelectRole
                options={roles}
                selectlabel={"Role"}
                name="assignee"
                value={values.assignee}
                onChange={(e) => setFieldValue("assignee", e.target.value)}
                onBlur={handleBlur}
                fullWidth={true}
                error={Boolean(errors.assignee)}
                error_message={
                  touched.assignee && errors.assignee && errors.assignee
                }
              />
              <Button
                type="submit"
                variant="contained"
                endIcon={<ArrowForwardIos color="#fff" />}
                sx={{ width: "120px", alignSelf: "center" }}
              >
                Forward
              </Button>
            </Stack>
          </form>
        )}
      </Formik>
    </Dialog>
  );
}

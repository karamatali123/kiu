import * as React from "react";
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
import { collection, doc, setDoc } from "firebase/firestore";
import { Stack } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useAuth } from "../../provider/AuthProvider";

export default function AddCommentBox({ open, setOpen, complaint }) {
  const { user, dispatch } = useAuth();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addComment = async (values, actions) => {
    try {
      const complaintsRef = collection(db, "complaints");

      // Create a reference to a specific document in the "complaints" collection
      const complaintDocRef = doc(complaintsRef, complaint.complaintId);

      // Create a subcollection named "comments" for the document
      const commentsRef = collection(complaintDocRef, "comments");

      const newCommentRef = doc(commentsRef);
      await setDoc(newCommentRef, {
        authorName: `${user.firstName}" " ${user.lastName}`,
        comment: values.comment,
      });
      dispatch({
        type: SNACKBAR_OPEN,
        payload: {
          snackbarType: SUCCESS,
          message: "Comment Added",
        },
      });
      actions.resetForm();
    } catch (error) {
      dispatch({
        type: SNACKBAR_OPEN,
        payload: {
          snackbarType: ERROR,
          message: error.message,
        },
      });
    }
  };

  const ValidationSchema = object().shape({
    comment: yup.string().required("Required"),
  });
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Comment</DialogTitle>
      <Formik
        onSubmit={(values, actions) => {
          addComment(values, actions);
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
          handleBlur,
        }) => (
          <form onSubmit={handleSubmit}>
            <Stack gap="10px" sx={{ width: "500px", padding: "20px" }}>
              <InputField
                type="text"
                name="comment"
                value={values.comment}
                label="Comment"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.comment && touched.comment}
                helperText={errors.comment && touched.comment && errors.comment}
              />
              <Button
                type="submit"
                variant="contained"
                endIcon={<Send color="#fff" />}
                sx={{ width: "120px", alignSelf: "center" }}
              >
                Send
              </Button>
            </Stack>
          </form>
        )}
      </Formik>
    </Dialog>
  );
}

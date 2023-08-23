import { Send } from "@mui/icons-material";
import {
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  Box,
  Card,
  CardMedia,
} from "@mui/material";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { useAuth } from "../../provider/AuthProvider";
import { InputField } from "../gernal/InputField";
import CommentBox from "./CommentBox";

import { Formik } from "formik";
import * as yup from "yup";
import { object, string } from "yup";
import { ERROR, SUCCESS } from "../../constants/snackbarConstant";
import { SNACKBAR_OPEN } from "../../provider/AuthProvider/reducer";

const ValidationSchema = object().shape({
  comment: yup.string().required("Required"),
});

const ComplaintCard = ({ complaint }) => {
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState([]);
  console.log(comments, "comments");
  const { user, dispatch } = useAuth();
  const addComment = async (values, actions) => {
    console.log(values, "values");
    try {
      const complaintsRef = collection(db, "complaints");

      // Create a reference to a specific document in the "complaints" collection
      const complaintDocRef = doc(complaintsRef, complaint.complaintId);

      // Create a subcollection named "comments" for the document
      const commentsRef = collection(complaintDocRef, "comments");

      const newCommentRef = doc(commentsRef);
      await setDoc(newCommentRef, {
        authorName: values.comment,
        comment: comment,
      });
      dispatch({
        type: SNACKBAR_OPEN,
        payload: {
          snackbarType: SUCCESS,
          message: "Comment Added",
        },
      });
      actions.resetForm();
      console.log("done");
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
  const getComments = async () => {
    const complaintsRef = collection(db, "complaints");
    const complaintDocRef = doc(complaintsRef, complaint.complaintId);
    const commentsRef = collection(complaintDocRef, "comments");
    var docData = [];

    getDocs(commentsRef)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          docData.push(doc.data());
          setComments(docData);
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
  useEffect(() => {
    getComments();
  }, []);
  return (
    <Card
      style={{
        height: "fit-content",
        margin: "40px 10px",
        padding: "1.5rem",
        overflow: "hidden",
      }}
    >
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        padding="20px"
      >
        <Box>
          <Typography variant="h5">{complaint.title}</Typography>
          <Typography variant="caption">Submitted To:karamat ali</Typography>
        </Box>
        <Box>
          <Typography variant="h5">Submission Date</Typography>
          <Typography variant="caption">{complaint.date}</Typography>
        </Box>
      </Stack>
      <Divider />

      <Box padding={"100px 10px"}>
        <Box>
          <Typography variant="h5"> Nature Complaint</Typography>
          <Typography variant="body1" style={{ marginTop: "1.5rem" }}>
            {complaint.natureOfComplaint}
          </Typography>
        </Box>
        <Box mt={"30px"}>
          <Typography variant="h5">Complaint Regarding To</Typography>
          <Typography variant="body1" style={{ marginTop: "1.5rem" }}>
            {complaint.natureOfComplaint}
          </Typography>
        </Box>

        <Stack
          flexDirection={"row"}
          justifyContent="space-between"
          alignItems={"center"}
          mt="40px"
        >
          <Chip label="pending" sx={{ borderRadius: "2px" }} />
          {user.uid !== complaint.authorId ? (
            <Formik
              onSubmit={(values, actions) => {
                addComment(values, actions);
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
                  <Stack
                    flexDirection={"row"}
                    alignItems={"flex-start"}
                    gap={"10px"}
                  >
                    <InputField
                      type="text"
                      name="comment"
                      value={values.comment}
                      label="Comment"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.comment && touched.comment}
                      helperText={
                        errors.comment && touched.comment && errors.comment
                      }
                    />
                    <Button type="submit">
                      <Send style={{ fontSize: "40px", color: "#0753c3" }} />
                    </Button>
                  </Stack>
                </form>
              )}
            </Formik>
          ) : (
            <Button
              onClick={() => {
                setShowComment(!showComment);
              }}
            >
              {showComment ? " Hide Comments" : "Show Comments"}
            </Button>
          )}
        </Stack>
        {showComment && (
          <Card style={{ marginTop: "10px" }}>
            {comments.length > 0 ? (
              comments.map((comment) => <CommentBox comment={comment} />)
            ) : (
              <Typography textAlign={"center"} padding="20px">
                No Comments To Show
              </Typography>
            )}
          </Card>
        )}
      </Box>
      <Divider />

      <Box
        my="1rem"
        display={"flex"}
        alignItems="center"
        justifyContent={"end"}
      >
        <Link to={"#"} download style={{ textDecoration: "none" }}>
          <Button title="Download" variant="contained">
            Track Complaint
          </Button>
        </Link>
        <Link
          to={complaint.proof}
          download
          style={{ textDecoration: "none", marginLeft: "10px" }}
        >
          <Button title="Download" variant="contained">
            Download Proof
          </Button>
        </Link>
      </Box>
    </Card>
  );
};

export default ComplaintCard;

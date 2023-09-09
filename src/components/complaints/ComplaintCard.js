import { Send } from "@mui/icons-material";
import {
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  Box,
  Card,
} from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { useAuth } from "../../provider/AuthProvider";
import { ERROR, SUCCESS } from "../../constants/snackbarConstant";
import { InputField } from "../gernal/InputField";
import CommentBox from "./CommentBox";

import MyButton from "../gernal/Button";
import AddCommentBox from "./addCommentBox";
import ForwardComplaintBox from "./farwordComplaintBox";
import { SNACKBAR_OPEN } from "../../provider/AuthProvider/reducer";
import StatusChip from "../gernal/StatusChip";
const ComplaintCard = ({ complaint, getComplaintDetails }) => {
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [showAddComment, setShowaAddComment] = useState(false);
  const [showForwardBox, setShowForwardBox] = useState(false);
  const { user, dispatch } = useAuth();
  const isAuthor = user.uid === complaint.authorId;

  const updateComplaint = async () => {
    const docRef = doc(db, "complaints", complaint.complaintId);

    try {
      await updateDoc(docRef, {
        status: "Resolved",
      })
        .then(() => {
          getComplaintDetails(complaint.complaintId);
          dispatch({
            type: SNACKBAR_OPEN,
            payload: {
              snackbarType: SUCCESS,
              message: "Status updated successfully",
            },
          });
        })
        .catch((err) => {
          dispatch({
            type: SNACKBAR_OPEN,
            payload: {
              snackbarType: ERROR,
              message: err.message,
            },
          });
        });
    } catch (e) {
      console.error("Error updating document: ", e);
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
          <Stack direction="row" gap={"10px"} alignItems="center">
            <Typography variant="h5" fontSize="18px" fontWeight={"700"}>
              Complaint title:
            </Typography>
            <Typography>{complaint.title}</Typography>
          </Stack>
          {isAuthor && (
            <Stack direction="row" gap={"10px"} alignItems="center" mt={1}>
              <Typography variant="h5" fontSize="18px" fontWeight={"700"}>
                Submitted TO:
              </Typography>
              <Typography variant="subtitle1" fontSize={"18px"}>
                {`${complaint.assignee.firstName} ${complaint.assignee.lastName} ( ${complaint.assignee.designation})`}
              </Typography>
            </Stack>
          )}
          {!isAuthor && complaint.showIdentity && (
            <Stack direction="row" gap={"10px"} alignItems="center" mt={1}>
              <Typography variant="h5" fontSize="18px" fontWeight={"700"}>
                Submitted By:
              </Typography>
              <Typography variant="subtitle1" fontSize={"18px"}>
                {complaint.name}
              </Typography>
            </Stack>
          )}
          {!isAuthor && !complaint.showIdentity && (
            <Stack direction="row" gap={"10px"} alignItems="center" mt={1}>
              <Typography variant="h5" fontSize="18px" fontWeight={"700"}>
                Identity:
              </Typography>
              <Typography variant="subtitle1" fontSize={"18px"}>
                Hidden
              </Typography>
            </Stack>
          )}
        </Box>
        <Stack gap="10px">
          <Stack direction="row" gap={"10px"} alignItems="center">
            <Typography variant="h5" fontSize="18px" fontWeight={"700"}>
              Submission Date:
            </Typography>
            <Typography variant="subtitle1">{complaint.date}</Typography>
          </Stack>
          <Stack direction="row" gap={"10px"} alignItems="center">
            <Typography variant="h5" fontSize="18px" fontWeight={"700"}>
              Complaint Type :
            </Typography>
            <Typography variant="subtitle1">
              {complaint.category.catagories}
            </Typography>
          </Stack>
          <Stack direction="row" gap={"10px"} alignItems="center">
            <Typography variant="h5" fontSize="18px" fontWeight={"700"}>
              Status:
            </Typography>
            <StatusChip status={complaint.status} />
          </Stack>
        </Stack>
      </Stack>
      <Divider />

      <Box padding={"50px 10px"}>
        <Box>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5" fontSize="20px" fontWeight={"700"}>
              Complaint Description
            </Typography>{" "}
          </Stack>{" "}
          <Typography variant="body1" style={{ marginTop: "1.5rem" }}>
            {complaint.details}
          </Typography>
        </Box>

        <Stack flexDirection={"row"} gap="10px" alignItems={"center"} mt="40px">
          {user.uid !== complaint.authorId ? (
            <Stack direction={"row"} gap="10px" width="100%">
              <MyButton
                variant={"contained"}
                text="Add Comment"
                style={{ color: "#fff", width: "140px" }}
                onClick={() => setShowaAddComment(true)}
              />
              <AddCommentBox
                open={showAddComment}
                setOpen={setShowaAddComment}
                complaint={complaint}
              />
              <MyButton
                variant={"contained"}
                text="Forward"
                style={{ color: "#fff", width: "140px" }}
                onClick={() => setShowForwardBox(true)}
              />
              <ForwardComplaintBox
                open={showForwardBox}
                setOpen={setShowForwardBox}
                complaint={complaint}
              />
            </Stack>
          ) : (
            <Button
              onClick={() => {
                setShowComment(!showComment);
              }}
            >
              {showComment ? " Hide Comments" : "Show Comments"}
            </Button>
          )}
          <Stack direction="row" alignItems="center" gap="10px">
            {user.uid !== complaint.authorId &&
              complaint.status !== "Resolved" && (
                <MyButton
                  variant={"contained"}
                  text=" Resolved"
                  style={{ backgroundColor: "#996312 !important" }}
                  onClick={() => {
                    updateComplaint("student");
                  }}
                />
              )}
          </Stack>
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
        <Link
          to={`/track-complaint/${complaint.complaintId}`}
          download
          style={{ textDecoration: "none" }}
        >
          <Button title="Download" variant="contained">
            Track Complaint
          </Button>
        </Link>
        <a
          href={complaint.proof}
          target="_blank"
          download="proof.jpg"
          style={{ textDecoration: "none", marginLeft: "10px" }}
        >
          <Button
            title="Download"
            variant="contained"
            sx={{ backgroundColor: "#996312 !important" }}
          >
            Download Attachment
          </Button>
        </a>
      </Box>
    </Card>
  );
};

export default ComplaintCard;

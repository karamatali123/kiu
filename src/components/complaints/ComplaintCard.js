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
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { useAuth } from "../../provider/AuthProvider";
import { InputField } from "../gernal/InputField";
import CommentBox from "./CommentBox";

import MyButton from "../gernal/Button";
import AddCommentBox from "./addCommentBox";
import ForwardComplaintBox from "./farwordComplaintBox";

const ComplaintCard = ({ complaint }) => {
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [showAddComment, setShowaAddComment] = useState(false);
  const [showForwardBox, setShowForwardBox] = useState(false);

  const { user, dispatch } = useAuth();

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
          <Typography variant="caption">
            {" "}
            {`${complaint.assignee.firstName}  ${complaint.assignee.lastName} (
                            ${complaint.assignee.designation}
                            )`}
          </Typography>
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

        <Stack flexDirection={"row"} gap="10px" alignItems={"center"} mt="40px">
          <Chip label="pending" sx={{ borderRadius: "2px" }} />
          {user.uid !== complaint.authorId ? (
            <Stack direction={"row"} gap="10px">
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
        <a
          href={complaint.proof}
          target="_blank"
          download="proof.jpg"
          style={{ textDecoration: "none", marginLeft: "10px" }}
        >
          <Button title="Download" variant="contained">
            Download Proof
          </Button>
        </a>
      </Box>
    </Card>
  );
};

export default ComplaintCard;

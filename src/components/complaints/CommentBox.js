import { Box, Typography } from "@material-ui/core";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const CommentBox = ({ comment }) => {
  return (
    <Stack padding="20px">
      <Box padding={"10px"} borderRadius="15px" sx={{ background: "#ebebeb" }}>
        <Typography variant="body1">{comment.authorName}</Typography>
        <Typography variant="body 2">{comment.comment}</Typography>
      </Box>
      <Button
        type="text"
        sx={{
          fontSize: "14px",
          textTransform: "capitalize",
          background: "none",
          width: "40px",
        }}
      >
        Reply
      </Button>
    </Stack>
  );
};

export default CommentBox;

import { Box, Card, CardMedia, Typography } from "@material-ui/core";
import { Button, Chip, Divider, Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ComplaintCard = ({ complaint }) => {
  return (
    <Card
      style={{
        // maxWidth: "900px",
        // margin: "auto",
        height: "fit-content",
        margin: "40px 10px",
        padding: "1.5rem",
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

        <Chip label="pending" sx={{ mt: "20px", borderRadius: "2px" }} />
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

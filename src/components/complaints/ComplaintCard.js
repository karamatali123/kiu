import { Box, Card, CardMedia, Typography } from "@material-ui/core";
import { Stack } from "@mui/material";
import React from "react";

const ComplaintCard = () => {
  return (
    <Card
      style={{
        maxWidth: "900px",
        margin: "auto",
        height: "fit-content",
        marginTop: "2rem",
        padding: "1.5rem",
      }}
    >
      <Stack flexDirection={"row"} justifyContent={"space-between"}>
        <Box>
          <Typography variant="h5">Security Issue</Typography>
          <Typography variant="caption">Submitted To:karamat ali</Typography>
        </Box>
        <Box>
          <Typography variant="h5">Submission Date</Typography>
          <Typography variant="caption">12-01-2019</Typography>
        </Box>
      </Stack>

      <CardMedia
        component="img"
        height="294"
        style={{ margin: "0.5rem 0" }}
        image="https://www.gps-securitygroup.com/wp-content/uploads/2021/04/gps-security-blog-8-April.jpg"
        alt="Paella dish"
      />
      <Typography variant="body1" style={{ marginTop: "0.5rem" }}>
        I am ( name and address and what are you currently doing this time)
        example. I am Marie Scotter that is 40 years old who is working as a
        bank teller in Nbo Bank of the Usa, and encounter the above person when
        picking up my children at School park about 4 in the afternoon. when,
        this said person suddenly shout at me in front of others individual. I
        felt in shame and unaware what kind of rules that i broke, so. i ask him
        politely but. he answered me in disrespectful manners. Remember: Please,
        take not the time, place and events that is happened when you have
        encountered such problem. Read more: Complaint letter regarding bad
        security service? - Please give a sample of complaint letter against
        security guard to his supervisor :: Ask Me Fast at
        https://www.askmefast.com/Complaint_letter_regarding_bad_security_service-qna5894281.html
      </Typography>
      <Box
        textAlign={"center"}
        my="1rem"
        display={"flex"}
        alignItems="center"
        justifyContent={"end"}
      >
        <Box
          sx={{ backgroundColor: "yellow" }}
          width="100px"
          height={"40px"}
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
        >
          <Typography variant="body1" color="#fff">
            pending
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default ComplaintCard;

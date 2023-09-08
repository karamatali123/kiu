import { Card, Stack, Typography } from "@mui/material";
import React from "react";

const ComplaintCountCard = ({ sx, title, count, icon }) => {
  return (
    <Card sx={{ ...sx, height: "250px", width: "400px" }}>
      <Stack alignItems={"center"} p="30px" gap="20px">
        {icon}
        <Typography variant="h3" color="#fff">
          {title}
        </Typography>
        <Typography variant="h3" color="#fff">
          {count}
        </Typography>
      </Stack>
    </Card>
  );
};

export default ComplaintCountCard;

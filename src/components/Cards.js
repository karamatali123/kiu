import * as React from "react";

import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";

import { PersonAdd, PublicOutlined } from "@mui/icons-material";

export default function UseCard({ heading, icon, number, description }) {
  return (
    <Box position={"relative"}>
      <Card
        sx={{
          minWidth: 200,
          marginBottom: "10px",
          minHeight: "330px",
          p: 2,
        }}
      >
        <CardContent
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          {icon}

          <Typography variant="h6" component="div">
            {heading}
          </Typography>
          <Typography
            variant="body2"
            fontSize={"20px"}
            mt="20px"
            textAlign={"justify"}
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

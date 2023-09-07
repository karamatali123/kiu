import * as React from "react";

import { Card, CardActions, CardContent, Typography } from "@mui/material";

import { PersonAdd, PublicOutlined } from "@mui/icons-material";

export default function UseCard({ heading, icon, number, description }) {
  return (
    <Card
      sx={{ minWidth: 200, marginBottom: "10px", minHeight: "300px", p: 2 }}
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
        <Typography variant="body2" fontSize={"17px"} mt="20px">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

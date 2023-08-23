import * as React from "react";

import { Card, CardActions, CardContent, Typography } from "@mui/material";

import { PersonAdd, PublicOutlined } from "@mui/icons-material";

export default function UseCard({ heading, icon, number }) {
  const btnround = {
      borderRadius: "50%",
      width: "30px",
      height: "30px",
      position: "absolute !important",
      left: "17%",
      backgroundColor: "blue",
    },
    icons = {
      position: "absolute",
      top: "-13%",
    };
  return (
    <Card sx={{ minWidth: 200, marginBottom: "10px" }}>
      <CardContent
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {icon === "register" ? (
          <PersonAdd
            style={{
              ...icons,
              width: "40px",
              height: "54px",
              color: "#1976d2",
            }}
          />
        ) : (
          <PublicOutlined
            style={{
              ...icons,
              width: "40px",
              height: "54px",
              color: "#1976d2",
            }}
          />
        )}
        <Typography variant="h6" component="div">
          {heading}
        </Typography>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </CardContent>
    </Card>
  );
}

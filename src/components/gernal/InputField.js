import { TextField, Typography } from "@mui/material";

import React from "react";
import { Stack } from "@mui/system";

const Input = {
  // border: "1px solid Grey",
  width: "100%",
  borderRadius: "12px",
  marginBottom: "10px !important",
  boxShadow: "rgba(0, 0, 0, 0.15)",
  "& .MuiInputBase-input": {
    backgroundColor: "#fff!important",
    borderRadius: "0px",
    WebkitBoxShadow: "0 0 0 30px #fff inset !important",
  },
  "&.MuiInput-underline:before": {
    content: "none",
  },
  "&.MuiInput-underline:after": {
    content: "none",
  },
};

export const InputField = (props) => {
  return (
    <Stack>
      {props.title && (
        <Typography
          variant="subtitle 2"
          fontSize={"20px"}
          fontWeight={"400"}
          sx={{ mb: "16px" }}
        >
          {props.title}
        </Typography>
      )}
      <TextField
        type={props.type}
        name={props.name}
        style={props.style}
        label={props.label}
        value={props.value}
        placeholder={props.placeholder}
        fullWidth
        onChange={props.onChange}
        onBlur={props.onBlur}
        error={props.error}
        helperText={props.helperText}
        sx={Input}
      />
    </Stack>
  );
};

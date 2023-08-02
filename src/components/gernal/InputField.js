import { TextField, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Stack } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  Input: {
    // border: "1px solid Grey",
    width: "100%",
    borderRadius: theme.spacing(1.5),
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
  },
}));

export const InputField = (props) => {
  const classes = useStyles();
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
        className={classes.Input}
      />
    </Stack>
  );
};

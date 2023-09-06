import React, { useState } from "react";
import TextField from "@mui/material/TextField";

function UniversityRegistrationInput(props) {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [showError, setShowError] = useState(false);
  const Input = {
    // border: "1px solid Grey",
    width: "100%",
    borderRadius: "12px",
    marginBottom: "10px !important",
    boxShadow: "rgba(0, 0, 0, 0.15)",

    "& .MuiInputBase-input": {
      backgroundColor: "#fff!important",
      borderRadius: "0px",
      height: "37px",
      WebkitBoxShadow: "0 0 0 30px #fff inset !important",
    },
    "&.MuiInput-underline:before": {
      content: "none",
    },
    "&.MuiInput-underline:after": {
      content: "none",
    },
  };

  const validateRegistrationNumber = () => {
    const regex = /^\d{4}-[a-zA-Z]+-\d+$/;
    return regex.test(registrationNumber);
  };
  const handleBlur = () => {
    // Perform validation onBlur
    if (!validateRegistrationNumber()) {
      setShowError(true);
      props.onBlur(); // You can trigger any onBlur action passed as a prop
    }
  };
  const handleChange = (event) => {
    setRegistrationNumber(event.target.value);
  };

  return (
    <TextField
      type={props.type}
      name={props.name}
      style={props.style}
      label={props.label}
      value={props.value}
      placeholder={props.placeholder}
      fullWidth
      onChange={(e) => {
        handleChange(e);
        props.onChange(e);
        setShowError(false);
      }}
      onBlur={handleBlur}
      sx={Input}
      variant="outlined"
      size="small"
      error={
        !validateRegistrationNumber() &&
        registrationNumber.trim() !== "" &&
        showError
      }
      helperText={
        !validateRegistrationNumber() &&
        registrationNumber.trim() !== "" &&
        showError
          ? "Please enter a valid registration number (e.g., 2018-kiu-5529)"
          : ""
      }
    />
  );
}

export default UniversityRegistrationInput;

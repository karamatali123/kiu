import React, { useState } from "react";
import TextField from "@mui/material/TextField";

function CNICInput(props) {
  const [cnic, setCNIC] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const inputValue = event.target.value;

    setCNIC(inputValue);
  };
  const handleBlur = () => {
    // Perform strict validation on focus out
    const isValidCNIC = /^\d{5}-\d{7}-\d{1}$/.test(cnic);
    setError(!isValidCNIC);
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
        props.onChange(e);
        handleChange(e);
      }}
      onBlur={handleBlur}
      error={!/^\d{5}-\d{7}-\d{1}$/.test(cnic) && cnic !== ""}
      helperText={
        !/^\d{5}-\d{7}-\d{1}$/.test(cnic) &&
        cnic !== "" &&
        "Please enter a valid CNIC (e.g., 12345-1234567-1)"
      }
    />
  );
}

export default CNICInput;

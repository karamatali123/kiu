import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

export default function TrackStepper({ steps, activeStep }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={1} alternativeLabel orientation="vertical">
        {steps?.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

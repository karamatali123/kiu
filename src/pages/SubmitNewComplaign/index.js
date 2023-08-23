import { Card } from "@mui/material";
import React from "react";
import ComplaintForm from "../../components/complaints/ComplaintForm";

const NewComplaint = () => {
  return (
    <Card
      style={{
        height: "calc(100vh - 150px)",
        padding: "2rem",
        overflowY: "scroll",
      }}
    >
      <ComplaintForm />
    </Card>
  );
};

export default NewComplaint;

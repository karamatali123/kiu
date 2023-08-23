import React from "react";

import { Button, Card, TextField, Typography } from "@mui/material";

export const SuggestionForm = () => {
  return (
    <>
      <div>
        <Card>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "50px",
            }}
          >
            <Typography variant="h3">Send Us A Message</Typography>
            <TextField
              id="First Name"
              label="First Name"
              variant="standard"
              fullWidth
              sx={{ mt: "8px" }}
            />
            <TextField
              id="Last Name"
              label="Last Name"
              variant="standard"
              fullWidth
              sx={{ mt: "8px" }}
            />
            <TextField
              id="Email"
              label="Email"
              variant="standard"
              fullWidth
              sx={{ mt: "8px" }}
            />
            <TextField
              placeholder="Message"
              label="Message"
              multiline
              sx={{ mt: "8px" }}
              rows={2}
              variant="outlined"
              maxRows={4}
              fullWidth
            />
            <Button
              type="submit"
              color="primary"
              title="Sign Up"
              variant="contained"
              sx={{ marginTop: "1rem", width: "140px" }}
            >
              Submit
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

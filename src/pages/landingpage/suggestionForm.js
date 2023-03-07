import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Button, Card, TextField, Typography } from "@material-ui/core";

export const SuggestionForm = () => {
  const useStyles = makeStyles((theme) => ({
    SuggestionForm: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "50px",
    },
    input: {
      marginTop: theme.spacing(1),
    },
    btn: {
      marginTop: "1rem",
      width: "140px",
    },
  }));
  const classes = useStyles();

  return (
    <>
      <div>
        <Card>
          <form className={classes.SuggestionForm}>
            <Typography variant="h3">Send Us A Message</Typography>
            <TextField
              id="First Name"
              label="First Name"
              variant="standard"
              fullWidth
              className={classes.input}
            />
            <TextField
              id="Last Name"
              label="Last Name"
              variant="standard"
              fullWidth
              className={classes.input}
            />
            <TextField
              id="Email"
              label="Email"
              variant="standard"
              fullWidth
              className={classes.input}
            />
            <TextField
              placeholder="Message"
              label="Message"
              multiline
              className={classes.input}
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
              className={classes.btn}
            >
              Submit
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

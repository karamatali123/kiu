import * as React from "react";
import { app } from "../../firebase";
import "../../App.css";

import { useAuth } from "../../provider/AuthProvider";
import {
  Box,
  Button,
  Dialog,
  Divider,
  Grid,
  Input,
  InputAdornment,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Formik } from "formik";
import {
  Apple,
  Facebook,
  Lock,
  MailOutline,
  Twitter,
} from "@material-ui/icons";
import ErrorMessages from "../../helpers/ErrorMessages";
import { object, string } from "yup";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { useNavigate } from "react-router-dom";

function SimpleDialog(props) {
  const useStyles = makeStyles((theme) => ({
    Dialog: {
      padding: theme.spacing(6),
      height: "fit-content",
    },
    error: {
      color: "red",
    },
    Input: {
      border: "1px solid Grey",
      padding: theme.spacing(1, 2),
      borderRadius: theme.spacing(1.5),
      boxShadow: "rgba(0, 0, 0, 0.15)",
      "& .MuiInputBase-input": {
        backgroundColor: "#fff!important",
        WebkitBoxShadow: "0 0 0 30px #fff inset !important",
      },
      "&.MuiInput-underline:before": {
        content: "none",
      },
      "&.MuiInput-underline:after": {
        content: "none",
      },
    },
    form: {
      padding: theme.spacing(3),
    },
    signupBtn: {
      width: "200px",
      margin: "10px auto",
    },
    bottom: {
      margin: "10px auto",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    icons: {
      display: "flex",
      justifyContent: "space-evenly",
      width: "40%",
      marginTop: theme.spacing(3),
    },
    divider: {
      margin: "20px auto",
      maxWidth: "300px",
    },
  }));
  const classes = useStyles();
  const { onClose, signIn, setSignIn, setOpen } = props;
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { userLogin } = useAuth();

  const handleClose = () => {
    onClose(signIn);
  };

  const ValidationSchema = object().shape({
    email: string()
      .required(ErrorMessages.required)
      .email(ErrorMessages.email)
      .max(50, ErrorMessages.max),
    password: string()
      .required(ErrorMessages.required)
      .min(6, ErrorMessages.min)
      .max(30, ErrorMessages.max),
  });
  const initialValues = {
    email: "",
    password: "",
  };
  const handleSubmit = async (values) => {
    await userLogin(values, navigate);
  };
  const handleOnCLick = () => {
    setOpen(true);
    setSignIn(false);
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={signIn}
      fullWidth
      style={{ height: "fit-content" }}
    >
      <Box className={classes.Dialog}>
        <Typography variant="h4" align="center">
          Sign In To Continue
        </Typography>
        {error && <ErrorMessage message={error} />}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={ValidationSchema}
        >
          {(props) => {
            const {
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              handleBlur,
              isValid,
              dirty,
            } = props;
            return (
              <form onSubmit={handleSubmit} className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item md={12}>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your Email"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      startAdornment={
                        <InputAdornment position="start">
                          <MailOutline />
                        </InputAdornment>
                      }
                      className={classes.Input}
                    />
                    {errors.email && touched.email && (
                      <span className={classes.error}>{errors.email}</span>
                    )}
                  </Grid>
                  <Grid item md={12}>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      startAdornment={
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      }
                      className={classes.Input}
                    />
                    {errors.password && touched.password && (
                      <span className={classes.error}>{errors.password}</span>
                    )}
                  </Grid>

                  <Button
                    type="submit"
                    color="primary"
                    title="Sign Up"
                    variant="contained"
                    className={classes.signupBtn}
                  >
                    Sign In
                  </Button>
                </Grid>
                <Divider className={classes.divider} />
                <Box className={classes.bottom}>
                  <Typography variant="subtitle1">Continue with</Typography>
                  <Box className={classes.icons}>
                    {" "}
                    <Facebook color="primary" /> <Twitter color="primary" />{" "}
                    <Apple color="primary" />{" "}
                  </Box>
                </Box>
                <Divider
                  style={{ backgroundColor: "#a99999", height: "3px" }}
                />
                <Box padding={"40px 0px 0px 0px"}>
                  {" "}
                  <Typography variant="subtitle1" align="center">
                    Create an account
                    <a
                      href="#"
                      style={{ textDecoration: "none" }}
                      onClick={handleOnCLick}
                    >
                      Sign Up
                    </a>{" "}
                  </Typography>
                </Box>
              </form>
            );
          }}
        </Formik>
      </Box>
    </Dialog>
  );
}

export default function SignIn({ signIn, setSignIn, setOpen }) {
  const handleClickOpen = () => {
    setSignIn(true);
  };

  const handleClose = (value) => {
    setSignIn(false);
  };

  return (
    <div>
      <Typography variant="subtitle1" component="div"></Typography>
      <br />
      <SimpleDialog
        signIn={signIn}
        setSignIn={setSignIn}
        onClose={handleClose}
        setOpen={setOpen}
      />
    </div>
  );
}

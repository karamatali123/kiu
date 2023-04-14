import * as React from "react";
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
import { Paper } from "@mui/material";

export default function SignIn(props) {
  const useStyles = makeStyles((theme) => ({
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

  const [error, setError] = useState();
  const navigate = useNavigate();
  const { userLogin } = useAuth();

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
    navigate("/signup");
  };
  return (
    <Paper
      sx={{
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
        boxShadow: "1px 2px 9px #3a3a3a",
      }}
    >
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
          const { handleChange, handleSubmit, errors, touched, handleBlur } =
            props;
          return (
            <form onSubmit={handleSubmit} className={classes.form}>
              <Grid container spacing={1}>
                <Grid item sm={12} md={12} sm={12} xs={12}>
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
                <Grid item md={12} sm={12} xs={12}>
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
    </Paper>
  );
}

import * as React from "react";
import { string, object } from "yup";
import "../../App.css";
import { useAuth } from "../../provider/AuthProvider";
import {
  Box,
  Button,
  Dialog,
  Divider,
  Grid,
  Card,
  InputAdornment,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { Formik } from "formik";
import { Lock, MailOutline } from "@material-ui/icons";
import ErrorMessages from "../../helpers/ErrorMessages";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { useNavigate } from "react-router-dom";
import RegisterAs from "./RegisterAs";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(3),
  },
  signupBtn: {
    width: "200px",
    marginTop: "10px",
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
  error: {
    color: "red",
  },
}));
export default function SignUp(props) {
  const classes = useStyles();

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const ValidationSchema = object().shape({
    firstName: string()
      .required(ErrorMessages.required)
      .min(3, ErrorMessages.min)
      .max(30, ErrorMessages.max),
    lastName: string()
      .required(ErrorMessages.required)
      .min(3, ErrorMessages.min)
      .max(30, ErrorMessages.max),
    email: string()
      .required(ErrorMessages.required)
      .email(ErrorMessages.email)
      .max(50, ErrorMessages.max),
    password: string()
      .required(ErrorMessages.required)
      .min(6, ErrorMessages.min)
      .max(30, ErrorMessages.max),
    // confirmPassword: Yup.string()
    //   .label("confirm password")
    //   .required()
    //   .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const handleSubmit = async (values) => {
    registerUser(values, navigate);
  };
  const handleOnClick = () => {
    navigate("/login");
  };

  return (
    <>
      <Paper
        sx={{
          maxWidth: "600px",
          margin: "auto",
          padding: "20px",
          boxShadow: "1px 2px 9px #3a3a3a",
        }}
      >
        <Typography variant="h4" align="center">
          Sign Up To Continue
        </Typography>

        {error && <ErrorMessage message={error} />}
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          onSubmit={handleSubmit}
        >
          {(props) => {
            const {
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              handleBlur,
            } = props;
            return (
              <form onSubmit={handleSubmit} className={classes.form}>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent={"center"}
                >
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      type="text"
                      name="firstName"
                      label="First Name"
                      id="firstName"
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="First Name"
                      className={classes.Input}
                    />
                    {errors.firstName && touched.firstName && (
                      <span className={classes.error}>{errors.firstName}</span>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      type="text"
                      name="lastName"
                      id="lastName"
                      label="Last Name"
                      fullWidth
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Last Name"

                      // className={classes.Input}
                    />
                    {errors.lastName && touched.lastName && (
                      <span className={classes.error}>{errors.lastName}</span>
                    )}
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      type="email"
                      name="email"
                      label="Email"
                      id="email"
                      variant="outlined"
                      placeholder="Enter Your Email"
                      fullWidth
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      startAdornment={
                        <InputAdornment position="start">
                          <MailOutline />
                        </InputAdornment>
                      }
                      // className={classes.Input}
                    />
                    {errors.email && touched.email && (
                      <span className={classes.error}>{errors.email}</span>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      type="password"
                      name="password"
                      id="password"
                      label="Password"
                      variant="outlined"
                      placeholder="Password"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      startAdornment={
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      }
                      // className={classes.Input}
                    />
                    {errors.password && touched.password && (
                      <span className={classes.error}>{errors.password}</span>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      type="password"
                      name="confirmPassword"
                      id="ConfirmPassword"
                      label="Re-Name Password"
                      placeholder="Confirm Password"
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      startAdornment={
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      }
                    />
                  </Grid>
                  <Button
                    type="submit"
                    color="primary"
                    title="Sign Up"
                    variant="contained"
                    sx={{ mt: "10px" }}
                    className={classes.signupBtn}
                  >
                    SignUp
                  </Button>
                </Grid>

                <Divider
                  style={{
                    backgroundColor: "#a99999",
                    height: "2px",
                    marginTop: "30px",
                  }}
                />
                <Box padding={"40px 0px 0px 0px"}>
                  {" "}
                  <Typography variant="subtitle1" align="center">
                    Already have an account
                    <a
                      href="#"
                      style={{ textDecoration: "none" }}
                      onClick={handleOnClick}
                    >
                      Sign In
                    </a>{" "}
                  </Typography>
                </Box>
              </form>
            );
          }}
        </Formik>
      </Paper>
    </>
  );
}

// export default function SignUp({ open, setOpen, setSignIn, signIn }) {
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (value) => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Typography variant="subtitle1" component="div"></Typography>
//       <br />
//       <SimpleDialog
//         open={open}
//         setOpen={setOpen}
//         onClose={handleClose}
//         setSignIn={setSignIn}
//       />
//     </div>
//   );
// }

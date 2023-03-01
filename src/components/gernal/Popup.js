import * as React from "react";
import { app, db } from "../../firebase";
import { string, object } from "yup";
import "../../App.css";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
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
  TextField,
  Typography,
} from "@material-ui/core";
import { Formik, validateYupSchema } from "formik";
import {
  AccountCircle,
  Apple,
  Dock,
  Facebook,
  GitHub,
  Height,
  Lock,
  MailOutline,
  Person,
  PersonOutline,
  SettingsBrightnessOutlined,
  Twitter,
} from "@material-ui/icons";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import ErrorMessages from "../../helpers/ErrorMessages";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  Dialog: {
    padding: theme.spacing(6),
    height: "fit-content",
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
    "& .MuiFilledInput-root": {
      backgroundColor: "transparent",
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
  error: {
    color: "red",
  },
}));
function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, open, setOpen, setSignIn, signIn } = props;
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
  });

  const handleClose = () => {
    onClose(open);
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };
  const handleSubmit = async (values) => {
    registerUser(values, navigate);
  };
  const handleOnClick = () => {
    setSignIn(true);
    setOpen(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth
      style={{ height: "fit-content" }}
    >
      <Box className={classes.Dialog}>
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
              isValid,
              dirty,
            } = props;
            return (
              <form onSubmit={handleSubmit} className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item md={6}>
                    <Input
                      type="text"
                      name="firstName"
                      id="firstName"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="First Name"
                      startAdornment={
                        <InputAdornment position="start">
                          <PersonOutline />
                        </InputAdornment>
                      }
                      className={classes.Input}
                    />
                    {errors.firstName && touched.firstName && (
                      <span className={classes.error}>{errors.firstName}</span>
                    )}
                  </Grid>
                  <Grid item md={6}>
                    <Input
                      type="text"
                      name="lastName"
                      id="lastName"
                      fullWidth
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Last Name"
                      startAdornment={
                        <InputAdornment position="start">
                          <PersonOutline />
                        </InputAdornment>
                      }
                      className={classes.Input}
                    />
                    {errors.lastName && touched.lastName && (
                      <span className={classes.error}>{errors.lastName}</span>
                    )}
                  </Grid>

                  <Grid item md={12}>
                    <Input
                      type="email"
                      name="email"
                      id="email"
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
                      className={classes.Input}
                    />
                    {errors.password && touched.password && (
                      <span className={classes.error}>{errors.password}</span>
                    )}
                  </Grid>
                  <Grid item md={12}>
                    <Input
                      type="password"
                      name="ConfirmPassword"
                      id="ConfirmPassword"
                      label="Re-Name Password"
                      placeholder="Confirm Password"
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={classes.Input}
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
                    className={classes.signupBtn}
                  >
                    SignUp
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
      </Box>
    </Dialog>
  );
}

export default function SignUp({ open, setOpen, setSignIn, signIn }) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <Typography variant="subtitle1" component="div"></Typography>
      <br />
      <SimpleDialog
        open={open}
        setOpen={setOpen}
        onClose={handleClose}
        setSignIn={setSignIn}
      />
    </div>
  );
}

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
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { Apple, Facebook, Twitter } from "@mui/material";
import ErrorMessages from "../../helpers/ErrorMessages";
import { object, string } from "yup";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
import { LockOpen, Mail } from "@mui/icons-material";

export default function SignIn(props) {
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
            <form onSubmit={handleSubmit} style={{ padding: "24px" }}>
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
                        <Mail />
                      </InputAdornment>
                    }
                    sx={{
                      border: "1px solid Grey",
                      padding: "8px 16px",
                      borderRadius: "12px",
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
                    }}
                  />
                  {errors.email && touched.email && (
                    <span style={{ color: "red" }}>{errors.email}</span>
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
                        <LockOpen />
                      </InputAdornment>
                    }
                    sx={{
                      border: "1px solid Grey",
                      padding: "8px 16px",
                      borderRadius: "8px",
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
                    }}
                  />
                  {errors.password && touched.password && (
                    <span style={{ color: "red" }}>{errors.password}</span>
                  )}
                </Grid>

                <Button
                  type="submit"
                  color="primary"
                  title="Sign Up"
                  variant="contained"
                  sx={{ width: "200px", margin: "10px auto" }}
                >
                  Sign In
                </Button>
              </Grid>
              <Divider style={{ margin: "20px auto", maxWidth: "300px" }} />

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

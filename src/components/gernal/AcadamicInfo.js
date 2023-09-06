import * as React from "react";
import "../../App.css";
import { Box, Button, Divider, Grid, TextField } from "@mui/material";
import { Typography, Paper } from "@mui/material";

import { useAuth } from "../../provider/AuthProvider";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Formik } from "formik";
import ErrorMessages from "../../helpers/ErrorMessages";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";
import { AUTH_STATUS } from "../../provider/AuthProvider/reducer";
import SelectDepartment from "./SelectDepartment";
import UniversityRegistrationInput from "./RegistrationInput";
import CNICInput from "./CnicInput";
import {
  departments,
  programs,
  semesters,
} from "../../constants/selectOptions";

export default function AddAcademicInfo(props) {
  const { onClose, open, setOpen } = props;
  const { uid, dispatch } = useAuth();
  const navigate = useNavigate();

  const handleClose = () => {
    onClose(open);
  };
  const handleSubmit = async (values) => {
    const docRef = doc(db, "users", uid);

    try {
      await updateDoc(docRef, {
        academicInfo: values,
      });
      dispatch({
        type: AUTH_STATUS,
        payload: true,
      });
      console.log("Document updated successfully");
      navigate("/login");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const initialValues = {
    dptName: "",
    regNo: "",
    cnic: "",
    program: "",
    semester: "",
  };
  const ValidationSchema = object().shape({
    dptName: string()
      .required(ErrorMessages.required)
      .min(3, ErrorMessages.min)
      .max(70, ErrorMessages.max),
    regNo: string()
      .required(ErrorMessages.required)
      .min(3, ErrorMessages.min)
      .max(30, ErrorMessages.max),
    cnic: string().required(ErrorMessages.required),
    semester: string().required(ErrorMessages.required),
    program: string().required(ErrorMessages.required),

    // confirmPassword: Yup.string()
    //   .label("confirm program")
    //   .required()
    //   .oneOf([Yup.ref("program"), null], "Passwords must match"),
  });
  return (
    <Paper
      sx={{
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
        boxShadow: "1px 2px 9px #3a3a3a",
      }}
    >
      <Typography variant="h4" textAlign={"center"}>
        Add Academic Information
      </Typography>
      {/* {error && <ErrorMessage message={error} />} */}
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
          } = props;
          return (
            <form onSubmit={handleSubmit} style={{ padding: "24px" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                  <SelectDepartment
                    options={departments}
                    type="text"
                    name="dptName"
                    label="Department"
                    id="Department"
                    value={values.dptName}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Department Name"
                  />
                  {errors.dptName && touched.dptName && (
                    <span style={{ color: "red" }}>{errors.dptName}</span>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <UniversityRegistrationInput
                    type="text"
                    name="regNo"
                    id="Reg no"
                    label="Registration Number"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Registration Number"
                  />
                  {errors.regNo && touched.regNo && (
                    <span style={{ color: "red" }}>{errors.regNo}</span>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <CNICInput
                    name="cnic"
                    id="CNIC"
                    label="CNIC Number"
                    placeholder="CNIC Number"
                    variant="outlined"
                    fullWidth
                    value={values.cnic}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.cnic && touched.cnic && (
                    <span style={{ color: "red" }}>{errors.cnic}</span>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <SelectDepartment
                    options={programs}
                    type="text"
                    name="program"
                    id="program"
                    label="Program"
                    variant="outlined"
                    placeholder="Program"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}

                    //
                  />
                  {errors.program && touched.program && (
                    <span style={{ color: "red" }}>{errors.program}</span>
                  )}
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <SelectDepartment
                    options={semesters}
                    type="number"
                    name="semester"
                    label="Semester"
                    id="Semester"
                    variant="outlined"
                    placeholder="Semester"
                    fullWidth
                    value={values.semester}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    max={8}
                    min={1}
                  />
                  {errors.semester && touched.semester && (
                    <span style={{ color: "red" }}>{errors.semester}</span>
                  )}
                </Grid>

                <Button
                  type="submit"
                  color="primary"
                  title="Sign Up"
                  variant="contained"
                  disabled={!isValid}
                  sx={{ width: "200px", margin: "10px auto" }}
                >
                  Submit
                </Button>
              </Grid>

              <Divider
                style={{
                  backgroundColor: "#a99999",
                  height: "2px",
                  marginTop: "30px",
                }}
              />
            </form>
          );
        }}
      </Formik>
    </Paper>
  );
}

import * as React from "react";
import "../../App.css";
import {
  Box,
  Button,
  Dialog,
  Divider,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Typography } from "@mui/material";

import { useAuth } from "../../provider/AuthProvider";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Formik } from "formik";
import ErrorMessages from "../../helpers/ErrorMessages";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  Dialog: {
    padding: theme.spacing(6),
    height: "fit-content",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4, 1),
    },
  },

  form: {
    padding: theme.spacing(3),
  },
  signupBtn: {
    width: "200px",
    margin: "10px auto",
  },
}));
function SimpleDialog(props) {
  const { onClose, open, setOpen } = props;
  const { uid } = useAuth();
  const navigate = useNavigate();
  const classes = useStyles();

  const handleClose = () => {
    onClose(open);
  };
  const handleSubmit = async (values) => {
    const docRef = doc(db, "users", uid);

    try {
      await updateDoc(docRef, {
        academicInfo: values,
      });

      console.log("Document updated successfully");
      navigate("/my-complaints");
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
      .max(30, ErrorMessages.max),
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
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth
      style={{ height: "fit-content" }}
    >
      <Box p={"30px"}>
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
            } = props;
            return (
              <form onSubmit={handleSubmit} className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      type="text"
                      name="dptName"
                      label="Department"
                      id="Department"
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Department Name"
                      className={classes.Input}
                    />
                    {errors.dptName && touched.dptName && (
                      <span className={classes.error}>{errors.dptName}</span>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      type="text"
                      name="regNo"
                      id="Reg no"
                      label="Registration Number"
                      fullWidth
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Registration Number"

                      // className={classes.Input}
                    />
                    {errors.regNo && touched.regNo && (
                      <span className={classes.error}>{errors.regNo}</span>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      type="number"
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
                      <span className={classes.error}>{errors.cnic}</span>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
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
                    />
                    {errors.semester && touched.semester && (
                      <span className={classes.error}>{errors.semester}</span>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      type="text"
                      name="program"
                      id="program"
                      label="Program"
                      variant="outlined"
                      placeholder="Program"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}

                      // className={classes.Input}
                    />
                    {errors.program && touched.program && (
                      <span className={classes.error}>{errors.program}</span>
                    )}
                  </Grid>

                  <Button
                    type="submit"
                    color="primary"
                    title="Sign Up"
                    variant="contained"
                    className={classes.signupBtn}
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
      </Box>
    </Dialog>
  );
}

export default function AcademicInfo({ open, setOpen }) {
  console.log(open, "open");

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <br />
      <SimpleDialog open={open} setOpen={setOpen} onClose={handleClose} />
    </div>
  );
}

import { Apple, Facebook, MailOutline, Twitter } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { DesktopDatePicker } from "@mui/lab";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { textAlign } from "@mui/system";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { object, string } from "yup";
import ErrorMessages from "../../helpers/ErrorMessages";
import ErrorMessage from "../gernal/ErrorMessage";
import { InputField } from "../gernal/InputField";
import { db } from "../../firebase";
import { useAuth } from "../../provider/AuthProvider";

const ValidationSchema = object().shape({
  name: yup.string().required("Name Required"),
  deptName: yup.string().required("Deprtment Name required"),
  regNo: yup.string().required("Registration No required"),
  contactNo: yup.string().required("Contact Number required"),
  // date: yup.date().required("Date required"),
  natureOfComplaint: yup.string().required("Nature of Complaint required"),
  regarding: yup.string().required("Regarding required"),
  submitTo: yup.string().required("To whom do you want to submit"),
  email: string()
    .required(ErrorMessage.required)
    .email(ErrorMessages.email)
    .max(50, ErrorMessages.max),
});

const useStyles = makeStyles((theme) => ({
  Container: {},
  InnerBlock: {
    padding: "2rem",
  },
  Heading: {
    fontWeight: "500 !important",
    textAlign: "center",
    color: theme.palette.primary.main,
  },
  Subtitle: {
    fontSize: "15px",
    textAlign: "center",
    color: "#505050",
  },

  error: {
    color: "red",
  },

  form: {
    padding: theme.spacing(3, 1),
  },
}));

export default function ComplaintForm() {
  const classes = useStyles();

  const { user } = useAuth();

  const handleSubmit = async (values) => {
    console.log(values, "valuse", user);
    await addDoc(collection(db, "complaints"), values)
      .then(() => {
        console.log("done");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  return (
    <Box className={classes.Container}>
      <Box className={classes.InnerBlock} sx={{ boxShadow: 12 }}>
        <Typography className={classes.Heading} variant="h4">
          We are here to assist you!
        </Typography>
        <Typography className={classes.Subtitle}>
          Please complete the form below for your complaitns.
        </Typography>
        <Formik
          onSubmit={handleSubmit}
          validationSchema={ValidationSchema}
          initialValues={{
            name: "",
            deptName: "",
            regNo: "",
            contactNo: "",
            date: "",
            natureOfComplaint: "",
            regarding: "",
            submitTo: "",
            email: "",
            password: "",
            details: "",
            // proof: Boolean,
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            handleBlur,
          }) => (
            <form onSubmit={handleSubmit} className={classes.form}>
              <Grid container spacing={2}>
                <Grid item md={6} sm={12} xs={12}>
                  <InputField
                    type="text"
                    name="name"
                    value={values.name}
                    placeholder="Name"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name && touched.name}
                    helperText={errors.name && touched.name && errors.name}
                    className={classes.Input}
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                  <InputField
                    type="text"
                    name="deptName"
                    value={values.deptName}
                    placeholder="Department Name"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.deptName && touched.deptName}
                    helperText={
                      errors.deptName && touched.deptName && errors.deptName
                    }
                    className={classes.Input}
                  />
                </Grid>

                <Grid item md={6} sm={12} xs={12}>
                  <InputField
                    type="text"
                    name="regNo"
                    value={values.regNo}
                    placeholder="Registration No"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.regNo && touched.regNo}
                    helperText={errors.regNo && touched.regNo && errors.regNo}
                    className={classes.Input}
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                  <InputField
                    type="number"
                    name="contactNo"
                    value={values.contactNo}
                    placeholder="Contact No"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.contactNo && touched.contactNo}
                    helperText={
                      errors.contactNo && touched.contactNo && errors.contactNo
                    }
                    className={classes.Input}
                  />
                </Grid>

                <Grid item md={6} sm={12} xs={12}>
                  <InputField
                    type="file"
                    name="details"
                    value={values.details}
                    placeholder="Proof"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.date && touched.date}
                    helperText={errors.date && touched.date && errors.date}
                    className={classes.Input}
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                  <InputField
                    // type="email"
                    name="date"
                    value={values.date}
                    placeholder="Date"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.date && touched.date}
                    helperText={errors.date && touched.date && errors.date}
                    className={classes.Input}
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel>Submit to</InputLabel>
                    <Select
                      name="submitTo"
                      value={values.submitTo}
                      label="Submit to"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.submitTo && touched.submitTo}
                      className={classes.Input}
                    >
                      <MenuItem value={"VC"}>Vice Chancellor</MenuItem>
                      <MenuItem value={"HOD"}>HOD</MenuItem>
                      <MenuItem value={"Dean"}>Dean</MenuItem>
                    </Select>

                    <Typography
                      sx={{ color: "#ff0000", fontSize: "12px", ml: "15px" }}
                    >
                      {errors.submitTo && touched.submitTo && errors.submitTo}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                  <InputField
                    type="email"
                    name="email"
                    value={values.email}
                    placeholder="Enter Email"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email && touched.email}
                    helperText={errors.email && touched.email && errors.email}
                    className={classes.Input}
                  />
                </Grid>
                <Grid item md={12}>
                  <label>The specific details of the complaint:</label>
                  <TextareaAutosize
                    type="text"
                    name="natureOfComplaint"
                    value={values.natureOfComplaint}
                    fullWidth
                    style={{ width: "100%", height: "100px" }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      errors.natureOfComplaint && touched.natureOfComplaint
                    }
                  />
                  <Typography
                    sx={{ color: "#ff0000", fontSize: "12px", ml: "15px" }}
                  >
                    {errors.natureOfComplaint &&
                      touched.natureOfComplaint &&
                      errors.natureOfComplaint}
                  </Typography>
                </Grid>
                <Grid item md={12}>
                  <label>The complaint is regarding:</label>
                  <TextareaAutosize
                    type="text"
                    name="regarding"
                    value={values.regarding}
                    fullWidth
                    style={{ width: "100%", height: "100px" }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.regarding && touched.regarding}
                  />
                  <Typography
                    sx={{ color: "#ff0000", fontSize: "12px", ml: "15px" }}
                  >
                    {errors.regarding && touched.regarding && errors.regarding}
                  </Typography>
                </Grid>

                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    margin: "auto",
                    width: "230px",
                    height: "50px",
                    marginTop: "1rem",
                  }}
                >
                  submit
                </Button>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

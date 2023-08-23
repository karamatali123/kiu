import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { Formik } from "formik";
import * as yup from "yup";
import { object, string } from "yup";
import ErrorMessages from "../../helpers/ErrorMessages";
import ErrorMessage from "../gernal/ErrorMessage";
import { InputField } from "../gernal/InputField";
import { db } from "../../firebase";
import { useAuth } from "../../provider/AuthProvider";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { ERROR, SUCCESS } from "../../constants/snackbarConstant";
import { SNACKBAR_OPEN } from "../../provider/AuthProvider/reducer";
import { useEffect, useState } from "react";
import CustomSelect from "../gernal/Select";
import SubmitTo from "../gernal/SubmitTo";

const ValidationSchema = object().shape({
  name: yup.string().required("Name Required"),
  title: yup.string().required("Title Required"),
  deptName: yup.string().required("Deprtment Name required"),
  regNo: yup.string().required("Registration No required"),
  contactNo: yup.string().required("Contact Number required"),
  date: yup.string().required("Date required"),
  // proof: yup
  //   .mixed()
  //   .test("fileSize", "File too large", ({ size }) => {
  //     return size && size != {} ? size <= FILE_SIZE : true;
  //   })
  //   .test("required", "File is required", ({ size }) => {
  //     return size == undefined ? false : true;
  //   })
  //   .test("fileFormat", "Unsupported Format", ({ type }) => {
  //     return type ? SUPPORTED_FORMATS.includes(type) : true;
  //   }),
  natureOfComplaint: yup.string().required("Nature of Complaint required"),
  regarding: yup.string().required("Regarding required"),
  submitTo: yup.string().required("To whom do you want to submit"),
  category: yup.string().required("Please select category of complaint"),
  email: string()
    .required(ErrorMessage.required)
    .email(ErrorMessages.email)
    .max(50, ErrorMessages.max),
});

export default function ComplaintForm() {
  const [catagories, setCatagories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, dispatch } = useAuth();
  const initialValues = {
    title: "",
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
    category: "",
    proof: null,
  };
  const categories = [
    "Admission Problems",
    "False/Misleading Information",
    "Bribery/Demand of un-solicited money",
    "Discrimination",
    "Harassment",
    "Unfair evaluation",
    "Scholarship Issues",
    " Fee issues",
    "Administrative issues",
  ];

  const handleSubmit = async (values, actions) => {
    setLoading(true);
    const complaintId = uuidv4();

    const storage = getStorage();
    const imageREf = ref(storage, `proof/${complaintId}`);
    const response = await uploadBytes(imageREf, values.proof);
    const url = await getDownloadURL(ref(storage, response.ref.fullPath));

    await setDoc(doc(db, "complaints", complaintId), {
      ...values,
      status: "pending",
      authorId: user.uid,
      proof: url,
      complaintId: complaintId,
    })
      .then(() => {
        dispatch({
          type: SNACKBAR_OPEN,
          payload: {
            snackbarType: SUCCESS,
            message: "Complaint added successfully",
          },
        });
        actions.resetForm();
        setLoading(false);
      })
      .catch((err) => {
        dispatch({
          type: SNACKBAR_OPEN,
          payload: {
            snackbarType: ERROR,
            message: err.message,
          },
        });
        setLoading(false);
      });
  };
  const getCatagories = async () => {
    try {
      const ref = collection(db, "catagories");
      let docData = [];
      const snapshot = await getDocs(ref);
      const documents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCatagories(documents);
    } catch (error) {
      console.log(error.message, "errrrrrr");
    }
  };
  useEffect(() => {
    getCatagories();
  }, []);
  return (
    <Box>
      <Box sx={{ boxShadow: 12, p: "2rem" }}>
        <Typography
          sx={{
            fontWeight: "500 !important",
            textAlign: "center",
            color: "primary.main",
          }}
          variant="h4"
        >
          We are here to assist you!
        </Typography>
        <Typography
          sx={{ fontSize: "15px", textAlign: "center", color: "#505050" }}
        >
          Please complete the form below for your complaitns.
        </Typography>
        <Formik
          onSubmit={(values, actions) => {
            handleSubmit(values, actions);
          }}
          validationSchema={ValidationSchema}
          initialValues={initialValues}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            handleBlur,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit} style={{ padding: "24px 8px" }}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item md={6} sm={12} xs={12}>
                  <InputField
                    type="text"
                    name="title"
                    value={values.title}
                    label="Complaint Title"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.title && touched.title}
                    helperText={errors.title && touched.title && errors.title}
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                  <InputField
                    type="text"
                    name="name"
                    value={values.name}
                    label="Name"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name && touched.name}
                    helperText={errors.name && touched.name && errors.name}
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                  <InputField
                    type="text"
                    name="deptName"
                    value={values.deptName}
                    label="Department Name"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.deptName && touched.deptName}
                    helperText={
                      errors.deptName && touched.deptName && errors.deptName
                    }
                  />
                </Grid>

                <Grid item md={6} sm={12} xs={12}>
                  <InputField
                    type="text"
                    name="regNo"
                    value={values.regNo}
                    label="Registration No"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.regNo && touched.regNo}
                    helperText={errors.regNo && touched.regNo && errors.regNo}
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                  <InputField
                    type="number"
                    name="contactNo"
                    value={values.contactNo}
                    label="Contact No"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.contactNo && touched.contactNo}
                    helperText={
                      errors.contactNo && touched.contactNo && errors.contactNo
                    }
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                  <InputField
                    type="email"
                    name="email"
                    value={values.email}
                    label="email"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email && touched.email}
                    helperText={errors.email && touched.email && errors.email}
                  />
                </Grid>

                <Grid item md={6} sm={12} xs={12}>
                  <Typography
                    // color={theme.palette.black}
                    fontSize={16}
                    paddingLeft={0.5}
                    paddingBottom={0}
                    textAlign={"left"}
                  >
                    Submission date
                  </Typography>
                  <InputField
                    type="date"
                    name="date"
                    value={values.date}
                    // label="Date"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.date && touched.date}
                    helperText={errors.date && touched.date && errors.date}
                  />
                  {/* <DatePicker /> */}
                </Grid>

                <Grid item md={6} sm={12} xs={12}>
                  <CustomSelect
                    options={catagories}
                    selectlabel={"Category"}
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.category)}
                    error_message={
                      touched.category && errors.category && errors.category
                    }
                  />
                </Grid>

                <Grid item md={6} sm={12} xs={12}>
                  <SubmitTo
                    options={["Hod", "Dean", "VC"]}
                    selectlabel={"Submitted To"}
                    name="submitTo"
                    value={values.submitTo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.submitTo)}
                    error_message={
                      touched.submitTo && errors.submitTo && errors.category
                    }
                  />
                </Grid>

                <Grid item md={6} sm={12} xs={12}>
                  <Typography
                    // color={theme.palette.black}
                    fontSize={16}
                    paddingLeft={0.5}
                    paddingBottom={0}
                    textAlign={"left"}
                  >
                    Proof(if any)
                  </Typography>
                  <InputField
                    type="file"
                    name="proof"
                    // value={values.proof}
                    placeholder="Proof"
                    fullWidth
                    onChange={(e) => {
                      setFieldValue("proof", e.target.files[0]);
                    }}
                    onBlur={handleBlur}
                    error={errors.proof && touched.proof}
                    helperText={errors.proof && touched.proof && errors.proof}
                  />
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
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
                <Grid item md={12} xs={12} sm={12}>
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
                    marginTop: "30px",
                  }}
                >
                  {loading ? <CircularProgress /> : "submit"}
                </Button>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

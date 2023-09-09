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

import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
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
import UniversityRegistrationInput from "../gernal/RegistrationInput";
import { departments } from "../../constants/selectOptions";
import SelectDepartment from "../gernal/SelectDepartment";
import { MuiSwitch } from "../gernal/Switch";
import { useRouteError } from "react-router-dom";

const ValidationSchema = object().shape({
  name: yup.string().required("Name Required"),
  title: yup.string().required("Title Required"),
  details: yup.string().required("Nature of Complaint required"),
  category: yup.object().required("Please select category of complaint"),
  email: string()
    .required(ErrorMessage.required)
    .email(ErrorMessages.email)
    .max(50, ErrorMessages.max),
});

export default function ComplaintForm() {
  const [catagories, setCatagories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [assignee, setAssignee] = useState({});
  const { user, dispatch } = useAuth();

  const initialValues = {
    title: "",
    name: user.firstName ? `${user.firstName} ${user.lastName}` : "",
    deptName: user?.academicInfo?.dptName
      ? user?.academicInfo.dptName
      : user.role,
    regNo: user?.academicInfo?.regNo ? user?.academicInfo.regNo : "u",
    showIdentity: true,
    details: "",
    assignee: "",
    email: user.email ? user?.email : "",
    details: "",
    category: "",
    proof: null,
  };

  const getAssignee = async (categoryId) => {
    try {
      const q = query(
        collection(db, "users"),
        where("categoryId", "==", categoryId)
      );
      let docData = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data(), "date");
        docData.push(doc.data());
        setAssignee(docData[0]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (values, actions) => {
    setLoading(true);
    const complaintId = uuidv4();
    try {
      const storage = getStorage();
      const imageREf = ref(storage, `proof/${complaintId}`);
      const response = await uploadBytes(imageREf, values.proof);
      const url = await getDownloadURL(ref(storage, response.ref.fullPath));
      const currentDate = new Date();
      // You can format the date as needed before adding it to the collection
      const formattedDate = currentDate.toISOString();
      await setDoc(doc(db, "complaints", complaintId), {
        ...values,
        status: "pending",
        authorId: user.uid ? user.uid : "",
        proof: url,
        complaintId: complaintId,
        assignee: assignee,
        assigneeId: assignee.uid,
        date: formattedDate,
        track: [assignee.designation],
      })
        .then(() => {
          dispatch({
            type: SNACKBAR_OPEN,
            payload: {
              snackbarType: SUCCESS,
              message: "Complaint added successfully",
            },
          });
          setLoading(false);
          actions.resetForm();
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
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error, "error");
      setLoading(false);
    }
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
  console.log(user, "user");
  return (
    <Box width="100%">
      <Box sx={{ boxShadow: 12, p: "2rem" }}>
        <Typography
          sx={{
            fontWeight: "500 !important",
            textAlign: "center",
            color: "primary.main",
          }}
          variant="h4"
        >
          Submit your complaint
        </Typography>
        <Typography
          sx={{ fontSize: "20px", textAlign: "center", color: "#505050" }}
        >
          We are here to assist you
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
            isValid,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit} style={{ padding: "24px 8px" }}>
              {!user.uid && (
                <>
                  <Typography
                    fontSize={"22px"}
                    fontWeight="600"
                    mb="10px"
                    sx={{ fontFamily: "'Roboto', sans-serif !important" }}
                  >
                    Complainant Details
                  </Typography>
                  <Grid
                    container
                    columnSpacing={5}
                    rowSpacing={2}
                    justifyContent="center"
                  >
                    <Grid item md={6} sm={12} xs={12}>
                      <InputField
                        type="text"
                        name="name"
                        value={values.name}
                        label="Complainant Name"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.name && touched.name}
                        helperText={errors.name && touched.name && errors.name}
                      />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                      <SelectDepartment
                        options={departments}
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
                      <UniversityRegistrationInput
                        type="text"
                        name="regNo"
                        value={values.regNo}
                        label="Registration No"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.regNo && touched.regNo}
                        helperText={
                          errors.regNo && touched.regNo && errors.regNo
                        }
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
                          errors.contactNo &&
                          touched.contactNo &&
                          errors.contactNo
                        }
                      />
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                      <InputField
                        type="email"
                        name="email"
                        value={values.email}
                        label="email"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.email && touched.email}
                        helperText={
                          errors.email && touched.email && errors.email
                        }
                      />
                    </Grid>
                  </Grid>
                </>
              )}
              <Typography
                fontSize={"22px"}
                fontWeight="600"
                mb="10px"
                mt="10px"
                sx={{ fontFamily: "'Roboto', sans-serif !important" }}
              >
                Complaint Details
              </Typography>
              <Grid
                container
                columnSpacing={5}
                rowSpacing={2}
                justifyContent="center"
              >
                <Grid item md={6} sm={6} xs={12}>
                  <Typography
                    // color={theme.palette.black}
                    fontSize={"16px"}
                    my={"7px"}
                    fontWeight="700"
                    textAlign={"left"}
                    sx={{ fontFamily: "'Roboto', sans-serif !important" }}
                  >
                    Complaint Title
                  </Typography>

                  <InputField
                    type="text"
                    name="title"
                    variant="outlined"
                    value={values.title}
                    label="Complaint Title"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.title && touched.title}
                    helperText={errors.title && touched.title && errors.title}
                  />
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                  <Typography
                    // color={theme.palette.black}
                    my={"7px"}
                    fontSize={"16px"}
                    paddingLeft={0.5}
                    paddingBottom={0}
                    fontWeight="700"
                    textAlign={"left"}
                    sx={{ fontFamily: "'Roboto', sans-serif !important" }}
                  >
                    Show Identity
                  </Typography>
                  <MuiSwitch
                    name="showIdentity"
                    onChange={(e) =>
                      setFieldValue("showIdentity", e.target.checked)
                    }
                    checked={values.showIdentity}
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                  <CustomSelect
                    options={catagories}
                    selectlabel={"Category"}
                    name="category"
                    value={values.category}
                    onChange={(e) => {
                      getAssignee(e.target.value.categoryId);
                      setFieldValue("category", e.target.value);
                    }}
                    onBlur={handleBlur}
                    error={Boolean(errors.category)}
                    error_message={
                      touched.category && errors.category && errors.category
                    }
                  />
                </Grid>

                <Grid item md={6} sm={12} xs={12}>
                  <Typography
                    // color={theme.palette.black}
                    fontSize={"16px"}
                    my="10px"
                    fontWeight="700"
                    textAlign={"left"}
                    sx={{ fontFamily: "'Roboto', sans-serif !important" }}
                  >
                    Attachment (If Any)
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
                  <Typography
                    fontSize={"16px"}
                    my="7px"
                    fontWeight="700"
                    textAlign={"left"}
                    sx={{ fontFamily: "'Roboto', sans-serif !important" }}
                  >
                    The specific details of the complaint
                  </Typography>

                  <TextareaAutosize
                    type="text"
                    name="details"
                    value={values.details}
                    fullWidth
                    style={{ width: "100%", height: "100px" }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.details && touched.details}
                  />
                  <Typography
                    sx={{ color: "#ff0000", fontSize: "12px", ml: "15px" }}
                  >
                    {errors.details && touched.details && errors.details}
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
                    fontFamily: "'Roboto', sans-serif !important",
                  }}
                  // disabled={!isValid || loading}
                >
                  {loading ? (
                    <CircularProgress sx={{ color: "#fff" }} />
                  ) : (
                    "Lodge Complaint"
                  )}
                </Button>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

import { Button, Grid, Stack } from "@mui/material";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useAuth } from "../../provider/AuthProvider";
import { InputField } from "../../components/gernal/InputField";
import { v4 as uuidv4 } from "uuid";
import { Formik } from "formik";
import * as yup from "yup";
import { object, string } from "yup";
import { ERROR, SUCCESS } from "../../constants/snackbarConstant";
import { SNACKBAR_OPEN } from "../../provider/AuthProvider/reducer";
import SelectUser from "../../components/gernal/BasicDropdown";
import BasicDropdown from "../../components/gernal/BasicDropdown";

const ValidationSchema = object().shape({
  role: yup.string().required("Required"),
});

const AddRoleForm = ({ getRoles }) => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const q = query(collection(db, "users"), where("role", "==", "facility"));
      let docData = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        console.log(doc.data(), "date");
        docData.push(doc.data());
        setUsers(docData);
      });
    } catch (error) {
      console.log(error, "errrr");
    }
  };

  const { dispatch } = useAuth();
  const handleAddRole = async (values, actions) => {
    const roleId = uuidv4();
    try {
      await setDoc(doc(db, "roles", roleId), {
        ...values,
        roleId: roleId,
      });
      dispatch({
        type: SNACKBAR_OPEN,
        payload: {
          snackbarType: SUCCESS,
          message: "added successfully",
        },
      });
      getRoles();
    } catch (error) {
      dispatch({
        type: SNACKBAR_OPEN,
        payload: {
          snackbarType: ERROR,
          message: error.message,
        },
      });
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Formik
      onSubmit={(values, actions) => {
        console.log(values);
        handleAddRole(values, actions);
      }}
      validationSchema={ValidationSchema}
      initialValues={{
        role: "",
      }}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        errors,
        touched,
        setFieldValue,
        handleBlur,
      }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1} alignItems="center">
            <Grid item md={6} sm={12} xs={12}>
              <BasicDropdown
                options={users}
                title={"Select User"}
                name="role"
                item={values.role}
                onChange={(e) => {
                  setFieldValue(
                    "role",
                    `${e.target.value.firstName} ${e.target.value.lastName}`
                  );
                }}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12} mt={"24px"}>
              <InputField
                type="text"
                name="Role"
                value={values.catagories}
                label="role"
                fullWidth
                title="Assign role"
                onBlur={handleBlur}
                error={errors.catagories && touched.catagories}
                helperText={
                  errors.catagories && touched.catagories && errors.catagories
                }
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained">
            Add Category
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default AddRoleForm;

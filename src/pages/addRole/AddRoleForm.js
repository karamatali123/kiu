import { Button, Card, Grid, Stack } from "@mui/material";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
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
import useGetCatagories from "../../api/useGetCatagories";
import CustomSelect from "../../components/gernal/Select";
import { Box } from "@mui/system";

const ValidationSchema = object().shape({
  role: yup.string().required("Required"),
});

const AddRoleForm = () => {
  const [users, setUsers] = useState([]);
  const { user, uid, dispatch } = useAuth();
  const catagories = useGetCatagories();

  const updateUserRole = async (role, category) => {
    console.log(user, uid, role, "user");
    const docRef = doc(db, "users", user.uid);

    try {
      await updateDoc(docRef, {
        role: role,
        category: category,
      });
      console.log("role update");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

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

  const handleAddRole = async (values, actions) => {
    const roleId = uuidv4();
    try {
      await setDoc(doc(db, "roles", roleId), {
        ...values,
        roleId: roleId,
      });
      await updateUserRole(values.role, values.category);
      dispatch({
        type: SNACKBAR_OPEN,
        payload: {
          snackbarType: SUCCESS,
          message: "added successfully",
        },
      });

      // getRoles();
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
        user: {},
        category: {},
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
          <Card sx={{ maxWidth: "800px", padding: "20px" }}>
            <Stack gap="10px">
              <BasicDropdown
                options={users}
                title={"Select User"}
                name="user"
                item={values.user}
                onChange={(e) => {
                  setFieldValue("user", e.target.value);
                }}
              />

              <InputField
                type="text"
                name="role"
                value={values.role}
                label="role"
                fullWidth
                title="Assign role"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.catagories && touched.catagories}
                helperText={
                  errors.catagories && touched.catagories && errors.catagories
                }
              />
              <Box width="100%">
                <CustomSelect
                  options={catagories}
                  selectlabel={"Category"}
                  name="category"
                  value={values.category}
                  onChange={(e) => setFieldValue("category", e.target.value)}
                  onBlur={handleBlur}
                  fullWidth={true}
                  error={Boolean(errors.category)}
                  sx={{ width: "100%", height: "50px" }}
                  error_message={
                    touched.category && errors.category && errors.category
                  }
                />
              </Box>

              <Button type="submit" variant="contained">
                Add Category
              </Button>
            </Stack>
          </Card>
        </form>
      )}
    </Formik>
  );
};

export default AddRoleForm;

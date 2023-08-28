import { Card } from "@mui/material";
import { Send } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useAuth } from "../../provider/AuthProvider";
import { InputField } from "../gernal/InputField";
import { v4 as uuidv4 } from "uuid";
import { Formik } from "formik";
import * as yup from "yup";
import { object, string } from "yup";
import { ERROR, SUCCESS } from "../../constants/snackbarConstant";
import { SNACKBAR_OPEN } from "../../provider/AuthProvider/reducer";

const ValidationSchema = object().shape({
  catagories: yup.string().required("Required"),
});

const AddCatagoriesForm = ({ getCatagories }) => {
  const { dispatch } = useAuth();
  const handleAddCatagories = async (values, actions) => {
    console.log(values, "values");
    const categoryId = uuidv4();
    try {
      await setDoc(doc(db, "catagories", categoryId), {
        ...values,
        categoryId: categoryId,
      });
      dispatch({
        type: SNACKBAR_OPEN,
        payload: {
          snackbarType: SUCCESS,
          message: "added successfully",
        },
      });
      getCatagories();
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

  return (
    <Formik
      onSubmit={(values, actions) => {
        handleAddCatagories(values, actions);
      }}
      validationSchema={ValidationSchema}
      initialValues={{
        catagories: "",
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
        <form onSubmit={handleSubmit}>
          <Stack gap={"10px"}>
            <InputField
              type="text"
              name="catagories"
              value={values.catagories}
              label="Category"
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.catagories && touched.catagories}
              helperText={
                errors.catagories && touched.catagories && errors.catagories
              }
            />
            <Button type="submit" variant="contained">
              Add Category
            </Button>
          </Stack>
        </form>
      )}
    </Formik>
  );
};

export default AddCatagoriesForm;

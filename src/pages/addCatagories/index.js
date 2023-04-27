import { Card, Paper } from "@material-ui/core";
import { Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCatagoriesForm from "../../components/gernal/AddCatagoriesForm";
import CatagoriesList from "../../components/gernal/CatagoriesList";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";

import { useAuth } from "../../provider/AuthProvider";
import { db } from "../../firebase";

const AddCatagories = () => {
  const { user } = useAuth();
  const [catagories, setCatagories] = useState([]);
  console.log(catagories, "catagories");
  const getCatagories = async () => {
    try {
      const ref = collection(db, "catagories");
      let docData = [];
      const snapshot = onSnapshot(ref, (snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data(), "data");
          docData.push(doc.data());
        });
      });
      // const documents = snapshot.docs.map((doc) => ({
      //   id: doc.id,
      //   ...doc.data(),
      // }));
      setCatagories(docData);
    } catch (error) {
      console.log(error.message, "errrrrrr");
    }
  };

  useEffect(() => {
    getCatagories();
  }, []);

  return (
    <>
      <Card
        style={{
          height: "calc(100vh - 150px)",
          padding: "2rem",
          overflowY: "scroll",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper style={{ height: "150px", padding: "50px 10px" }}>
              <Typography variant="h5">Add Catagories</Typography>
              <AddCatagoriesForm getCatagories={getCatagories} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper style={{ height: "fit-content", padding: "50px 10px" }}>
              <CatagoriesList
                catagories={catagories}
                getCatagories={getCatagories}
              />
            </Paper>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default AddCatagories;

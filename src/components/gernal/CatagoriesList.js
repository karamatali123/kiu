import React, { useEffect, useState } from "react";
import { deleteDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Delete, Edit, ViewAgenda, ViewArray } from "@material-ui/icons";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { SNACKBAR_OPEN } from "../../provider/AuthProvider/reducer";
import { ERROR, SUCCESS } from "../../constants/snackbarConstant";
import { useAuth } from "../../provider/AuthProvider";

const CatagoriesList = ({ catagories, getCatagories }) => {
  const [open, setOpen] = React.useState(false);
  console.log(catagories);

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Box height={"fit-content"}>
        <Typography variant="h5" textAlign={"center"}>
          All Catagories
        </Typography>

        {catagories.length > 0 ? (
          catagories.map((item, i) => (
            <Stack
              key={i}
              px={"10px"}
              py={"20px"}
              borderBottom="0.5px solid #3a3a3a"
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Typography variant="body1" fontSize={"22px"}>
                {item?.catagories}
              </Typography>
              <Box display={"flex"} gap="10px">
                {/* <Button variant="outlined" onClick={handleClickOpen}>
                  <Delete />
                </Button> */}

                <AlertDialog
                  key={i}
                  open={open}
                  setOpen={setOpen}
                  id={item.categoryId}
                  getCatagories={getCatagories}
                />
                <Edit />
              </Box>
            </Stack>
          ))
        ) : (
          <Typography variant="body2" textAlign={"center"}>
            No catagories added
          </Typography>
        )}
      </Box>
    </>
  );
};

export default CatagoriesList;

function AlertDialog({ id, getCatagories }) {
  const { dispatch } = useAuth();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDelete = async () => {
    const docRef = doc(db, "catagories", id);
    try {
      await deleteDoc(docRef);

      dispatch({
        type: SNACKBAR_OPEN,
        payload: {
          snackbarType: SUCCESS,
          message: "Category deleted successfully",
        },
      });
      setOpen(false);
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
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <Delete />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you Sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDelete}
            variant="contained"
            sx={{ backgroundColor: "red !important" }}
          >
            yes
          </Button>
          <Button onClick={handleClose} variant="contained" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

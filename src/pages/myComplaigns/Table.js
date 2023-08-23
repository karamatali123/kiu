import React, { useState, useEffect, useCallback } from "react";
import { styled } from "@mui/material/styles";
import {
  DeleteForever,
  DeleteForeverOutlined,
  MoreVertOutlined,
  ViewAgenda,
} from "@mui/icons-material";
import {
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../provider/AuthProvider";
import { SNACKBAR_OPEN } from "../../provider/AuthProvider/reducer";
import { ERROR, SUCCESS } from "../../constants/snackbarConstant";
import Loading from "../../components/gernal/Loading";

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  "& .MuiTableCell-root": {
    fontWeight: "bold",
  },
}));

const columns = [
  {
    id: "#",
    label: "#",
    align: "center",
  },
  {
    id: "ComplaintTitle",
    label: "Complaint Title",
    align: "center",
  },

  {
    id: "SubmittedTo",
    label: "Submitted To",
    align: "center",
  },

  {
    id: "Category",
    label: "Category",
    align: "center",
  },
  {
    id: "Date",
    label: "Date",
    align: "center",
  },
  {
    id: "status",
    label: "Status",
    align: "center",
  },
  {
    id: "actions",
    label: "Actions",
    align: "center",
  },
];

const ITEM_HEIGHT = 48;

export default function DataTable() {
  const [anchorEl, setAnchorEl] = React.useState({ element: null, key: null });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const open = Boolean(anchorEl);
  const { user, dispatch } = useAuth();
  const [complaints, setComplaints] = useState([]);

  const getComplaints = async () => {
    try {
      const q = query(
        collection(db, "complaints"),
        where("authorId", "==", user.uid)
      );
      let docData = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        docData.push(doc.data());
        setComplaints(docData);
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getComplaints();
    }
  }, [user]);

  const navigate = useNavigate();
  const handleClick = (event, key) => {
    setAnchorEl({ element: event.currentTarget, key: key });
  };
  const handleClose = () => {
    setAnchorEl({ element: null, key: null });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleDelete = async (id) => {
    const docRef = doc(db, "complaints", id);
    try {
      const res = await deleteDoc(docRef);

      dispatch({
        type: SNACKBAR_OPEN,
        payload: {
          snackbarType: SUCCESS,
          message: "Complaint deleted successfully",
        },
      });
      getComplaints();
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
    <>
      <Paper sx={{ height: "100vh", marginTop: "20px" }}>
        {loading && <Loading />}
        {complaints.length > 0 ? (
          <>
            <TableContainer
              sx={{
                maxHeight: "calc(100vh - 330px)",
                position: "relative",
              }}
            >
              <Table stickyHeader aria-label="sticky table">
                <StyledTableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          paddingTop: "40px",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </StyledTableHead>

                <TableBody>
                  {complaints.map((complaint, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">1</TableCell>
                      <TableCell align="center">{complaint.title}</TableCell>
                      <TableCell align="center">{complaint.submitTo}</TableCell>
                      <TableCell align="center">{complaint.category}</TableCell>
                      <TableCell align="center">{complaint.date}</TableCell>
                      <TableCell align="center">{complaint.status}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          aria-label="more"
                          id="long-button"
                          aria-controls={open ? "long-menu" : undefined}
                          aria-expanded={open ? "true" : undefined}
                          aria-haspopup="true"
                          onClick={(e) => handleClick(e, index)}
                        >
                          <MoreVertOutlined />
                        </IconButton>
                        {anchorEl.key === index && (
                          <Menu
                            id="long-menu"
                            MenuListProps={{
                              "aria-labelledby": "long-button",
                            }}
                            anchorEl={anchorEl.element}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                              style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: "20ch",
                              },
                            }}
                          >
                            <MenuItem
                              onClick={() => {
                                {
                                  handleDelete(complaint.complaintId);
                                }
                              }}
                            >
                              <DeleteForeverOutlined />
                              Delete
                            </MenuItem>
                            <Link
                              to={`/my-complaints/${complaint.complaintId}`}
                              style={{ textDecoration: "none" }}
                            >
                              <MenuItem>
                                <ViewAgenda />
                                View
                              </MenuItem>
                            </Link>
                          </Menu>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={complaints.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <Stack
            alignItems={"center"}
            height={"400px"}
            justifyContent={"center"}
          >
            <Typography variant="h3" textAlign={"center"}>
              No Complaints{" "}
            </Typography>
          </Stack>
        )}
      </Paper>
    </>
  );
}

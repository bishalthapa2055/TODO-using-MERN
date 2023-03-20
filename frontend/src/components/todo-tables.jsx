import React from "react";
import {
  Box,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  TableCell,
  tableCellClasses,
  Stack,
  TablePagination,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Header from "./header";
import CreateSection from "./create-section";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { adminServices } from "../http/admin-services";
import DeleteTodoForm from "./deleteTodoForm";
import UpdateStatus from "./updateStatus";

const StyledBox = styled(Box)({
  position: "absolute",
  top: "250px",
  width: "700px",
  height: "325px",
  // height: "100vh",
  //   border: "1px solid red",
  //   backgroundColor: "green",
});

const StyledTableCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
});

const StyledTableRow = styled(TableRow)({
  "&:nth-of-type(odd)": {
    backgroundColor: "grey",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
});

const TodoTables = () => {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [id, setId] = React.useState();
  const [currentTodo, setCurrentTodo] = React.useState();
  const [modalState, setModalState] = React.useState(false);
  const [deleteDialog, setDeleteDailog] = React.useState(false);

  const [optionId, setOptionId] = React.useState("");
  const [todoStatus, settodoStatus] = React.useState("");
  const [todoStatusModel, settodoStatusModel] = React.useState(false);

  const dispatch = useDispatch();
  const total = useSelector((state) => state.todo.total);
  const todoDatas = useSelector((state) => state.todo.todos);

  const completionTodoRate = useSelector((state) => state.todo.completionRate);

  const { data, isLoading } = useQuery(["todos", page, rowsPerPage], () => {
    adminServices.getAllTodo(dispatch, {
      page,
      rowsPerPage,
    });
  });

  const { data1, isLoading1 } = useQuery(["todos"], () => {
    adminServices.getAllCompletionRate(dispatch);
  });

  // console.log(completionTodoRate);
  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(+event.target.value, 10));
    setPage(0);
  };

  const openDeleteDialog = (id, data) => {
    //
    setId(id);
    setCurrentTodo(data);
    setDeleteDailog(!modalState);
  };
  const closeModel = () => {
    settodoStatusModel((prev) => !prev);
  };
  return (
    <>
      <Header />
      <CreateSection />
      <Box>
        <StyledBox>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Tasks</StyledTableCell>
                  <StyledTableCell align="left">Description</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="right">Operations</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todoDatas &&
                  todoDatas?.length &&
                  todoDatas?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  ) &&
                  todoDatas?.map((row, index) => (
                    <StyledTableRow key={row?.id} align="center">
                      <StyledTableCell component="th" scope="row">
                        {row?.title}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row?.description}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {/* {row?.status} */}

                        <Select
                          value={row.status}
                          // defaultValue={row?.status}
                          // backgroundColor="green"
                          sx={{
                            backgroundColor:
                              row?.status === "completed" ? "green" : "red",
                            color: "white",
                          }}
                          onChange={(e) => {
                            setOptionId(row?.id);
                            settodoStatus(e.target.value);
                            settodoStatusModel(true);
                          }}
                          onClick={() => console.log(row?.id)}
                        >
                          <MenuItem value="completed">Completed</MenuItem>
                          <MenuItem value="incomplete">Incomplete</MenuItem>
                        </Select>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Tooltip title="Delete">
                          <IconButton>
                            <DeleteOutlineOutlinedIcon
                              sx={{
                                "& :hover": { color: "red" },
                                cursor: "pointer",
                                color: "red",
                              }}
                              onClick={() => openDeleteDialog(row?.id, row)}
                            />
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={total}
              rowsPerPage={rowsPerPage}
              page={page - 1}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              color="red"
              sx={{ backgroundColor: "#D8E6CC" }}
            />
          </TableContainer>
        </StyledBox>
        <Box
          sx={{
            position: "relative",
            width: "400px",
            height: "300px",
            top: "105px",
            left: "725px",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>DATE </StyledTableCell>
                  <StyledTableCell align="right">
                    COMPLETED RATE PER DAY
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {completionTodoRate ? (
                  <>
                    {completionTodoRate?.map((data) => (
                      <StyledTableRow key={data[0]}>
                        <StyledTableCell component="th" scope="row">
                          {data[0]}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {data[1]}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </>
                ) : (
                  "Data UnAvailable"
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      {deleteDialog && (
        <DeleteTodoForm id={id} setModal={setDeleteDailog} todo={currentTodo} />
      )}
      {todoStatusModel && (
        <UpdateStatus
          closeFunction={closeModel}
          id={optionId}
          status={todoStatus}
          setModal={todoStatusModel}
        />
      )}
    </>
  );
};

export default TodoTables;

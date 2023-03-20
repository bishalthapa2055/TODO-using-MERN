import React from "react";
import {
  Box,
  Stack,
  Button,
  Typography,
  Dialog,
  Grid,
  Snackbar,
  experimentalStyled,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { adminServices } from "../http/admin-services";
const DialogWrapper = experimentalStyled(Dialog)(
  () => `
        .MuiDialog-paper {
          overflow: visible;
        }
  `
);

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const DeleteTodoForm = ({ id, setModal, todo }) => {
  // const { enqueSnackbar } = useSnackbar();

  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const deleteConfirm = async (event) => {
    // e.preventDefault();
    // event.preventDefault();
    // console.log("[id]", id);
    try {
      const res = await adminServices.deleteTodo(dispatch, id);
      if (res) {
        // setOpen(true);
        setModal((model) => !model);
        enqueueSnackbar("Sucessfully Deleted Todo", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } catch (err) {
      enqueueSnackbar("Failed to Delete Todo", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <DialogWrapper open={true} maxWidth="sm" fullWidth keepMounted>
      <Stack alignItems="center" justifyContent="center" p={3}>
        <Typography align="center" variant="h6">
          Do you want to delete TODO : <b> {todo?.title} </b>permanently ?
        </Typography>

        <Grid container mt={3}>
          <Grid item xs={6} textAlign="center">
            <Button
              variant="contained"
              size="medium"
              onClick={() => setModal((prev) => !prev)}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6} textAlign="center">
            <Button
              variant="outlined"
              sx={{ color: "black" }}
              size="medium"
              onClick={() => deleteConfirm()}
            >
              Confirm
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={5000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert
                onclose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
                vertical="top"
                horizontal="right"
              >
                <b>{todo.title} Deleted Sucessfully !!!</b>
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </Stack>
    </DialogWrapper>
  );
};

export default DeleteTodoForm;

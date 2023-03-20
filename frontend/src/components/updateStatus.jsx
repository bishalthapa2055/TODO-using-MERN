// import { adminService } from "../../../../http/admin-service";
import { experimentalStyled } from "@mui/material";
import { Box, Button, Typography, Dialog, Grid } from "@mui/material";
import axios from "axios";
import React from "react";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { adminServices } from "../http/admin-services";
import { useQuery } from "react-query";
// import { useAppDispatch } from "@/src/hooks/hooks";

const DialogWrapper = experimentalStyled(Dialog)(
  () => `
        .MuiDialog-paper {
          overflow: visible;
        }
  `
);

const UpdateStatus = ({ closeFunction, id, status, model }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const updateFunction = async () => {
    const fetchData = async () => {
      const values = {
        status: status,
      };
      const res = await adminServices.updateTodo(dispatch, id, values);
      console.log(res);
      if (res) {
        try {
          enqueueSnackbar("TODO Status Updated Sucessfully", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
          const completionRates = await adminServices.getAllCompletionRate(
            dispatch
          );
          console.log(completionRates);
          closeFunction(!model);
        } catch (e) {
          enqueueSnackbar("Failed to update Status", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        }
      }
    };
    if (id) fetchData();
  };

  return (
    <DialogWrapper open={true} maxWidth="sm" fullWidth keepMounted>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        p={5}
      >
        <Typography align="center" variant="h6">
          Are you sure you want to update the TODO status ?
        </Typography>

        <Grid container spacing={3} my={2}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              size="medium"
              onClick={() => closeFunction()}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6} align="end">
            <Button
              variant="outlined"
              sx={{ color: "black" }}
              size="medium"
              onClick={() => updateFunction()}
            >
              Confirm
            </Button>
          </Grid>
        </Grid>
      </Box>
    </DialogWrapper>
  );
};

export default UpdateStatus;

import React from "react";
import { useState } from "react";
import { Box, Button, Grid, styled, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { adminServices } from "../http/admin-services";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import { todoSchema } from "../schemas/todo";

const initialValues = {
  title: "",
  description: "",
};

const StyledBox = styled(Box)({
  position: "relative",
  //   backgroundColor: "green",
  border: "1px solid white",
  height: "80px",
  top: "50px",
});
const CreateSection = (e) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = async () => {
    const data = {
      title: title,
      description: description,
    };
    try {
      const res = await adminServices.createTodo(dispatch, data);

      if (res) {
        enqueueSnackbar("TODO created Sucessfully", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        // e.resetForm();
        setTitle("");
        setDescription("");
      }
    } catch (e) {
      //console.e
      console.log(e.response.data.message);
      let error = e.response.data.message;
      enqueueSnackbar(error, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  return (
    <>
      <StyledBox sx={{ flexGrow: 1 }}>
        {/* <form onSubmit={handleSubmit}> */}
        <Grid
          container
          spacing={2}
          sx={{
            position: "relative",
            top: "24px",
            left: "15px",
            height: "60px",
            width: "1150px",
            // backgroundColor: "grey",
          }}
        >
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="Enter Task"
              variant="outlined"
              value={title}
              sx={{
                position: "relative",
                top: "-10px",
              }}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Enter Description"
              value={description}
              variant="outlined"
              sx={{
                position: "relative",
                top: "-10px",
                width: "500px",
              }}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              startIcon={<AddIcon fontSize="medium" />}
              onClick={handleClick}
            >
              Create TODO
            </Button>
          </Grid>
        </Grid>
        {/* </form> */}
      </StyledBox>
    </>
  );
};

export default CreateSection;

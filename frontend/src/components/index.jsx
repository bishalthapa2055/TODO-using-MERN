import React from "react";
import { Container, Box } from "@mui/material";
import Header from "./header";
import CreateSection from "./create-section";
import TodoTables from "./todo-tables";

const Index = () => {
  return (
    <Container
      maxWidth="lg"
      sx={
        {
          // backgroundColor: "black",
          // height: "100vh",
        }
      }
    >
      {/* <Header /> */}
      {/* <CreateSection /> */}
      <TodoTables />
    </Container>
  );
};

export default Index;

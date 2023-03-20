import React from "react";
import { Box, Typography, styled } from "@mui/material";
const StyledTypo = styled(Typography)({
  textAlign: "center",
  fontWeight: 500,
});
const Header = () => {
  return (
    <StyledTypo variant="h4" gutterBottom>
      NIMBUZZ - TODO - APP
    </StyledTypo>
  );
};

export default Header;

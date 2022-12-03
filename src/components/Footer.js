import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        width: "100%",
        position: "fixed",
        bottom: "0px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          float: "right",
          width: "auto",
          padding: "0.1em",
          paddingLeft: "0.5em",
        }}
      >
        <Typography color="secondary.main">Felix Di Luciano</Typography>
      </Box>
      <Box
        sx={{
          float: "right",
          width: "auto",
          padding: "0.1em",
          paddingRight: "0.5em",
        }}
      >
        <Typography color="secondary.main">All rights reserved 2022</Typography>
      </Box>
    </Box>
  );
}

export default Footer;

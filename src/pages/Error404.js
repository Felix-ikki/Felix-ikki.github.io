import { Container, Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import BigButton from '..//components/BigButton'  
import H2 from '..//components/H2'
import H1 from '..//components/H1'


function Error404() {
  const navigate = useNavigate();

  return (
    <>
      <Container
        maxWidth="1600"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            padding: "1em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <H1
          >
            ERROR 404
          </H1>
          <H2
          >
            PAGE NOT FOUND
          </H2>
          <BigButton
            onClickFunction={() => navigate(-1)}
          >
            GO BACK
          </BigButton>
        </Box>
      </Container>
    </>
  );
}

export default Error404;

import * as React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import BigButton from "../components/BigButton";
import H1 from '../components/H1'
import H2 from '../components/H2'


function Home() {
  return (
    <>
      <Navbar />
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
          <H1>GYMBRO</H1>
          <H2>
            The best way to build your training plan
          </H2>
          <BigButton page={"/MyRoutines"}>USE NOW</BigButton>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Home;

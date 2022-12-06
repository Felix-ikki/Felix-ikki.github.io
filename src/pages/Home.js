import * as React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import BigButton from "../components/BigButton";
import H1 from '../components/H1'
import H2 from '../components/H2'
import { Navigate, useNavigate } from "react-router-dom";


function Home() {

const navigate = useNavigate()

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
          <BigButton onClickFunction={()=> navigate('/MyRoutines')}>USE NOW</BigButton>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Home;

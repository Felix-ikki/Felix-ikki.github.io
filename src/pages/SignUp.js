import React from "react";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../App";
import { TextField, Button, Typography, Skeleton } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box, Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Auth";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";


const SignUp = () => {

  const theme = useTheme()

  const Navigate = useNavigate();

  const { setUserName } = useContext(UserContext);
  const { setPassword } = useContext(UserContext);
  const { setAllRoutines } = useContext(UserContext);

  const [inputUserNameSignUp, setInputUserNameSignUp] = useState("");
  const [inputPasswordSignUp, setInputPasswordSignUp] = useState("");
  const [loading, setLoading] = useState(true);

  const auth = useAuth();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const signUp = () => {
    if (inputUserNameSignUp.length >= 4 && inputPasswordSignUp.length >= 6) {
      setUserName(inputUserNameSignUp);
      setPassword(inputPasswordSignUp);
      setAllRoutines([]);
      auth.login(true);
      Navigate("/MyRoutines");
    }
  };

  const handleInputUserNameChange = (event) => {
    setInputUserNameSignUp(event.target.value);
  };

  const handleInputPasswordChange = (event) => {
    setInputPasswordSignUp(event.target.value);
  };

  return (
    <>
      <Navbar />
      <Container
        maxWidth="1600"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "auto",
          paddingLeft: "0em",
          marginLeft: "0em",
        }}
      >
        <Box
          sx={{
            padding: "1em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "auto",
            height: "100vh",
          }}
        >
          {loading ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "25em",
                }}
              >
                <Skeleton
                  variant="text"
                  width="10em"
                  height="5em"
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  color="white"
                  width="20em"
                  height="5em"
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  color="white"
                  width="20em"
                  height="5em"
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  width="10em"
                  height="5em"
                  animation="wave"
                />
              </div>
            </>
          ) : (
            <>
              <Box
                sx={{
                  padding: "3em",
                  [theme.breakpoints.up('xs')]: {
                    width: "100%",
                  },
                  [theme.breakpoints.up('sm')]: {
                    width: "30em",
                  },                  backgroundColor: "#fff",
                  borderRadius: "15px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h2" style={{ marginBottom: "0.5em" }}>
                  Sign Up
                </Typography>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    required
                    label="UserName"
                    placeholder="Enter username"
                    variant="outlined"
                    value={inputUserNameSignUp}
                    onChange={handleInputUserNameChange}
                    error={inputUserNameSignUp.length <= 4}
                    helperText={
                      inputUserNameSignUp.length <= 4
                        ? "Your user name must have more than 4 characters"
                        : "Perfect"
                    }
                    sx={{ 
                      [theme.breakpoints.up('xs')]: {
                        width: "300px",
                      },
                      [theme.breakpoints.up('sm')]: {
                        width: "400px",
                      }, marginBottom: "1em" }}
                  />

                  <TextField
                    required
                    label="Password"
                    placeholder="Enter password"
                    variant="outlined"
                    type="password"
                    value={inputPasswordSignUp}
                    onChange={handleInputPasswordChange}
                    error={inputPasswordSignUp.length <= 6}
                    helperText={
                      inputPasswordSignUp.length <= 6
                        ? "Your password must have more than 6 characters"
                        : "Perfect"
                    }
                    sx={{ 
                      [theme.breakpoints.up('xs')]: {
                        width: "300px",
                      },
                      [theme.breakpoints.up('sm')]: {
                        width: "400px",
                      },  marginBottom: "1em" }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    variant1="smallButton"
                    onClick={signUp}
                  >
                    Sign Up
                  </Button>
                </div>

                <Typography sx={{ marginTop: "2em" }}>
                  {" "}
                  You have an account?
                  <Link to={"/LogIn"}>Log In</Link>
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default SignUp;

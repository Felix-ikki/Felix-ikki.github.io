import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { UserContext } from "../App";
import { TextField, Button, Typography, Skeleton } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box, Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../components/Auth";
import { useTheme } from "@emotion/react";
import Link from "react-router-dom";

const LogIn = () => {

  const theme = useTheme()
  const navigate = useNavigate();

  const { userName } = useContext(UserContext);
  const { password } = useContext(UserContext);
  const { inputUserNameLogin, setInputUserNameLogin } = useContext(UserContext);
  const { inputPasswordLogin, setInputPasswordLogin } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const auth = useAuth();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const logIn = () => {
    if (userName === inputUserNameLogin && password === inputPasswordLogin) {
      auth.login(true);
      navigate("/MyRoutines");
    } else {
      setOpen(true);
    }
  };

  const handleInputUserNameChange = (event) => {
    setInputUserNameLogin(event.target.value);
  };

  const handleInputPasswordChange = (event) => {
    setInputPasswordLogin(event.target.value);
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
                  },
                  backgroundColor: "#fff",
                  borderRadius: "15px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h2" style={{ marginBottom: "0.5em" }}>
                  Log In
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
                    value={inputUserNameLogin}
                    onChange={handleInputUserNameChange}
                    sx={{ 
                      [theme.breakpoints.up('xs')]: {
                        width: "300px",
                      },
                      [theme.breakpoints.up('sm')]: {
                        width: "400px",
                      },
                       marginBottom: "1em" }}
                  />

                  <TextField
                    required
                    label="Password"
                    placeholder="Enter password"
                    variant="outlined"
                    type="password"
                    value={inputPasswordLogin}
                    onChange={handleInputPasswordChange}
                    sx={{ 
                      [theme.breakpoints.up('xs')]: {
                        width: "300px",
                      },
                      [theme.breakpoints.up('sm')]: {
                        width: "400px",
                      }, 
                      marginBottom: "1em" }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    variant1="smallButton"
                    onClick={logIn}
                  >
                    Log In
                  </Button>
                </div>

                <Typography sx={{ marginTop: "3em" }}>
                  {" "}
                  You don't have an account?
                  <Link to={"/SignUp"}>Sign Up</Link>
                </Typography>
              </Box>

              <Box
                sx={{
                  width: "95%",
                  position: "fixed",
                  top: "70px",
                }}
              >
                <Collapse in={open}>
                  <Alert
                    variant="filled"
                    severity="error"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ marginBottom: 2 }}
                  >
                    Your account is not correct or it does not exist
                  </Alert>
                </Collapse>
              </Box>
            </>
          )}
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default LogIn;

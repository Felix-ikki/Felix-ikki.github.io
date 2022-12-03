import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useContext, useState } from "react";
import { useAuth } from "./Auth";
import { useTheme } from "@emotion/react";
import DehazeIcon from '@mui/icons-material/Dehaze';
import NavbarResponsive from "./NavbarResponsive";

export default function Navbar() {

  const theme = useTheme()

  const { userName, setUserName } = useContext(UserContext);
  const { password, setPassword } = useContext(UserContext);
  const { loggedIn, setLoggedIn } = useContext(UserContext);

  const [navbarResponsive, setNavbarResponsive] = useState(false)

  const auth = useAuth();

  const navigate = useNavigate();

  const logOut = () => {
    auth.logout(false);
  };

  const settingNav = () => {
    if (!navbarResponsive) {
    setNavbarResponsive(true)
    }
    else {
      setNavbarResponsive(false)

    }
  }

  return (
    <>
    <Box
      sx={{
        width: "100%",
      }}
    >
      <AppBar position="fixed">
        <Toolbar sx={{ backgroundColor: "primary.main" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => navigate("/")}
          >
            <FitnessCenterIcon />
          </IconButton>
          <Typography
            sx={{
              flexGrow: 1,
              fontFamily: "Shadows Into Light, cursive",
              fontSize: "2em",
              cursor: "default",
            }}
          >
            GYMBRO
          </Typography>
          <div className="navLinkContainer">
            <Box sx={{
                    [theme.breakpoints.up('xs')]: {
                      display: 'none'
                    },
                    [theme.breakpoints.up('sm')]: {
                      display: 'block'
                    },
            }}>
              <Link to={"/MyRoutines"} className="navLink">
                MY ROUTINES
              </Link>
            </Box>

            {!auth.loggedIn && (
              <>
                <Box sx={{
                    [theme.breakpoints.up('xs')]: {
                      display: 'none'
                    },
                    [theme.breakpoints.up('sm')]: {
                      display: 'block'
                    },
            }}>
                  <Link to={"/Login"} className="navLink">
                    LOG IN
                  </Link>
                </Box>
                <Box sx={{
                    [theme.breakpoints.up('xs')]: {
                      display: 'none'
                    },
                    [theme.breakpoints.up('sm')]: {
                      display: 'block'
                    },
            }}>
                  <Link to={"/SignUp"} className="navLink">
                    SIGN UP
                  </Link>
                </Box>
              </>
            )}

            {auth.loggedIn && (
              <>
            <Box sx={{
                    [theme.breakpoints.up('xs')]: {
                      display: 'none'
                    },
                    [theme.breakpoints.up('sm')]: {
                      display: 'block'
                    },
            }}>                  <Link to={"/LogIn"} className="navLink" onClick={logOut}>
                    LOG OUT
                  </Link>
                </Box>
                <div>
                  <Typography>Hi, {userName}!</Typography>
                </div>
              </>
            )}
            <Button sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
                    [theme.breakpoints.up('xs')]: {
                      display: 'block'
                    },
                    [theme.breakpoints.up('sm')]: {
                      display: 'none'
                    },
            }}
            onClick={settingNav}>
              <DehazeIcon sx={{color: 'white'}}></DehazeIcon>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>

            {navbarResponsive &&
                    <NavbarResponsive/>}

    </>
  );
}

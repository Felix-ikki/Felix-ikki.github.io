import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useContext } from "react";
import { useAuth } from "./Auth";
import { useTheme } from "@emotion/react";
import DehazeIcon from '@mui/icons-material/Dehaze';

function NavbarResponsive() {

    const theme = useTheme()

    const { userName, setUserName } = useContext(UserContext);
    const { password, setPassword } = useContext(UserContext);
    const { loggedIn, setLoggedIn } = useContext(UserContext);
  
    const auth = useAuth();
  
    const navigate = useNavigate();
  
    const logOut = () => {
      auth.logout(false);
    };
  
  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        right: '0',
        height: '100vh',
        backgroundColor: theme.palette.primary.main,
        zIndex: '1',
        padding: '1em',
        [theme.breakpoints.up('sm')]: {
          display: "none",
        }
    }}>
         <div className="navLinkContainer" 
         style={{
            marginTop: '5em',
             flexDirection: 'column',
              height: '4em',
              justifyContent: 'space-between',
              alignItems: 'start'}}>
            <Box>
              <Link to={"/MyRoutines"} className="navLink">
                MY ROUTINES
              </Link>
            </Box>

            {!auth.loggedIn && (
              <>
                <Box>
                  <Link to={"/Login"} className="navLink">
                    LOG IN
                  </Link>
                </Box>
                <Box >
                  <Link to={"/SignUp"} className="navLink">
                    SIGN UP
                  </Link>
                </Box>
              </>
            )}

            {auth.loggedIn && (
              <>
            <Box>
                <Link to={"/LogIn"} className="navLink" onClick={logOut}>
                    LOG OUT
                  </Link>
                </Box>
              </>
            )}
          </div>

    </Box>
  )
}

export default NavbarResponsive
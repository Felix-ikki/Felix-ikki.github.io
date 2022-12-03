import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { Skeleton } from "@mui/material";
import { useLocalStorage } from "../customHooks/useLocalStorage";
import { TextField } from "@mui/material";
import { UserContext } from "../App";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BigButton from '..//components/BigButton'  
import H2 from '..//components/H2'
import { useTheme } from "@emotion/react";

export default function SelectExercises() {

  const theme = useTheme()

  const { list, setList } = useContext(UserContext);
  const navigate = useNavigate();
  const [nextClick, setNextClick] = useState("");
  const [open, setOpen] = useState(true);
  const [selectedExercises, setSelectedExercises] = useLocalStorage(
    "selectedExercises",
    0
  );
  const [filter, setFilter] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleClick = (movement, index) => {
    const newList = { ...list };
    newList[movement][index].isClicked = !newList[movement][index].isClicked;
    setList(newList);
    if (list[movement][index].isClicked) {
      return setSelectedExercises(selectedExercises + 1);
    } else if (!list[movement][index].isClicked) {
      return setSelectedExercises(selectedExercises - 1);
    }
  };

  const handleNextClick = () => {
    setNextClick(true);
    setOpen(true);
    if (selectedExercises >= 1) {
      navigate("/Phase2Create");
    }
  };

  const eraseExercises = () => {
    setSelectedExercises(0);
    for (let movement in list) {
      for (let i = 0; i < list[movement].length; i++) {
        list[movement][i].isClicked = false;
      }
    }
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
        }}
      >
        <Box
          sx={{
            padding: "0",
            display: "flex",
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: "center",
            width: "auto",
            marginTop: "5em",
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
                  width: "90vw",
                }}
              >
                <Skeleton
                  variant="text"
                  width="20em"
                  height="5em"
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  sx={{
                  [theme.breakpoints.up('xs')]: {
                    width: "22em",  
                  },
                  [theme.breakpoints.up('sm')]: {
                    width: "30em",  
                  },
                  [theme.breakpoints.up('md')]: {
                    width: "50em",  
                  },
                  }}
                  height="5em"
                  animation="wave"
                />
                <div style={{ marginRight: "auto" }}>
                  <Skeleton
                    variant="text"
                    width="10em"
                    height="5em"
                    animation="wave"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "70vw",
                    marginTop: "2em",
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width="9em"
                    height="10em"
                    animation="wave"
                  />
                  <Skeleton
                    variant="rectangular"
                    width="9em"
                    height="10em"
                    animation="wave"
                  />
                  <Skeleton
                    variant="rectangular"
                    width="9em"
                    height="10em"
                    animation="wave"
                  />
                  <Skeleton
                    variant="rectangular"
                    width="9em"
                    height="10em"
                    animation="wave"
                  />
                  <Skeleton
                    variant="rectangular"
                    width="9em"
                    height="10em"
                    animation="wave"
                  />
                  <Skeleton
                    variant="rectangular"
                    width="9em"
                    height="10em"
                    animation="wave"
                  />
                  <Skeleton
                    variant="rectangular"
                    width="9em"
                    height="10em"
                    animation="wave"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <H2>Choose your exercises</H2>

              <TextField
                id="outlined-basic"
                label="Search Exercises"
                variant="outlined"
                sx={{ 
                  height: "3em",
                  marginTop: "2em",
                  [theme.breakpoints.up('xs')]: {
                    width: "22em",  
                  },
                  [theme.breakpoints.up('sm')]: {
                    width: "30em",  
                  },
                  [theme.breakpoints.up('md')]: {
                    width: "50em",  
                  },
                }}
                onChange={(event) =>
                  setFilter(event.target.value.toLowerCase())
                }
              />
              <Box
                className="containerAllUls"
              >
                {Object.keys(list).map((movement) => (
                  <React.Fragment key={movement + "Fragment"}>
                    <h2>{movement}</h2>
                    <Box
                      className="containerMovementButtons"
                    >
                      {list[movement].map(
                        (exercise, index) =>
                          exercise.title.toLowerCase().includes(filter) && (
                            <Button
                              variant="individualExercise"
                              key={exercise.title}
                              id={exercise.title}
                              sx={{
                                backgroundColor: exercise.isClicked
                                  ? "rgb(15, 175, 15)"
                                  : "#90caf9",
                                color: exercise.isClicked ? "#fff" : "#000",
                              }}
                              onClick={() => handleClick(movement, index)}
                            >
                              {exercise.title}
                            </Button>
                          )
                      )}
                    </Box>
                  </React.Fragment>
                ))}
              </Box>

              <Box
                sx={{
                  padding: "1em",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: '4em', 
                  [theme.breakpoints.up('xs')]: {
                    width: "25em",
                  },
                  [theme.breakpoints.up('sm')]: {
                    width: "35em",
                  },
                  [theme.breakpoints.up('md')]: {
                    width: "45em",
                  },
                  }}
              >
                <BigButton
                  onClickFunction={() => navigate(-1)}
                >
                  Go Back
                </BigButton>
                <BigButton
                  onClickFunction={() => handleNextClick()}
                >
                  Next
                </BigButton>
              </Box>
            </>
          )}

          {selectedExercises < 1 && nextClick && (
            <Box sx={{ width: "95%", position: "fixed", top: "70px" }}>
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
                  You must select at least one exercise to continue
                </Alert>
              </Collapse>
            </Box>
          )}
        </Box>
      </Container>
      {selectedExercises >= 1 && (
        <Box
          sx={{
            backgroundColor: "#bdb9b7",
            position: "fixed",
            [theme.breakpoints.down('lg')]: {
              top: "6em",
              right: "1em",
              fontSize: "0.8em",
            },
            [theme.breakpoints.up('lg')]: {
              top: "5em",
              right: "1em",
              fontSize: "1em",
            },
            padding: "0em 1em 0em 1em",
            marginBottom: "0.3em",
            borderRadius: "15px",
            fontFamily: "Lato, sans-serif",
            fontSize: "1.3em",
            animationName: "bigger",
            animationDuration: "0.5s",
          }}
        >
          <p style={{ display: "inline-block" }}>
            {selectedExercises} EXERCISES SELECTED
          </p>
        </Box>
      )}
      {selectedExercises >= 1 && (
        <Button
          sx={{
            backgroundColor: "RED",
            position: "fixed",
            [theme.breakpoints.down('lg')]: {
              top: "10em",
              right: "1em",
              fontSize: "0.8em",
            },
            [theme.breakpoints.up('lg')]: {
              top: "9em",
              right: "1em",
              fontSize: "1em",
            },
            padding: "0px 1em 0px 1em",
            marginBottom: "0.3em",
            borderRadius: "15px",
            fontFamily: "Lato, sans-serif",
            color: "white",
            animationName: "bigger",
            animationDuration: "0.5s",
            "&:hover": {
              backgroundColor: "#ff5131",
            },
          }}
          onClick={eraseExercises}
        >
          <p style={{ marginRight: "20px" }}>Erase all exercises</p>
          <CloseIcon />
        </Button>
      )}
      <Footer />
    </>
  );
}

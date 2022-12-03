import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import Button from "@mui/material/Button";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useLocalStorage } from "../customHooks/useLocalStorage";
import MapExercisesPerDay from "../components/MapExercisesPerDay";
import { Skeleton } from "@mui/material";
import H2 from '..//components/H2'
import BiggButton from '../components/BigButton'
import { useTheme } from "@emotion/react";


export default function Phase2Create() {

  const theme = useTheme()

  const navigate = useNavigate();

  const { list, setList } = useContext(UserContext);
  const [nextClick, setNextClick] = useState("");
  const [open, setOpen] = useState(true);
  const [day, setDay] = useLocalStorage("day", false);
  const [exercisesLeft, setExercisesLeft] = useLocalStorage(
    "exercisesLeft",
    true
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const hadleClickGreenButton = (movement, index) => {
    if (day) {
      const newList = { ...list };
      newList[movement][index].day = day;
      setList(newList);

      const newList2 = [];
      for (let movement in list) {
        for (let i = 0; i < list[movement].length; i++) {
          if (list[movement][i].isClicked) {
            newList2.push(list[movement][i]);
          }
        }
      }
      for (let i = 0; i < newList2.length; i++) {
        if (!newList2[i].day) {
          setExercisesLeft(true);
          break;
        } else {
          setExercisesLeft(false);
        }
      }
    } else {
      return;
    }
  };

  const handleNextClick = () => {
    setNextClick(true);
    setOpen(true);

    if (!exercisesLeft) {
      navigate("/Phase3Create");
    } else {
      return;
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
            padding: "1em",
            display: "flex",
            flexDirection: "column",
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
                <div style={{ marginTop: "3em" }}>
                  <Skeleton
                    variant="rectangular"
                    width="95vw"
                    height="7em"
                    animation="wave"
                  />
                </div>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-Between",
                    [theme.breakpoints.up('xs')]: {
                      width: '70vw',
                    },
                    [theme.breakpoints.up('sm')]: {
                      width: '80vw',
                    },
                    [theme.breakpoints.up('md')]: {
                      width: '65vw',
                    },
                    [theme.breakpoints.up('lg')]: {
                      width: '50vw',
                    },
                    marginTop: "2em",
                  }}
                >
                  <Skeleton
                    variant="text"
                    sx={{[theme.breakpoints.up('xs')]: {
                      width: "10em",
                    },
                  [theme.breakpoints.up('sm')]: {
                    width: "15em",
                  },
                  [theme.breakpoints.up('md')]: {
                    width: "18em",
                  }
                  }} 
                    height="10em"
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    sx={{[theme.breakpoints.up('xs')]: {
                      width: "10em",
                    },
                  [theme.breakpoints.up('sm')]: {
                    width: "15em",
                  },
                  [theme.breakpoints.up('md')]: {
                    width: "18em",
                  }
                  }}
                    height="10em"
                    animation="wave"
                  />
                </Box>
              </div>
            </>
          ) : (
            <>
              <H2>SCHEDULE YOUR TRAINING PLAN</H2>

              <Box className="containerMovementButtons">
                {Object.keys(list).map((movement) => (
                  <React.Fragment key={movement + "Fragment"}>
                    {list[movement].map(
                      (exercise, index) =>
                        exercise.isClicked &&
                        !exercise.day && (
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
                            onClick={() =>
                              hadleClickGreenButton(movement, index)
                            }
                          >
                            {exercise.title}
                          </Button>
                        )
                    )}
                  </React.Fragment>
                ))}
              </Box>

              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "#bdb9b7",
                  borderRadius: "15px",
                  padding: "1.5em 1em 1.5em 1em",
                  marginBottom: "4em",
                [theme.breakpoints.down('lg')]: {
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                },
                [theme.breakpoints.up('lg')]: {
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }
                }}
              >
                <MapExercisesPerDay
                  dayString="monday"
                  day={day}
                  setDay={setDay}
                  exercisesLeft={exercisesLeft}
                  setExercisesLeft={setExercisesLeft}
                />

                <MapExercisesPerDay
                  dayString="tuesday"
                  day={day}
                  setDay={setDay}
                  exercisesLeft={exercisesLeft}
                  setExercisesLeft={setExercisesLeft}
                />

                <MapExercisesPerDay
                  dayString="wednesday"
                  day={day}
                  setDay={setDay}
                  exercisesLeft={exercisesLeft}
                  setExercisesLeft={setExercisesLeft}
                />

                <MapExercisesPerDay
                  dayString="thursday"
                  day={day}
                  setDay={setDay}
                  exercisesLeft={exercisesLeft}
                  setExercisesLeft={setExercisesLeft}
                />

                <MapExercisesPerDay
                  dayString="friday"
                  day={day}
                  setDay={setDay}
                  exercisesLeft={exercisesLeft}
                  setExercisesLeft={setExercisesLeft}
                />

                <MapExercisesPerDay
                  dayString="saturday"
                  day={day}
                  setDay={setDay}
                  exercisesLeft={exercisesLeft}
                  setExercisesLeft={setExercisesLeft}
                />

                <MapExercisesPerDay
                  dayString="sunday"
                  day={day}
                  setDay={setDay}
                  exercisesLeft={exercisesLeft}
                  setExercisesLeft={setExercisesLeft}
                />
              </Box>

              {day && (
                <Box
                  sx={{
                    width: "15.5em",
                    backgroundColor: "#bdb9b7",
                    position: "fixed",
                    top: "70px",
                    padding: "0em 1em 0em 1em",
                    right: "30px",
                    marginRight: "auto",
                    marginBottom: "0.3em",
                    borderRadius: "15px",
                    fontFamily: "Lato, sans-serif",
                    fontSize: "1.3em",
                    animationName: "bigger",
                    animationDuration: "0.5s",
                  }}
                >
                  <p style={{ display: "inline-block" }}>
                    Select the exercises you want to add to{" "}
                    <strong>{day}</strong>
                  </p>
                </Box>
              )}

              <Box
                sx={{
                  padding: "1em",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  [theme.breakpoints.up('xs')]: {
                    width: "25em",
                  },
                  [theme.breakpoints.up('sm')]: {
                    width: "35em",
                  },
                  [theme.breakpoints.up('md')]: {
                    width: "45em",
                  }
                }}
              >
                <BiggButton
                  variant="contained"
                  variant1="normalButton"
                  onClickFunction={() => navigate(-1)}
                >
                  Go Back
                </BiggButton>

                <BiggButton
                  variant="contained"
                  variant1="normalButton"
                  onClickFunction={handleNextClick}
                >
                  Next
                </BiggButton>
              </Box>
            </>
          )}

          {nextClick && exercisesLeft && (
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
      <Footer />
    </>
  );
}

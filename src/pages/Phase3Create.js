import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../App";
import SliderSets from "../components/SliderSets";
import { SliderReps } from "../components/SliderReps";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { useLocalStorage } from "../customHooks/useLocalStorage";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Skeleton } from "@mui/material";
import BigButton from '..//components/BigButton'  
import H2 from '..//components/H2'
import { useTheme } from "@emotion/react";
import H2White from '../components/H2White'

export default function Phase3Create() {

  const theme = useTheme()
  
  const navigate = useNavigate();

  const { valueReps } = useContext(UserContext);
  const { valueSets } = useContext(UserContext);
  const { list, setList } = useContext(UserContext);
  const { routineName, setRoutineName } = useContext(UserContext);
  const { routine, setRoutine } = useContext(UserContext);
  const { allRoutines, setAllRoutines } = useContext(UserContext);
  const { objectExercise, setObjectExercise } = useContext(UserContext);

  const [day, setDay] = useState(false);
  const [greenButtonClicked, setGreenButtonClicked] = useLocalStorage(
    "greenButtonClicked",
    false
  );

  const [banner, setBanner] = useState(false);
  const [nextClick, setNextClick] = useState("");
  const [open, setOpen] = useState(true);
  const [nameSaved, setNameSaved] = useState(false);
  const [dayContainsExercises, setDayContainsExercises] = useState(false);
  const [exerciseSaved, setExerciseSaved] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleClickDayButton = (event) => {
    let varDay = event.currentTarget.id;
    let containsExercises = false;
    if (day === event.currentTarget.id) {
      setDay(false);
    } else {
      setDay(event.currentTarget.id);
    }

    for (let movement in list) {
      for (let i = 0; i < list[movement].length; i++) {
        if (list[movement][i].day === varDay) {
          setDayContainsExercises(true);
          containsExercises = true;
          break;
        }
      }
      if (!containsExercises) {
        setDayContainsExercises(false);
        console.log(dayContainsExercises);
      }
    }
  };

  const handleClickGreenButton = (event) => {
    if (greenButtonClicked !== event.currentTarget.id) {
      setGreenButtonClicked(event.currentTarget.id);
    }

    for (let movement in list) {
      for (let i = 0; i < list[movement].length; i++) {
        if (list[movement][i].title === event.currentTarget.id) {
          setObjectExercise({
            exercise: event.currentTarget.id,
            sets: valueSets,
            reps: valueReps,
            day: list[movement][i].day,
          });
          setExerciseSaved(false);
        }
      }
    }
  };

  const handleSaveClick = () => {
    let exerciseAlreadySaved = false;
    const newRoutine = [...routine];

    if (newRoutine.length === 0) {
      newRoutine.push(objectExercise);
      setRoutine(newRoutine);
      exerciseAlreadySaved = true;
    } else {
      for (let i = 0; i < newRoutine.length; i++) {
        if (newRoutine[i].exercise === objectExercise.exercise) {
          exerciseAlreadySaved = true;
          newRoutine[i].sets = valueSets;
          newRoutine[i].reps = valueReps;
          setRoutine(newRoutine);
          break;
        } else {
          exerciseAlreadySaved = false;
        }
      }
    }
    if (!exerciseAlreadySaved) {
      newRoutine.push(objectExercise);
      setRoutine(newRoutine);
    }

    setExerciseSaved(true);
  };

  const handleNextClick = () => {
    setNextClick(true);
    const newList2 = [];
    for (let movement in list) {
      for (let i = 0; i < list[movement].length; i++) {
        if (list[movement][i].isClicked) {
          newList2.push(list[movement][i]);
        }
      }
      console.log(routine.length, newList2.length);
      if (routine.length === newList2.length) {
        setBanner(true);
      } else {
        setBanner(false);
        setOpen(true);
      }
    }
  };

  const closeBanner = () => {
    setBanner(false);
    setNextClick(false);
  };

  const handleInputChange = (event) => {
    setRoutineName(event.target.value);
  };

  const saveNameBanner = () => {
    if (routineName.length === 0) {
      return;
    } else {
      const newRoutine = [...routine];
      newRoutine.unshift(routineName);
      setRoutine(newRoutine);
      setNameSaved(true);
      closeBanner();
    }
  };

  const finishCreatingRoutine = () => {
    const allRoutinesNew = [...allRoutines];
    allRoutinesNew.push(routine);
    setAllRoutines(allRoutinesNew);
    setRoutine([]);
    setRoutineName("");
    const newList = { ...list };
    for (let movement in newList) {
      for (let i = 0; i < newList[movement].length; i++) {
        if (newList[movement][i].isClicked) {
          newList[movement][i].isClicked = false;
        }
        if (newList[movement][i].day) {
          newList[movement][i].day = false;
        }
      }
    }
    setList(newList);
    navigate("/myRoutines");
  };

  const goBackFinish = () => {
    const newRoutine = [...routine];
    newRoutine.shift(routineName);
    setRoutine(newRoutine);
    setRoutineName(false);
    setNameSaved(false);
    closeBanner();
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
            alignItems: "center",
            width: "auto",
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
                  marginTop: "5em",
                }}
              >
                <Skeleton
                  variant="text"
                  width="20em"
                  height="5em"
                  animation="wave"
                />
                <div style={{ marginTop: "2em" }}>
                  <Skeleton
                    variant="rectangular"
                    width="70vw"
                    height="5em"
                    animation="wave"
                  />
                </div>
                <div style={{ marginTop: "3em" }}>
                  <Skeleton
                    variant="rectangular"
                    width="95vw"
                    height="5em"
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
              <div style={{ marginTop: "5em" }}>
                <H2>SETS AND REPS</H2>
              </div>

              <Box className="containerButtonsDays"
              >
                <div className="columnDay">
                  <Button
                    variant="buttonDay"
                    id={"monday"}
                    onClick={handleClickDayButton}
                  >
                    Monday
                  </Button>
                </div>

                <div className="columnDay">
                  <Button
                    variant="buttonDay"
                    id={"tuesday"}
                    onClick={handleClickDayButton}
                  >
                    Tuesday
                  </Button>
                </div>

                <div className="columnDay">
                  <Button
                    variant="buttonDay"
                    id={"wednesday"}
                    onClick={handleClickDayButton}
                  >
                    Wednesday
                  </Button>
                </div>

                <div className="columnDay">
                  <Button
                    variant="buttonDay"
                    id={"thursday"}
                    onClick={handleClickDayButton}
                  >
                    Thursday
                  </Button>
                </div>

                <div className="columnDay">
                  <Button
                    variant="buttonDay"
                    id={"friday"}
                    onClick={handleClickDayButton}
                  >
                    Friday
                  </Button>
                </div>

                <div className="columnDay">
                  <Button
                    variant="buttonDay"
                    id={"saturday"}
                    onClick={handleClickDayButton}
                  >
                    Saturday
                  </Button>
                </div>

                <div className="columnDay" style={{ borderRight: "none" }}>
                  <Button
                    variant="buttonDay"
                    id={"sunday"}
                    onClick={handleClickDayButton}
                  >
                    Sunday
                  </Button>
                </div>
              </Box>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "2em",
                }}
              >
                <div className="containerButtonsAndSet">
                  {!day && (
                    <div>
                      <H2>
                        YOU HAVE NOT SELECTED ANY DAY
                      </H2>
                    </div>
                  )}

                  {day && !dayContainsExercises && (
                    <div>
                      <H2>
                        THIS DAY DOES NOT CONTAIN EXERCISES
                      </H2>
                    </div>
                  )}

                  {day && dayContainsExercises && (
                    <div className="columnListExercisesPushedLeft">
                      {Object.keys(list).map((movement) => (
                        <React.Fragment key={movement + "Fragment"}>
                          {list[movement].map(
                            (exercise, index) =>
                              exercise.day === day && (
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
                                  onClick={handleClickGreenButton}
                                >
                                  {exercise.title}
                                </Button>
                              )
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}

                  {day && !greenButtonClicked && dayContainsExercises && (
                    <div className="divRightContainerOfPhase3">
                      <Typography variant="h2">
                        YOU HAVE NOT SELECTED ANY EXERCISE
                      </Typography>
                    </div>
                  )}

                  {day &&
                    dayContainsExercises &&
                    greenButtonClicked &&
                    !exerciseSaved && (
                      <div className="divRightContainerOfPhase3">
                        <div className="greyContainerOfSet">
                          <div className="greenBlock">
                            <H2White>
                              {greenButtonClicked}
                            </H2White>

                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifContent: "center",
                                marginTop: "1em",
                              }}
                            >
                              <SliderSets />
                              <SliderReps />
                            </div>
                          </div>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "auto",
                            }}
                          >
                            <BigButton
                              variant="contained"
                              variant1="smallButton"
                              autofocus
                              onClickFunction={handleSaveClick}
                            >
                              Save
                            </BigButton>
                          </Box>
                        </div>
                      </div>
                    )}

                  {day &&
                    dayContainsExercises &&
                    greenButtonClicked &&
                    exerciseSaved && (
                      <div className="divRightContainerOfPhase3">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignitems: "center",
                            marginBottom: "2em",
                            backgroundColor: "grey",
                            borderRadius: "15px",
                            padding: "3em 3em 3em 3em",
                            width: "80%",
                            alignItems: "center",
                          }}
                        >
                          <CheckCircleIcon
                            sx={{ fontSize: "10em", color: "white" }}
                          />
                        </div>
                      </div>
                    )}
                </div>
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
                  <BigButton
                    onClickFunction={() => navigate(-1)}
                  >
                    Go Back
                  </BigButton>

                  <BigButton
                    onClickFunction={handleNextClick}
                  >
                    Next
                  </BigButton>
                </Box>
              </div>
            </>
          )}

          {nextClick && !banner && (
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
                  You must set sets and reps for each exercise
                </Alert>
              </Collapse>
            </Box>
          )}

          {banner && (
            <div
              style={{
                position: "fixed",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, .6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  backgroundColor: "#efebe9",
                  borderRadius: "15px",
                  padding: "2em 1em 2em 1em",
                  marginBottom: "4em",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifContent: "center",
                  animationName: "bigger",
                  animationDuration: "0.5s",
                }}
              >
                <IconButton
                  aria-label="delete"
                  sx={{ position: "absolute", top: "5px", right: "5px" }}
                  onClick={closeBanner}
                >
                  <CloseIcon sx={{ color: "error" }} />
                </IconButton>

                <H2>NAME YOUR ROUTINE</H2>

                <TextField
                  required
                  id="outlined-basic"
                  label="MyRoutine"
                  variant="outlined"
                  onChange={handleInputChange}
                  error={!routineName}
                  helperText={
                    !routineName
                      ? "You must choose a name for your routine"
                      : "Perfect!"
                  }
                  sx={{ marginTop: "3em",
                  [theme.breakpoints.up('xs')]: {
                    width: "300px",
                  },
                  [theme.breakpoints.up('sm')]: {
                    width: "400px",
                  },
                  [theme.breakpoints.up('md')]: {
                    width: "500px",
                  } }}
                />

                <Box
                  sx={{
                      padding: "1em",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      [theme.breakpoints.up('xs')]: {
                        width: "20em",
                      },
                      [theme.breakpoints.up('sm')]: {
                        width: "35em",
                      },
                      [theme.breakpoints.up('md')]: {
                        width: "45em",
                      }
                  }}
                >
                  <BigButton
                    onClickFunction={closeBanner}
                  >
                    Go Back
                  </BigButton>
                  <BigButton
                    onClickFunction={saveNameBanner}
                  >
                    Save
                  </BigButton>
                </Box>
              </div>
            </div>
          )}

          {nameSaved && (
            <div
              style={{
                position: "fixed",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, .6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: '90%',
                  position: "relative",
                  backgroundColor: "#efebe9",
                  borderRadius: "15px",
                  padding: "2em 2em 2em 2em",
                  marginBottom: "4em",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  animationName: "bigger",
                  animationDuration: "0.5s",
                }}
              >
                <H2>
                  ARE YOU SURE YOU ARE DONE CREATING YOUR ROUTINE?
                </H2>

                <Box
                  sx={{
                    padding: "1em",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    [theme.breakpoints.up('xs')]: {
                      width: "21em",
                    },
                    [theme.breakpoints.up('sm')]: {
                      width: "35em",
                    },
                    [theme.breakpoints.up('md')]: {
                      width: "45em",
                    }
                }}
                >
                  <BigButton
                    onClickFunction={goBackFinish}
                  >
                    Go Back
                  </BigButton>
                  <BigButton
                    onClickFunction={finishCreatingRoutine}
                  >
                    Finish
                  </BigButton>
                </Box>
              </div>
            </div>
          )}
        </Box>
      </Container>
      <Footer />
    </>
  );
}

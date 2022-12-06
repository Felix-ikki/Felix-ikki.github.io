import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CalendarWithExercises from "../components/CalendarWithExercises";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Container from "@mui/material/Container";
import { useContext, useState, createContext, useEffect } from "react";
import { UserContext } from "../App";
import { useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Input } from "@mui/material";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { Skeleton } from "@mui/material";
import BigButton from '..//components/BigButton'  
import H2 from '..//components/H2'
import { useTheme } from "@emotion/react";
import H2White from '../components/H2White'

export const RoutineContext = createContext();

const Routine = () => {

  const theme = useTheme()

  const { allRoutines, setAllRoutines } = useContext(UserContext);
  const { editMode, setEditMode } = useContext(UserContext);

  const location = useLocation();

  const [exerciseBannerOpen, setExerciseBannerOpen] = useState(false);
  const [exerciseClicked, setExerciseClicked] = useState(false);
  const [exerciseIndex, setExerciseIndex] = useState(false);
  const [valueInputSets, setValueInputSets] = useState(0);
  const [valueInputReps, setValueInputReps] = useState(0);
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const editionMode = () => {
    setEditMode(false);
  };

  const handleCloseGreenButton = () => {
    setExerciseClicked(false);
    setExerciseBannerOpen(false);
  };

  const handleValueInputSets = (event) => {
    setValueInputSets(event.target.value);
    console.log(valueInputSets);
  };

  const handleValueInputReps = (event) => {
    setValueInputReps(event.target.value);
    console.log(valueInputReps);
  }

  const changeRepsAndSets = () => {

    if (valueInputSets <= 0 || valueInputReps <= 0) {
      setOpen(true);
    } 
    else {
      setOpen(false);
      let allNewRoutines = [...allRoutines];
      allNewRoutines[location.state.index][exerciseIndex].sets = valueInputSets;
      allNewRoutines[location.state.index][exerciseIndex].reps = valueInputReps;
      setAllRoutines(allNewRoutines);
      handleCloseGreenButton();
    }
  };

  return (
    <>
      <RoutineContext.Provider
        value={{
          setAllRoutines,
          exerciseBannerOpen,
          setExerciseBannerOpen,
          setExerciseClicked,
          setExerciseIndex,
        }}
      >
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
              marginBottom: '2em'
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
                      width="95vw"
                      height="20em"
                      animation="wave"
                    />
                  </div>
                  <div style={{ marginTop: "1em", marginLeft: "auto" }}>
                    <Skeleton
                      variant="circular"
                      width="4em"
                      height="4em"
                      animation="wave"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={{ marginTop: "5em" }}>
                  <H2>
                    {location.state.exerciseTitle}
                  </H2>
                </div>

                <Box
                  sx={{
                    [theme.breakpoints.down('lg')]: {
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "start",
                    },
                    [theme.breakpoints.up('lg')]: {
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    },
                    width: "100%",
                    backgroundColor: "#bdb9b7",
                    borderRadius: "15px",
                    padding: "1.5em 1em 1.5em 1em",
                    marginBottom: "1em",
                    marginTop: "3em",
                  }}
                >
                  <CalendarWithExercises
                    dayString={"monday"}
                    indexOfRoutine={location.state.index}
                  />
                  <CalendarWithExercises
                    dayString={"tuesday"}
                    indexOfRoutine={location.state.index}
                  />
                  <CalendarWithExercises
                    dayString={"wednesday"}
                    indexOfRoutine={location.state.index}
                  />
                  <CalendarWithExercises
                    dayString={"thursday"}
                    indexOfRoutine={location.state.index}
                  />
                  <CalendarWithExercises
                    dayString={"friday"}
                    indexOfRoutine={location.state.index}
                  />
                  <CalendarWithExercises
                    dayString={"saturday"}
                    indexOfRoutine={location.state.index}
                  />
                  <CalendarWithExercises
                    dayString={"sunday"}
                    indexOfRoutine={location.state.index}
                  />
                </Box>

                {!editMode && (
                  <Button
                    variant="buttonEdit"
                    sx={{ marginLeft: "auto" }}
                    onClick={() => setEditMode(true)}
                  >
                    <EditIcon
                      color="secondary"
                      sx={{
                        height: "2em",
                        "&:hover": {
                          color: "#000a12",
                        },
                      }}
                    />
                  </Button>
                )}

                {editMode && (
                  <Button
                    variant="contained"
                    variant1="normalButton"
                    sx={{ marginLeft: "auto", marginRight: "0em" }}
                    onClick={editionMode}
                  >
                    Finish Editing
                  </Button>
                )}
              </>
            )}

            {exerciseClicked && exerciseBannerOpen && !editMode && (
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
                <div className="greenBlock">
                  <IconButton
                    aria-label="delete"
                    sx={{ position: "absolute", top: "5px", right: "5px" }}
                    onClick={handleCloseGreenButton}
                  >
                    <CloseIcon sx={{ color: "#fff" }} />
                  </IconButton>

                  <H2White>{exerciseClicked}</H2White>

                  <Box
                    sx={{
                      padding: "1em",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      marginTop: "2em",
                    }}
                  >
                    <div style={{ marginRight: "auto" }}>
                      <H2White>
                        SETS:{" "}
                        {allRoutines[location.state.index][exerciseIndex].sets}
                      </H2White>
                    </div>

                    <div style={{ marginLeft: "auto" }}>
                      <H2White>
                        REPS:{" "}
                        {allRoutines[location.state.index][exerciseIndex].reps}
                      </H2White>
                    </div>
                  </Box>
                </div>
              </div>
            )}

            {exerciseClicked && exerciseBannerOpen && editMode && (
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
                <div className="greenBlock">
                  <IconButton
                    aria-label="delete"
                    sx={{ position: "absolute", top: "5px", right: "5px" }}
                    onClick={handleCloseGreenButton}
                  >
                    <CloseIcon sx={{ color: "#fff" }} />
                  </IconButton>

                  <H2White
                  >
                    {exerciseClicked}
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
                    <Box
                      sx={{
                        padding: "1em",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        marginTop: "2em",
                      }}
                    >
                      <div style={{ marginRight: "auto", display: "flex" }}>
                        <H2White>
                          SETS:
                        </H2White>
                        <Input
                          size="small"
                          value={valueInputSets}
                          sx={{
                            marginLeft: "1em",
                            color: "#fff",
                            [theme.breakpoints.up('xs')]: {
                              fontSize: '1.3em'
                            },
                            [theme.breakpoints.up('sm')]: {
                              fontSize: '2em'
                            },
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onChange={handleValueInputSets}
                          inputProps={{
                            step: 1,
                            min: 0,
                            max: 100,
                            type: "number",
                            "aria-labelledby": "input-slider",
                          }}
                        />
                      </div>

                      <div style={{ marginLeft: "auto", display: "flex" }}>
                        <H2White>
                          REPS:
                        </H2White>
                        <Input
                          size="small"
                          value={valueInputReps}
                          sx={{
                            marginLeft: "1em",
                            color: "#fff",
                            [theme.breakpoints.up('xs')]: {
                              fontSize: '1.3em'
                            },
                            [theme.breakpoints.up('sm')]: {
                              fontSize: '2em'
                            }, 
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onChange={handleValueInputReps}
                          inputProps={{
                            step: 1,
                            min: 0,
                            max: 100,
                            type: "number",
                            "aria-labelledby": "input-slider",
                          }}
                        />
                      </div>
                    </Box>
                  </div>
                  <div style={{ marginTop: "1em" }}>
                    <BigButton
                      variant="contained"
                      variant1="normalButton"
                      onClickFunction={changeRepsAndSets}
                    >
                      SAVE
                    </BigButton>
                  </div>
                </div>
              </div>
            )}

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
                  Reps and Sets have to be more than 0
                </Alert>
              </Collapse>
            </Box>
          </Box>
        </Container>
        <Footer />
      </RoutineContext.Provider>
    </>
  );
};

export default Routine;

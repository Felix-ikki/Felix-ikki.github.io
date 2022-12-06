import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Button, Skeleton } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@emotion/react";
import BigButton from "../components/BigButton";
import H2 from '..//components/H2'
import H2White from '..//components/H2White'



export const MyRoutines = () => {

  const theme = useTheme()

  const { allRoutines, setAllRoutines } = useContext(UserContext);
  const { editMode, setEditMode } = useContext(UserContext);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("selectedExercises");
    localStorage.removeItem("day");
    localStorage.removeItem("exercisesLeft");
    localStorage.removeItem("greenButtonClicked");
    localStorage.removeItem("objectExercise");
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const eliminateRoutine = (index) => {
    const copyAllRoutines = [...allRoutines];

    for (let i = 0; i < copyAllRoutines.length; i++) {
      if (copyAllRoutines[i][0] === copyAllRoutines[index][0]) {
        copyAllRoutines.splice(i, 1);
        setAllRoutines(copyAllRoutines);
      }
    }
  };

  const handleEditButton = (index, routine) => {
    setEditMode(true);
    navigate("/Routine", { state: { index, exerciseTitle: routine[0] } });
  };

  return (
    <>
      <Navbar />
      <Container
        maxWidth="1600"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
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
                  height: "22em",
                }}
              >
                <Skeleton
                  variant="text"
                  width='12em'
                  height="7em"
                  animation="wave"
                />
                <Skeleton
                  variant="rectangular"
                  color="white"
                  sx={{
                    [theme.breakpoints.up('md')]: {
                      width:"50em"
                    },
                    [theme.breakpoints.up('sm')]: {
                      width: "30em"
                    },
                    [theme.breakpoints.up('xs')]: {
                      width: "20em"
                    },
                  }}
                  height="20em"
                  animation="wave"
                />
              </div>
            </>
          ) : (
            <>
              <H2>MY ROUTINES</H2>

              {allRoutines.length === 0 && (
                <>
                  <Box
                    className="containerMyRoutines"
                  >
                    <H2>
                      You don't have a routine
                    </H2>
                    <BigButton
                      page={"/#/Phase1Create"}
                    >
                      Create routine
                    </BigButton>
                  </Box>
                </>
              )}

              {allRoutines.length > 0 && (
                <>
                  <Box className="containerMyRoutines">
                    {allRoutines.map((routine, index) => (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          marginBottom: "1em",
                          marginTop: "1em",
                          alignItems: "center",
                        }}
                        key={index}
                      >
                        <Button
                          variant="containerRoutineName"
                          sx={{
                            [theme.breakpoints.up('xs')]: {
                              padding: "0.3em 2em 0.3em 2em",
                            },
                          [theme.breakpoints.up('sm')]: {
                            padding: "1em 2em 1em 2em",
                          },
                          }}
                          onClick={() =>
                            navigate("/Routine", {
                              state: { index, exerciseTitle: routine[0] },
                            })
                          }
                        >
                          <H2White>
                            {routine[0]}
                          </H2White>
                        </Button>
                        <div style={{ marginLeft: '2em', display: 'flex' }}>
                          <Button
                            variant="buttonEdit"
                            sx={{
                              [theme.breakpoints.up('xs')]: {
                                minWidth: '0',
                                height: "3em",
                                width: '3em',
                                borderRadius: '50%',
                              },
                            [theme.breakpoints.up('sm')]: {
                              height: "4.5em",
                              width: '4.5em',
                            },
                          }}
                            onClick={() => handleEditButton(index, routine)}
                          >
                            <EditIcon
                              color="secondary"
                              sx={{
                                [theme.breakpoints.up('xs')]: {
                                  height: "20px",
                                },
                              [theme.breakpoints.up('sm')]: {
                                height: "24px",
                              },
                                "&:hover": {
                                  color: "#000a12",
                                },
                              }}
                            />
                          </Button>
                          <Button
                            variant="buttonDelete"
                            sx={{
                              [theme.breakpoints.up('xs')]: {
                                minWidth: '0',
                                height: "3em",
                                width: '3em',
                                borderRadius: '50%',
                              },
                            [theme.breakpoints.up('sm')]: {
                              height: "4.5em",
                              width: '4.5em',
                            },
                          }}
                            onClick={() => eliminateRoutine(index)}
                          >
                            <DeleteIcon
                              color="secondary"
                              sx={{
                                [theme.breakpoints.up('xs')]: {
                                  height: "20px",
                                },
                              [theme.breakpoints.up('sm')]: {
                                height: "24px",
                              },
                                "&:hover": {
                                  color: "#000a12",
                                },
                              }}
                            />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="buttonAdd"
                      sx={{
                        [theme.breakpoints.up('xs')]: {
                          minWidth: '0',
                          height: "3em",
                          width: '3em',
                          borderRadius: '50%',
                        },
                      [theme.breakpoints.up('sm')]: {
                        height: "4.5em",
                        width: '4.5em',
                      },
                    }}
                      onClick={() => navigate("/Phase1Create")}
                    >
                      <AddIcon
                        color="secondary"
                        sx={{
                          width: "2em",
                            [theme.breakpoints.up('xs')]: {
                              height: "1.5em",
                            },
                          [theme.breakpoints.up('sm')]: {
                            height: "2.5em",
                          },
                          "&:hover": {
                            color: "#000a12",
                          },
                        }}
                      />
                    </Button>
                  </Box>
                </>
              )}
            </>
          )}
        </Box>
      </Container>
      <Footer />
    </>
  );
};

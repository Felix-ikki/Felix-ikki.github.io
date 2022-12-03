import React from "react";
import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Home from "./pages/Home";
import CssBaseline from "@mui/material/CssBaseline";
import Error404 from "./pages/Error404";
import Phase1Create from "./pages/Phase1Create";
import Phase2Create from "./pages/Phase2Create";
import Phase3Create from "./pages/Phase3Create";
import { MyRoutines } from "./pages/MyRoutines";
import Routine from "./pages/Routine";
import { useLocalStorage } from "./customHooks/useLocalStorage";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./components/Auth";
import RequireAuth from "./components/RequireAuth";


const theme = createTheme({
  breakpoints: {
    values: {
      xs: 375,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      light: "#4f5b62",
      main: "#263238",
      dark: "#000a12",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffffff",
      main: "#efebe9",
      dark: "#bdb9b7",
      contrastText: "#000",
    },
  },
  typography: {
    h1: {
      fontFamily: "Shadows Into Light, cursive",
      fontSize: "5em",
      fontWeight: "600",
      color: "primary.dark",
      cursor: "default",
    },
    h2: {
      fontFamily: "Shadows Into Light, cursive",
      fontSize: "3em",
      fontWeight: "400",
      color: "primary.dark",
      cursor: "default",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "contained", variant1: "normalButton" },
          style: {
            backgroundColor: "primary.main",
            fontFamily: "Shadows Into Light, cursive",
            fontSize: "3em",
            fontWeight: "500",
            width: "7em",
            borderRadius: "20px",
          },
        },
        {
          props: { variant: "contained", variant1: "smallButton" },
          style: {
            backgroundColor: "primary.main",
            fontFamily: "Shadows Into Light, cursive",
            fontSize: "2em",
            fontWeight: "500",
            width: "7em",
            borderRadius: "20px",
            "&:hover": {
              backgroundColor: "rgb(15, 175, 15)",
            },
          },
        },
        {
          props: { variant: "individualExercise" },
          style: {
            fontFamily: "Lato, sans-serif",
            fontSize: "0.8em",
            borderRadius: "15px",
            padding: "1em",
            width: "10em",
            boxShadow: "10px 5px 10px rgba(0, 0, 0, 0.3)",
            marginTop: "1em",
            marginRight: "0.5em",
            marginLeft: "0.5em",
            transition: "0.3s",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#bdb9b7",
            },
          },
        },
        {
          props: { variant: "buttonDayAdd" },
          style: {
            marginTop: "1em",
            width: "3px",
            borderRadius: "10px",
            marginRight: "auto",
            marginLeft: "auto",
            backgroundColor: "#4f5b62",
            "&:hover": {
              backgroundColor: "rgb(15, 175, 15)",
            },
          },
        },
        {
          props: { variant: "buttonDay" },
          style: {
            color: "#fff",
            borderRadius: "10px",
            marginRight: "auto",
            marginLeft: "auto",
            backgroundColor: "#4f5b62",
            padding: "1em 2em 1em 2em",
            "&:hover": {
              backgroundColor: "rgb(15, 175, 15)",
            },
          },
        },
        {
          props: { variant: "buttonEdit" },
          style: {
            backgroundColor: "rgb(15, 175, 15)",
            borderRadius: "50%",
            animationName: "bigger",
            animationDuration: "0.5s",
            "&:hover": {
              backgroundColor: "#ffffff",
            },
          },
        },
        {
          props: { variant: "buttonDelete" },
          style: {
            marginLeft: "1em",
            backgroundColor: "red",
            borderRadius: "50%",
            animationName: "bigger",
            animationDuration: "0.5s",
            "&:hover": {
              backgroundColor: "#ffffff",
            },
          },
        },
        {
          props: { variant: "buttonAdd" },
          style: {
            position: "absolute",
            right: "0",
            bottom: "0",
            marginRight: "2em",
            marginBottom: "2em",
            backgroundColor: "grey",
            borderRadius: "50%",
            animationName: "bigger",
            animationDuration: "0.5s",
            "&:hover": {
              backgroundColor: "rgb(15, 175, 15)",
            },
          },
        },
        {
          props: { variant: "containerRoutineName" },
          style: {
            backgroundColor: "grey",
            borderRadius: "50px",
            minWidth: "15em",
            animationName: "bigger",
            animationDuration: "0.5s",
            "&:hover": {
              backgroundColor: "rgb(15, 175, 15)",
            },
          },
        },
      ],
    },
  },
});

const exercises = {
  Push: [
    { title: "Dumbell Press", isClicked: false, day: false },
    { title: "Inclined Dumbell Press", isClicked: false, day: false },
    { title: "Declined Dumbell Press", isClicked: false, day: false },
    { title: "Bench Press", isClicked: false, day: false },
    { title: "Inclined Bench Press", isClicked: false, day: false },
    { title: "Declined Bench press", isClicked: false, day: false },
    { title: "Dumbell flies", isClicked: false, day: false },
    { title: "Inclined Dumbell Flies", isClicked: false, day: false },
    { title: "Declined Dumbell Flies", isClicked: false, day: false },
    { title: "Cable flies", isClicked: false, day: false },
    { title: "Dumbell Military Press", isClicked: false, day: false },
    { title: "Barbell Military Press", isClicked: false, day: false },
    { title: "Dumbell front rise", isClicked: false, day: false },
    { title: "Lateral Flies", isClicked: false, day: false },
    { title: "Rope Triceps Pushdown", isClicked: false, day: false },
    { title: "Barbell Triceps Pushdown", isClicked: false, day: false },
    { title: "Cable Overhead Triceps Extensions", isClicked: false, day: false },
    { title: "Overhead Triceps Extensions", isClicked: false, day: false },
    { title: "Triceps Kickbacks", isClicked: false, day: false },
    { title: "Dips", isClicked: false, day: false },
    { title: "Skullcrushers", isClicked: false, day: false },
  ],
  Pull: [
    { title: "Dumbell Posterior Fly ", isClicked: false, day: false },
    { title: "Cable row", isClicked: false, day: false },
    { title: "Machine Row", isClicked: false, day: false },
    { title: "Incline Machine Row", isClicked: false, day: false },
    { title: "Dumbell Row", isClicked: false, day: false },
    { title: "Inclined Dumbell Row", isClicked: false, day: false },
    { title: "Barbell Row", isClicked: false, day: false },
    { title: "Lat Pulldown", isClicked: false, day: false },
    { title: "Pull Ups", isClicked: false, day: false },
    { title: "Dumbell Biceps Curl", isClicked: false, day: false },
    { title: "Barbell Biceps Curl", isClicked: false, day: false },
    { title: "Scott Dumbell Biceps Curl", isClicked: false, day: false },
    { title: "W Barbell Biceps Curl", isClicked: false, day: false },
    { title: "Hammer Bicep Curl", isClicked: false, day: false },
  ],
  Legs: [
    { title: "Squats", isClicked: false, day: false },
    { title: "Quad Extension", isClicked: false, day: false },
    { title: "Leg Press Machine", isClicked: false, day: false },
    { title: "Hack Squat", isClicked: false, day: false },
    { title: "Bulgarian split squat", isClicked: false, day: false },
    { title: "Hip Thrust", isClicked: false, day: false },
    { title: "Deadlift", isClicked: false, day: false },
    { title: "Sumo Deadlift", isClicked: false, day: false },
    { title: "Romanian Deadlift", isClicked: false, day: false },
    { title: "Hamstrings curl machine", isClicked: false, day: false },
  ],
};

export const UserContext = createContext();

function App() {

  const [list, setList] = useState(exercises);
  const [valueReps, setValueReps] = useState(0);
  const [valueSets, setValueSets] = useState(0);
  const [routineName, setRoutineName] = useState("");
  const [routine, setRoutine] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [inputPasswordLogin, setInputPasswordLogin] = useState("");
  const [inputUserNameLogin, setInputUserNameLogin] = useState("");

  const [allRoutines, setAllRoutines] = useLocalStorage("allRoutines", []);
  const [objectExercise, setObjectExercise] = useLocalStorage(
    "objectExercise",
    null
  );
  const [userName, setUserName] = useLocalStorage("userName", "");
  const [password, setPassword] = useLocalStorage("password", "");

  useEffect(() => {
    document.body.style.backgroundColor = "#efebe9";
  });

  return (
    <AuthProvider>
      <UserContext.Provider
        value={{
          exercises,
          list,
          setList,
          valueReps,
          setValueReps,
          valueSets,
          setValueSets,
          routineName,
          setRoutineName,
          routine,
          setRoutine,
          allRoutines,
          setAllRoutines,
          objectExercise,
          setObjectExercise,
          editMode,
          setEditMode,
          userName,
          setUserName,
          password,
          setPassword,
          inputPasswordLogin,
          setInputPasswordLogin,
          inputUserNameLogin,
          setInputUserNameLogin,
        }}
      >
        <ThemeProvider theme={theme}>
        <CssBaseline />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/LogIn" element={<LogIn />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route
                path="/Phase1Create"
                element={
                  <RequireAuth>
                    <Phase1Create />
                  </RequireAuth>
                }
              />
              <Route
                path="/Phase2Create"
                element={
                  <RequireAuth>
                    <Phase2Create />
                  </RequireAuth>
                }
              />
              <Route
                path="/Phase3Create"
                element={
                  <RequireAuth>
                    <Phase3Create />
                  </RequireAuth>
                }
              />
              <Route
                path="/MyRoutines"
                element={
                  <RequireAuth>
                    <MyRoutines />
                  </RequireAuth>
                }
              />
              <Route
                path="/Routine"
                element={
                  <RequireAuth>
                    <Routine />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </UserContext.Provider>
    </AuthProvider>
  );
}

export default App;

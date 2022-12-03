import React from "react";
import { useContext } from "react";
import { UserContext } from "../App";
import { Button } from "@mui/material";
import { RoutineContext } from "../pages/Routine";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const CalendarWithExercises = (props) => {
  const { dayString, indexOfRoutine } = props;

  const { allRoutines, editMode } = useContext(UserContext);

  const {
    setExerciseBannerOpen,
    setExerciseClicked,
    setExerciseIndex,
    setAllRoutines,
  } = useContext(RoutineContext);

  const handleClickExerciseButton = (event, indexOfExercise) => {
    setExerciseIndex(indexOfExercise);
    setExerciseClicked(event.target.id);
    setExerciseBannerOpen(true);
  };

  const deleteExercise = (exercise) => {
    const copyAllRoutines = [...allRoutines];

    for (let routine of copyAllRoutines) {
      for (let i = 0; i < routine.length; i++) {
        if (routine[i].exercise === exercise.exercise) {
          console.log(routine);

          routine.splice(i, 1);
          setAllRoutines(copyAllRoutines);
        }
      }
    }
  };

  return (
    <div className="calendarColumn">
      <div className="calendarDay">{dayString}</div>
      <div className="calendarDayExerciseContainer">
        {allRoutines.map(
          (routine, index) =>
            routine[0] === allRoutines[indexOfRoutine][0] && (
              <React.Fragment key={index}>
                {routine.map(
                  (exercise, indexOfExercise) =>
                    exercise.day === dayString && (
                      <div
                        key={"Button" + exercise.exercise + "container"}
                        style={{ position: "relative" }}
                      >
                        <Button
                          className={editMode && "buttonShake"}
                          variant="individualExercise"
                          key={indexOfExercise}
                          id={exercise.exercise}
                          sx={{
                            position: "relative",
                            backgroundColor: "rgb(15, 175, 15)",
                            color: "#fff",
                          }}
                          onClick={(event) =>
                            handleClickExerciseButton(event, indexOfExercise)
                          }
                        >
                          {exercise.exercise}
                        </Button>
                        {editMode && (
                          <div key={exercise.exercise + "container"}>
                            <IconButton
                              className={editMode && "buttonShake"}
                              aria-label="delete"
                              sx={{
                                index: 1,
                                height: "1em",
                                width: "1em",
                                backgroundColor: "rgb(255, 255, 255, .6)",
                                position: "absolute",
                                top: "0.1em",
                                right: "-0.2em",
                              }}
                              onClick={() => deleteExercise(exercise)}
                            >
                              <CloseIcon
                                sx={{ color: "black", width: "0.8em" }}
                              />
                            </IconButton>
                          </div>
                        )}
                      </div>
                    )
                )}
              </React.Fragment>
            )
        )}
      </div>
    </div>
  );
};

export default CalendarWithExercises;

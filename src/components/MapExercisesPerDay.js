import React from "react";
import { useContext } from "react";
import { UserContext } from "../App";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "../App.css";

const MapExercisesPerDay = (props) => {
  const { dayString, day, setDay, setExercisesLeft } = props;

  console.log(dayString);

  const { list, setList } = useContext(UserContext);

  const handleClickDayButton = (event) => {
    if (day === event.currentTarget.id) {
      setDay(false);
    } else {
      setDay(event.currentTarget.id);
    }
  };

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

  return (
    <div className="calendarColumn">
      <div className="calendarDay">{dayString}</div>
      <div className="containerDayExerciseButtonContainer">
      <div className="calendarDayExerciseContainer">
        {Object.keys(list).map((movement) => (
          <React.Fragment key={movement + "Fragment"}>
            {list[movement].map(
              (exercise, index) =>
                exercise.isClicked &&
                exercise.day === dayString && (
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
                    onClick={() => hadleClickGreenButton(movement, index)}
                  >
                    {exercise.title}
                  </Button>
                )
            )}
          </React.Fragment>
        ))}
              </div>

        <Button
          variant="buttonDayAdd"
          id={dayString}
          onClick={handleClickDayButton}
        >
          <AddIcon sx={{ color: "white" }} />
        </Button>
        </div>
    </div>
  );
};

export default MapExercisesPerDay;

import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import { useContext } from "react";
import { UserContext } from "../App";

const Input = styled(MuiInput)`
  width: 42px;
  color: white;
`;

export default function InputSlider() {
  const { objectExercise, setObjectExercise } = useContext(UserContext);
  const { valueSets, setValueSets } = useContext(UserContext);

  const handleSliderChange = (event, newValue) => {
    setValueSets(newValue);
    let newObj = { ...objectExercise };
    newObj.sets = valueSets;
    setObjectExercise(newObj);
  };

  const handleInputChange = (event) => {
    setValueSets(event.target.value === "" ? "" : Number(event.target.value));
    let newObj = { ...objectExercise };
    newObj.sets = valueSets;
    setObjectExercise(newObj);
  };

  const handleBlur = () => {
    if (valueSets < 0) {
      setValueSets(0);
    } else if (valueSets > 100) {
      setValueSets(100);
    }
  };

  return (
    <Box sx={{ width: 200 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography id="input-slider" gutterBottom sx={{ color: "white" }}>
            Sets
          </Typography>
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof valueSets === "number" ? valueSets : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            sx={{ color: "white" }}
          />
        </Grid>
        <Grid item>
          <Input
            value={valueSets}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

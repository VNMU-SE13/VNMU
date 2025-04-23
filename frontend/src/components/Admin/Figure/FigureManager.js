import React from "react";

import { useForm } from "../hooks/useForm";
import { Grid } from "@mui/material";
import FigureForm from "./FigureForm";

const getFigureModel = () => ({
  id: "",
  name: "",
  description: "",
  image: "",
  podcast: "",
  images: [],
  birthDate: "",
  deathDate: "",
  era: "",
  occupation: "",
  categoryFigureId: 0,
});

function FigureManager() {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = useForm(getFigureModel);

  return (
    <Grid container>
      <Grid item xs={12}>
        <FigureForm
          {...{
            values,
            setValues,
            errors,
            setErrors,
            handleInputChange,
            resetFormControls,
          }}
        />
      </Grid>
      {/* <Grid item xs={12}>
        <SearchArtifact />
      </Grid> */}
    </Grid>
  );
}

export default FigureManager;

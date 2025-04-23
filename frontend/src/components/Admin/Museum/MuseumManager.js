import React from "react";

import { useForm } from "../hooks/useForm";
import { Grid } from "@mui/material";
import FigureForm from "../Figure/FigureForm";
import MuseumForm from "./MuseumForm";

const getMuseumModel = () => ({
  id: "",
  name: "",
  description: "",
  image: "",
  video: "",
  images: [],
  location: "",
  establishYear: "",
  contact: "",
});

function MuseumManager() {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = useForm(getMuseumModel);

  return (
    <Grid container>
      <Grid item xs={12}>
        <MuseumForm
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

export default MuseumManager;

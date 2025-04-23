import React from "react";

import { useForm } from "../hooks/useForm";
import { Grid } from "@mui/material";
import FigureForm from "../Figure/FigureForm";

import EventForm from "./EventForm";

const getEventModel = () => ({
  id: "",
  name: "",
  description: "",
  image: "",
  startDate: "",
  endDate: "",
  location: "",
  museumId: 0,
  hastag: [],
});

function EventManager() {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = useForm(getEventModel);

  return (
    <Grid container>
      <Grid item xs={12}>
        <EventForm
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

export default EventManager;

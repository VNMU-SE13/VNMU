import React from "react";

import { useForm } from "../../../hooks/useForm";
import { Grid } from "@mui/material";

import QuizForm from "./QuizForm";

const getQuizModel = () => ({
  id: 0,
  title: "",
  description: "",
  timeLimit: 0,
  typeHistorical: "",
});

function QuizManager() {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = useForm(getQuizModel);

  return (
    <Grid container>
      <Grid item xs={12}>
        <QuizForm
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

export default QuizManager;

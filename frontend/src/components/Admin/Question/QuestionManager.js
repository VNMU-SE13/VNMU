import React from "react";

import { useForm } from "../hooks/useForm";
import { Grid } from "@mui/material";

import QuestionForm from "./QuestionForm";

const getQuestionModel = () => ({
  id: 0,
  text: "",
  points: 0,
  image: "",
  quizId: 0,
});

function QuestionManager() {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = useForm(getQuestionModel);

  return (
    <Grid container>
      <Grid item xs={12}>
        <QuestionForm
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

export default QuestionManager;

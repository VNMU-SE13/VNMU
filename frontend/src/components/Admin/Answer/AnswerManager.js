import React from "react";

import { useForm } from "../hooks/useForm";
import { Grid } from "@mui/material";

import AnswerForm from "./AnswerForm";

const getAnswerModel = () => ({
  id: 0,
  text: "",
  isCorrect: false,
  questionId: 0,
});

function AnswerManager() {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = useForm(getAnswerModel);

  return (
    <Grid container>
      <Grid item xs={12}>
        <AnswerForm
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

export default AnswerManager;

import React from "react";

import { useForm } from "../hooks/useForm";
import { Grid } from "@mui/material";

import CategoryFigureForm from "./CategoryFigureForm";

const getCategoryModel = () => ({
  id: 0,
  name: "",
});

function CategoryFigureManager() {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = useForm(getCategoryModel);

  return (
    <Grid container>
      <Grid item xs={12}>
        <CategoryFigureForm
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

export default CategoryFigureManager;

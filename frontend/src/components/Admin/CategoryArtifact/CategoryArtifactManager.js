import React from "react";

import { useForm } from "../hooks/useForm";
import { Grid } from "@mui/material";

import CategoryArtifactForm from "./CategoryArtifactForm";

const getCategoryModel = () => ({
  id: 0,
  name: "",
});

function CategoryArtifactManager() {
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
        <CategoryArtifactForm
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

export default CategoryArtifactManager;

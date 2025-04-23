import React from "react";
import ArtifactForm from "./ArtifactForm";
import { useForm } from "../hooks/useForm";
import { Grid } from "@mui/material";

const getArtifactModel = () => ({
  id: "",
  artifactName: "",
  description: "",
  image: "",
  podcast: "",
  images: [],
  dateDiscovered: "",
  dimenson: "",
  weight: "",
  material: "",
  function: "",
  condition: "",
  origin: "",
  museumId: "",
  categoryArtifactId: 0,
});

function ArtifactManager() {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = useForm(getArtifactModel);

  return (
    <Grid container>
      <Grid item xs={12}>
        <ArtifactForm
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

export default ArtifactManager;

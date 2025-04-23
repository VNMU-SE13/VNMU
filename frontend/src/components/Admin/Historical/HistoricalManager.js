import React from "react";
import HistoricalForm from "./HistoricalForm";
import { useForm } from "../hooks/useForm";
import { Grid } from "@mui/material";
import SearchArtifact from "./SearchArtifact";
import ArtifactItem from "./ArtifactItem";
import FigureItem from "./FigureItem";
import SearchFigure from "./SearchFigure";

const getHistoricalModel = () => ({
  id: "",
  name: "",
  description: "",
  image: "",
  podcast: "",
  video: "",
  images: [],
  startDate: "",
  endDate: "",
  timeLine: "",
  location: "",
  gorvernance: "",
  politialStructure: "",
  figure: "",
  categoryHistoricalId: 0,
  artifactIds: [],
  figureIds: [],
  deleteArtifactItem: "",
  deleteFigureItem: "",
});

function HistoricalManager() {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
    handleMultiSelectChange,
  } = useForm(getHistoricalModel);

  return (
    <Grid container>
      <Grid item xs={12}>
        <HistoricalForm
          {...{
            values,
            setValues,
            errors,
            setErrors,
            handleInputChange,
            resetFormControls,
            handleMultiSelectChange,
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <SearchArtifact
          {...{
            values,
            setValues,
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <ArtifactItem
          {...{
            values,
            setValues,
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <SearchFigure
          {...{
            values,
            setValues,
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <FigureItem
          {...{
            values,
            setValues,
          }}
        />
      </Grid>
    </Grid>
  );
}

export default HistoricalManager;

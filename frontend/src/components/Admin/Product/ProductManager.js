import React from "react";

import { useForm } from "../hooks/useForm";
import { Grid } from "@mui/material";

import ProductForm from "./ProductForm";

const getProductModel = () => ({
  id: "",
  name: "",
  description: "",
  point: "",
  stock: 0,
  image: "",
  categoryId: 0,
});

function ProductManager() {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = useForm(getProductModel);

  return (
    <Grid container>
      <Grid item xs={12}>
        <ProductForm
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

export default ProductManager;

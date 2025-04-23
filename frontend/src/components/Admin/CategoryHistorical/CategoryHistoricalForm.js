import React, { useState, useEffect } from "react";
import {
  Grid,
  InputAdornment,
  Typography,
  styled,
  ButtonGroup,
  Button as MuiButton,
  Button,
} from "@mui/material";
import Form from "../layouts/Form";
import Input from "../controls/Input";
import ReplayIcon from "@mui/icons-material/Replay";
import { createAPIEndpoint, ENDPIONTS } from "../api";

import Popup from "../layouts/Popup";
import Notification from "../layouts/Notification";
import ReorderIcon from "@mui/icons-material/Reorder";

import CategoryHistoricalList from "./CategoryHistoricalList";

const AdornmentText = styled(Typography)({
  color: "#f3b33d",
  fontWeight: "bolder",
  fontSize: "1.5em",
});

const SubmitButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  backgroundColor: "#f3b33d",
  color: "#000",
  margin: theme.spacing(1),
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#f3b33d",
  },
}));

function CategoryHistoricalForm(props) {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = props;

  const [categoryId, setCategoryId] = useState(0);
  const [notify, setNotify] = useState({ isOpen: false });

  const [categoryVisible, setCategoryVisible] = useState(false);

  useEffect(() => {
    if (categoryId == 0) resetForm();
    else {
      createAPIEndpoint(ENDPIONTS.CategoryHistorical)
        .fetchById(categoryId)
        .then((res) => {
          setValues({ ...res.data });
        })
        .catch((err) => console.log(err));
    }
  }, [categoryId]);

  const resetForm = () => {
    setCategoryId(0);

    resetFormControls();
  };

  const validateForm = () => {
    let temp = {};

    temp.name = values.name != "" ? "" : "This field is required.";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const submit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (values.id == 0) {
        createAPIEndpoint(ENDPIONTS.CategoryHistorical)
          .create(values)
          .then((res) => {
            resetFormControls();
            setNotify({
              isOpen: true,
              message: "New category historical is created.",
            });
          })
          .catch((err) => console.log(err));
      } else {
        createAPIEndpoint(ENDPIONTS.CategoryHistorical)
          .update(values.id, values)
          .then((res) => {
            setCategoryId(0);
            setNotify({
              isOpen: true,
              message: "The category historical is updated.",
            });
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const openListOfCategory = () => {
    setCategoryVisible(true);
  };
  return (
    <>
      <Form onSubmit={submit}>
        <Grid container>
          <Grid item xs={6}>
            <Input
              label="Category Historical"
              name="name"
              value={values.name}
              onChange={handleInputChange}
              error={errors.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdornmentText>#</AdornmentText>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <SubmitButtonGroup>
              <MuiButton size="large" type="submit">
                Submit
              </MuiButton>
              <MuiButton
                size="small"
                onClick={resetForm}
                startIcon={<ReplayIcon />}
              />
            </SubmitButtonGroup>
            <Button
              size="large"
              onClick={openListOfCategory}
              startIcon={<ReorderIcon />}
            >
              Category Historical
            </Button>
          </Grid>
        </Grid>
      </Form>
      {/* <Grid item xs={12}>
        <SearchArtifact {...{ setArtifactId, resetFormControls, setNotify }} />
      </Grid> */}
      <Popup
        title="List of Category"
        openPopup={categoryVisible}
        setOpenPopup={setCategoryVisible}
      >
        <CategoryHistoricalList
          {...{
            setCategoryId,
            resetFormControls,
            setNotify,
            setCategoryVisible,
          }}
        />
      </Popup>

      <Notification {...{ notify, setNotify }} />
    </>
  );
}

export default CategoryHistoricalForm;

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
import Form from "../../../layouts/Form";
import Input from "../../../controls/Input";
import ReplayIcon from "@mui/icons-material/Replay";
import { createAPIEndpoint, ENDPIONTS } from "../../../api";
import Select from "../../../controls/Select";
import Popup from "../../../layouts/Popup";
import Notification from "../../../layouts/Notification";
import ReorderIcon from "@mui/icons-material/Reorder";
import QuizList from "./QuizList";

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

function QuizForm(props) {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = props;

  const [quizId, setQuizId] = useState(0);
  const [notify, setNotify] = useState({ isOpen: false });

  const [quizVisible, setQuizVisible] = useState(false);

  useEffect(() => {
    if (quizId == 0) resetForm();
    else {
      createAPIEndpoint(ENDPIONTS.Quiz)
        .fetchById(quizId)
        .then((res) => {
          setValues({ ...res.data });
        })
        .catch((err) => console.log(err));
    }
  }, [quizId]);

  const resetForm = () => {
    setQuizId(0);

    resetFormControls();
  };

  const validateForm = () => {
    let temp = {};

    temp.titile = values.title != "" ? "" : "This field is required.";
    temp.description =
      values.description != "" ? "" : "This field is required.";
    temp.timeLimit = values.timeLimit != 0 ? "" : "This field is required.";

    temp.typeHistorical =
      values.typeHistorical != "" ? "" : "This field is required.";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const submit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (values.id == 0) {
        createAPIEndpoint(ENDPIONTS.Quiz)
          .create(values)
          .then((res) => {
            resetFormControls();
            setNotify({ isOpen: true, message: "New quiz is created." });
          })
          .catch((err) => console.log(err));
      } else {
        createAPIEndpoint(ENDPIONTS.Quiz)
          .update(values.id, values)
          .then((res) => {
            setQuizId(0);
            setNotify({ isOpen: true, message: "The quiz is updated." });
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const openListOfQuiz = () => {
    setQuizVisible(true);
  };
  return (
    <>
      <Form onSubmit={submit}>
        <Grid container>
          <Grid item xs={6}>
            <Input
              label="Quiz Title"
              name="title"
              value={values.title}
              onChange={handleInputChange}
              error={errors.title}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdornmentText>#</AdornmentText>
                  </InputAdornment>
                ),
              }}
            />
            <Input
              label="Description"
              name="description"
              value={values.description}
              onChange={handleInputChange}
              error={errors.description}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdornmentText>#</AdornmentText>
                  </InputAdornment>
                ),
              }}
            />

            <Input
              label="Time"
              name="timeLimit"
              value={values.timeLimit}
              onChange={handleInputChange}
              error={errors.timeLimit}
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
            <Input
              label="Type Historical"
              name="typeHistorical"
              value={values.typeHistorical}
              onChange={handleInputChange}
              error={errors.typeHistorical}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdornmentText>#</AdornmentText>
                  </InputAdornment>
                ),
              }}
            />

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
              onClick={openListOfQuiz}
              startIcon={<ReorderIcon />}
            >
              Quiz
            </Button>
          </Grid>
        </Grid>
      </Form>
      {/* <Grid item xs={12}>
        <SearchArtifact {...{ setArtifactId, resetFormControls, setNotify }} />
      </Grid> */}
      <Popup
        title="List of Quiz"
        openPopup={quizVisible}
        setOpenPopup={setQuizVisible}
      >
        <QuizList
          {...{
            setQuizId,
            resetFormControls,
            setNotify,
            setQuizVisible,
          }}
        />
      </Popup>

      <Notification {...{ notify, setNotify }} />
    </>
  );
}

export default QuizForm;

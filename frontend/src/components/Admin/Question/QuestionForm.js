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

import QuestionList from "./QuestionList";

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

function QuestionForm(props) {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = props;

  const [questionId, setQuestionId] = useState(0);
  const [notify, setNotify] = useState({ isOpen: false });
  const [quizList, setQuizList] = useState([]);

  const [questionVisible, setQuestionVisible] = useState(false);

  useEffect(() => {
    if (questionId == 0) resetForm();
    else {
      createAPIEndpoint(ENDPIONTS.Question)
        .fetchById(questionId)
        .then((res) => {
          setValues({ ...res.data });
        })
        .catch((err) => console.log(err));
    }
  }, [questionId]);

  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.Quiz)
      .fetchAll()
      .then((res) => {
        let quizList = res.data.map((item) => ({
          id: item.id,
          title: item.title,
        }));
        quizList = [{ id: 0, title: "Select" }].concat(quizList);
        setQuizList(quizList);
      })
      .catch((err) => console.log(err));
  }, []);

  const resetForm = () => {
    setQuestionId(0);

    resetFormControls();
  };

  const validateForm = () => {
    let temp = {};

    temp.text = values.text != "" ? "" : "This field is required.";
    temp.points = values.points != 0 ? "" : "This field is required.";

    temp.quizId = values.quizId != 0 ? "" : "This field is required.";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const submit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (values.id == 0) {
        createAPIEndpoint(ENDPIONTS.Question)
          .create(values)
          .then((res) => {
            resetFormControls();
            setNotify({ isOpen: true, message: "New question is created." });
          })
          .catch((err) => console.log(err));
      } else {
        createAPIEndpoint(ENDPIONTS.Question)
          .update(values.id, values)
          .then((res) => {
            setQuestionId(0);
            setNotify({ isOpen: true, message: "The question is updated." });
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const openListOfQuestion = () => {
    setQuestionVisible(true);
  };
  return (
    <>
      <Form onSubmit={submit}>
        <Grid container>
          <Grid item xs={6}>
            <Input
              label="Text"
              name="text"
              value={values.text}
              onChange={handleInputChange}
              error={errors.text}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdornmentText>#</AdornmentText>
                  </InputAdornment>
                ),
              }}
            />
            <Input
              label="Point"
              name="points"
              value={values.points}
              onChange={handleInputChange}
              error={errors.points}
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
            <Select
              label="Quiz"
              name="quizId"
              value={values.quizId}
              onChange={handleInputChange}
              options={quizList}
              error={errors.quizId}
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
              onClick={openListOfQuestion}
              startIcon={<ReorderIcon />}
            >
              Question
            </Button>
          </Grid>
        </Grid>
      </Form>
      {/* <Grid item xs={12}>
        <SearchArtifact {...{ setArtifactId, resetFormControls, setNotify }} />
      </Grid> */}
      <Popup
        title="List of Question"
        openPopup={questionVisible}
        setOpenPopup={setQuestionVisible}
      >
        <QuestionList
          {...{
            setQuestionId,
            resetFormControls,
            setNotify,
            setQuestionVisible,
          }}
        />
      </Popup>

      <Notification {...{ notify, setNotify }} />
    </>
  );
}

export default QuestionForm;

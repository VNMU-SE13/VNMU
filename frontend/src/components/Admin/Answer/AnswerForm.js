import React, { useState, useEffect } from "react";
import {
  Grid,
  InputAdornment,
  Typography,
  styled,
  ButtonGroup,
  Button as MuiButton,
  Button,
  MenuItem,
} from "@mui/material";
import Form from "../layouts/Form"; 
import Input from "../controls/Input";
import ReplayIcon from "@mui/icons-material/Replay";
import { createAPIEndpoint, ENDPIONTS } from ".././api";
import Select from "../controls/Select";
import Popup from "../layouts/Popup";
import Notification from "../layouts/Notification";
import ReorderIcon from "@mui/icons-material/Reorder";

import AnswerList from "./AnswerList";

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

function AnswerForm(props) {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = props;

  const [answerId, setAnswerId] = useState(0);
  const [notify, setNotify] = useState({ isOpen: false });
  const [questionList, setQuestionList] = useState([]);
  const [theAnswer, setTheAnswer] = useState([]);
  const [answerVisible, setAnswerVisible] = useState(false);

  useEffect(() => {
    setTheAnswer([
      { id: false, title: "false" },
      { id: true, title: "true" },
    ]);
  }, []);

  useEffect(() => {
    if (answerId == 0) resetForm();
    else {
      createAPIEndpoint(ENDPIONTS.Answer)
        .fetchById(answerId)
        .then((res) => {
          setValues({ ...res.data });
        })
        .catch((err) => console.log(err));
    }
  }, [answerId]);

  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.Question)
      .fetchAll()
      .then((res) => {
        let questionList = res.data.map((item) => ({
          id: item.id,
          title: item.text,
        }));
        questionList = [{ id: 0, title: "Select" }].concat(questionList);
        setQuestionList(questionList);
      })
      .catch((err) => console.log(err));
  }, []);

  const resetForm = () => {
    setAnswerId(0);

    resetFormControls();
  };

  const validateForm = () => {
    let temp = {};

    temp.text = values.text != "" ? "" : "This field is required.";

    temp.questionId = values.questionId != 0 ? "" : "This field is required.";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const submit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (values.id == 0) {
        createAPIEndpoint(ENDPIONTS.Answer)
          .create(values)
          .then((res) => {
            resetFormControls();
            setNotify({ isOpen: true, message: "New answer is created." });
          })
          .catch((err) => console.log(err));
      } else {
        createAPIEndpoint(ENDPIONTS.Answer)
          .update(values.id, values)
          .then((res) => {
            setAnswerId(0);
            setNotify({ isOpen: true, message: "The answer is updated." });
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const openListOfAnswer = () => {
    setAnswerVisible(true);
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
            <Select
              label="The Answer"
              name="isCorrect"
              value={values.isCorrect}
              onChange={handleInputChange}
              options={theAnswer}
              error={errors.isCorrect}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              label="Question"
              name="questionId"
              value={values.questionId}
              onChange={handleInputChange}
              options={questionList}
              error={errors.questionId}
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
              onClick={openListOfAnswer}
              startIcon={<ReorderIcon />}
            >
              Answer
            </Button>
          </Grid>
        </Grid>
      </Form>
      {/* <Grid item xs={12}>
        <SearchArtifact {...{ setArtifactId, resetFormControls, setNotify }} />
      </Grid> */}
      <Popup
        title="List of Answer"
        openPopup={answerVisible}
        setOpenPopup={setAnswerVisible}
      >
        <AnswerList
          {...{
            setAnswerId,
            resetFormControls,
            setNotify,
            setAnswerVisible,
          }}
        />
      </Popup>

      <Notification {...{ notify, setNotify }} />
    </>
  );
}

export default AnswerForm;

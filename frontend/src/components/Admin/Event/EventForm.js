import React, { useState, useEffect } from "react";
import {
  Grid,
  InputAdornment,
  Typography,
  styled,
  ButtonGroup,
  Button as MuiButton,
  Button,
  Chip,
  Box,
} from "@mui/material";
import Form from "../layouts/Form";
import Input from "../controls/Input";
import ReplayIcon from "@mui/icons-material/Replay";
import { createAPIEndpoint, ENDPIONTS } from "../api";
import Select from "../controls/Select";
import Popup from "../layouts/Popup";
import Notification from "../layouts/Notification";
import ReorderIcon from "@mui/icons-material/Reorder";
import EventList from "./EventList";

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

function EventForm(props) {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = props;

  const [eventId, setEventId] = useState(0);
  const [notify, setNotify] = useState({ isOpen: false });
  const [imageFile, setImageFile] = useState(null);
  const [museumList, setMuseumList] = useState([]);
  const [eventVisible, setEventVisible] = useState(false);
  const [tempTag, setTempTag] = useState("");

  useEffect(() => {
    if (eventId === 0) resetForm();
    else {
      createAPIEndpoint(ENDPIONTS.Event)
        .fetchById(eventId)
        .then((res) => {
          const { hastag, ...eventWithoutHastag } = res.data;

          // đảm bảo các giá trị mặc định không bị thiếu
          setValues({
            ...eventWithoutHastag,
            images: [], // reset lại nếu có field images cho upload
            hastag: [], // đảm bảo không undefined nếu trong form có map
          });
        })
        .catch((err) => console.log(err));
    }
  }, [eventId]);

  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.Museum)
      .fetchAll()
      .then((res) => {
        let museumList = res.data.map((item) => ({
          id: item.id,
          title: item.name,
        }));
        museumList = [{ id: 0, title: "Select" }].concat(museumList);
        setMuseumList(museumList);
      })
      .catch((err) => console.log(err));
  }, []);

  const resetForm = () => {
    setEventId(0);
    setImageFile(null);
    setTempTag("");
    setValues({
      ...values,
      images: [],
      hastag: [],
    });
    resetFormControls();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setValues({ ...values, image: URL.createObjectURL(file) });
    }
  };

  const validateForm = () => {
    let temp = {};
    temp.name = values.name !== "" ? "" : "This field is required.";
    temp.description =
      values.description !== "" ? "" : "This field is required.";
    temp.image = values.image !== "" ? "" : "This field is required.";
    temp.location = values.location !== "" ? "" : "This field is required.";
    temp.startDate = values.startDate !== "" ? "" : "This field is required.";
    temp.endDate = values.endDate !== "" ? "" : "This field is required.";
    temp.museumId = values.museumId !== 0 ? "" : "This field is required.";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleAddHashtag = (e) => {
    if (e.key === "Enter" && tempTag.trim() !== "") {
      e.preventDefault();
      const newTag = tempTag.trim();
      if (!values.hastag.includes(newTag)) {
        setValues({
          ...values,
          hastag: [...values.hastag, newTag],
        });
      }
      setTempTag("");
    }
  };

  const handleDeleteHashtag = (hashtagToDelete) => {
    setValues({
      ...values,
      hastag: values.hastag.filter((hashtag) => hashtag !== hashtagToDelete),
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append("Name", values.name);
      formData.append("Description", values.description);
      formData.append("Location", values.location);
      formData.append("StartDate", values.startDate);
      formData.append("EndDate", values.endDate);
      formData.append("MuseumId", values.museumId);
      values.hastag.forEach((tag) => {
        formData.append("hastagDto", tag);
      });
      if (imageFile) {
        formData.append("Image", imageFile);
      }

      try {
        if (values.id == 0) {
          await createAPIEndpoint(ENDPIONTS.Event).create(formData);
          setNotify({ isOpen: true, message: "New Event is created." });
        } else {
          await createAPIEndpoint(ENDPIONTS.Event).update(values.id, formData);
          setNotify({ isOpen: true, message: "Event is updated." });
        }
        resetForm();
      } catch (err) {
        setNotify({
          isOpen: true,
          message: `Event ${values.id === 0 ? "creation" : "update"} failed.`,
        });
      }
    }
  };

  const openListOfEvent = () => {
    setEventVisible(true);
  };

  return (
    <>
      <Form onSubmit={submit}>
        <Grid container>
          <Grid item xs={6}>
            <Input
              label="Event Name"
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
              label="Location"
              name="location"
              value={values.location}
              onChange={handleInputChange}
              error={errors.location}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdornmentText>#</AdornmentText>
                  </InputAdornment>
                ),
              }}
            />
            <Select
              label="Museum"
              name="museumId"
              value={values.museumId}
              onChange={handleInputChange}
              options={museumList}
              error={errors.museumId}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Start Date"
              type="date"
              name="startDate"
              value={values.startDate}
              onChange={handleInputChange}
              error={errors.startDate}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdornmentText>#</AdornmentText>
                  </InputAdornment>
                ),
              }}
            />
            <Input
              label="End Date"
              type="date"
              name="endDate"
              value={values.endDate}
              onChange={handleInputChange}
              error={errors.endDate}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdornmentText>#</AdornmentText>
                  </InputAdornment>
                ),
              }}
            />
            <Input
              label="Upload Image"
              type="file"
              name="image"
              onChange={handleImageUpload}
              error={errors.image}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdornmentText>#</AdornmentText>
                  </InputAdornment>
                ),
              }}
            />

            <Input
              label="Add Hashtag"
              value={tempTag}
              onChange={(e) => setTempTag(e.target.value)}
              onKeyDown={handleAddHashtag}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdornmentText>#</AdornmentText>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              {values.hastag.map((hashtag, index) => (
                <Chip
                  key={index}
                  label={hashtag}
                  onDelete={() => handleDeleteHashtag(hashtag)}
                  color="primary"
                />
              ))}
            </Box>
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
              onClick={openListOfEvent}
              startIcon={<ReorderIcon />}
            >
              Event
            </Button>
          </Grid>
        </Grid>
      </Form>
      <Popup
        title="List of Event"
        openPopup={eventVisible}
        setOpenPopup={setEventVisible}
      >
        <EventList
          {...{
            setEventId,
            resetFormControls,
            setNotify,
            setEventVisible,
          }}
        />
      </Popup>
      <Notification {...{ notify, setNotify }} />
    </>
  );
}

export default EventForm;

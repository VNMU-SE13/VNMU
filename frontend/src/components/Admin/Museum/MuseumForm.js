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
import Select from "../controls/Select";
import Popup from "../layouts/Popup";
import Notification from "../layouts/Notification";
import ReorderIcon from "@mui/icons-material/Reorder";
import ArtifactList from "../Artifact/ArtifactList";

import MuseumList from "./MuseumList";
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

function MuseumForm(props) {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = props;

  const [imageFiles, setImageFiles] = useState([]);
  const [museumId, setMuseumId] = useState(0);
  const [notify, setNotify] = useState({ isOpen: false });
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [MuseumVisible, setMuseumVisible] = useState(false);

  useEffect(() => {
    if (museumId == 0) resetForm();
    else {
      createAPIEndpoint(ENDPIONTS.Museum)
        .fetchById(museumId)
        .then((res) => {
          setValues({ ...res.data, images: [] });
        })
        .catch((err) => console.log(err));
    }
  }, [museumId]);

  const handleImagesUpload = (event) => {
    const files = event.target.files;
    if (files) {
      const newImageFiles = Array.from(files);
      setImageFiles([...imageFiles, ...newImageFiles]);

      const imageArray = [...values.images];
      newImageFiles.forEach((file) => {
        const imageUrl = URL.createObjectURL(file);
        imageArray.push(imageUrl);
      });
      setValues({ ...values, images: imageArray });
    }
  };

  const resetForm = () => {
    setMuseumId(0);
    setImageFile(null);
    setVideoFile(null);
    setImageFiles([]);
    setValues({
      ...values,
      images: [],
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

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);
      setValues({ ...values, video: URL.createObjectURL(file) });
    }
  };

  const validateForm = () => {
    let temp = {};

    temp.name = values.name != "" ? "" : "This field is required.";
    temp.description =
      values.description != "" ? "" : "This field is required.";
    temp.image = values.image != "" ? "" : "This field is required.";

    temp.video = values.video != "" ? "" : "This field is required.";
    temp.location = values.location != "" ? "" : "This field is required.";
    temp.establishYear =
      values.establishYear != "" ? "" : "This field is required.";
    temp.contact = values.contact != "" ? "" : "This field is required.";

    temp.images = values.images.length != 0 ? "" : "This field is required.";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const submit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (values.id == 0) {
        const formData = new FormData();
        formData.append("Name", values.name);
        formData.append("Description", values.description);

        formData.append("Location", values.location);
        formData.append("EstablishYear", values.establishYear);
        formData.append("Contact", values.contact);

        if (imageFile) {
          formData.append("Image", imageFile);
        }
        if (videoFile) {
          formData.append("Video", videoFile);
        }
        imageFiles.forEach((file, index) => {
          formData.append("images", file);
        });

        try {
          const response = await createAPIEndpoint(ENDPIONTS.Museum).create(
            formData
          );

          setNotify({ isOpen: true, message: "New Museum is created." });
          resetForm();
        } catch (err) {
          setNotify({ isOpen: true, message: "New Museum is created failed." });
        }
      } else {
        const formData = new FormData();
        formData.append("Name", values.name);
        formData.append("Description", values.description);

        formData.append("Location", values.location);
        formData.append("EstablishYear", values.establishYear);
        formData.append("Contact", values.contact);

        if (imageFile) {
          formData.append("Image", imageFile);
        }
        if (videoFile) {
          formData.append("Video", videoFile);
        }
        imageFiles.forEach((file, index) => {
          formData.append("images", file);
        });

        try {
          const response = await createAPIEndpoint(ENDPIONTS.Museum).update(
            values.id,
            formData
          );

          setNotify({ isOpen: true, message: "Museum is updated." });
          resetForm();
        } catch (err) {
          setNotify({ isOpen: true, message: "Museum is updated failed." });
        }
      }
    }
  };

  const openListOfMuseum = () => {
    setMuseumVisible(true);
  };
  return (
    <>
      <Form onSubmit={submit}>
        <Grid container>
          <Grid item xs={6}>
            <Input
              label="Museum Name"
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
              label="Image"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImagesUpload}
              error={errors.images}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdornmentText>#</AdornmentText>
                  </InputAdornment>
                ),
              }}
            />

            <Grid container spacing={2}>
              {values.images.map((img, index) => (
                <Grid item key={index} xs={3}>
                  <img src={img} alt={`Uploaded ${index}`} width="100%" />
                </Grid>
              ))}
              {}
            </Grid>

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
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Contact"
              name="contact"
              value={values.contact}
              onChange={handleInputChange}
              error={errors.contact}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdornmentText>#</AdornmentText>
                  </InputAdornment>
                ),
              }}
            />

            <Input
              label="Upload Video"
              type="file"
              name="video"
              onChange={handleVideoUpload}
              error={errors.video} // Hàm xử lý tải lên podcast
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdornmentText>#</AdornmentText>
                  </InputAdornment>
                ),
              }}
            />
            <Input
              label="Establish Year"
              name="establishYear"
              value={values.establishYear}
              onChange={handleInputChange}
              error={errors.establishYear}
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
              error={errors.image} // Hàm xử lý tải lên hình ảnh
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
              onClick={openListOfMuseum}
              startIcon={<ReorderIcon />}
            >
              Museum
            </Button>
          </Grid>
        </Grid>
      </Form>
      {/* <Grid item xs={12}>
        <SearchArtifact {...{ setArtifactId, resetFormControls, setNotify }} />
      </Grid> */}
      <Popup
        title="List of Museum"
        openPopup={MuseumVisible}
        setOpenPopup={setMuseumVisible}
      >
        <MuseumList
          {...{
            setMuseumId,
            resetFormControls,
            setNotify,
            setMuseumVisible,
          }}
        />
      </Popup>

      <Notification {...{ notify, setNotify }} />
    </>
  );
}

export default MuseumForm;

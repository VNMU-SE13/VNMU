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
import FigureList from "./FigureList";
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

function FigureForm(props) {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = props;
  const [categoryList, setCategoryList] = useState([]);

  const [imageFiles, setImageFiles] = useState([]);
  const [figureId, setFigureId] = useState(0);
  const [notify, setNotify] = useState({ isOpen: false });
  const [imageFile, setImageFile] = useState(null);
  const [podcastFile, setPodcastFile] = useState(null);
  const [figureVisible, setFigureVisible] = useState(false);

  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.CategoryFigure)
      .fetchAll()
      .then((res) => {
        let categoryList = res.data.map((item) => ({
          id: item.id,
          title: item.name,
        }));
        categoryList = [{ id: 0, title: "Select" }].concat(categoryList);
        setCategoryList(categoryList);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (figureId == 0) resetForm();
    else {
      createAPIEndpoint(ENDPIONTS.Figure)
        .fetchById(figureId)
        .then((res) => {
          setValues({ ...res.data, images: [] });
        })
        .catch((err) => console.log(err));
    }
  }, [figureId]);

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
    setFigureId(0);
    setImageFile(null);
    setPodcastFile(null);
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

  const handlePodcastUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPodcastFile(file);
      setValues({ ...values, podcast: URL.createObjectURL(file) });
    }
  };

  const validateForm = () => {
    let temp = {};
    temp.categoryFigureId =
      values.categoryFigureId != 0 ? "" : "This field is required.";
    temp.name = values.name != "" ? "" : "This field is required.";
    temp.description =
      values.description != "" ? "" : "This field is required.";
    temp.image = values.image != "" ? "" : "This field is required.";

    temp.podcast = values.podcast != "" ? "" : "This field is required.";
    temp.birthDate = values.birthDate != "" ? "" : "This field is required.";
    temp.deathDate = values.deathDate != "" ? "" : "This field is required.";
    temp.era = values.era != "" ? "" : "This field is required.";
    temp.occupation = values.occupation != "" ? "" : "This field is required.";

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
        formData.append("CategoryFigureId", values.categoryFigureId);
        formData.append("BirthDate", values.birthDate);
        formData.append("DeathDate", values.deathDate);
        formData.append("Era", values.era);
        formData.append("Occupation", values.occupation);

        if (imageFile) {
          formData.append("Image", imageFile);
        }
        if (podcastFile) {
          formData.append("Podcast", podcastFile);
        }
        imageFiles.forEach((file, index) => {
          formData.append("images", file);
        });

        try {
          const response = await createAPIEndpoint(ENDPIONTS.Figure).create(
            formData
          );

          setNotify({ isOpen: true, message: "New Figure is created." });
          resetForm();
        } catch (err) {
          setNotify({ isOpen: true, message: "New Figure is created failed." });
        }
      } else {
        const formData = new FormData();
        formData.append("Name", values.name);
        formData.append("Description", values.description);
        formData.append("CategoryFigureId", values.categoryFigureId);
        formData.append("BirthDate", values.birthDate);
        formData.append("DeathDate", values.deathDate);
        formData.append("Era", values.era);
        formData.append("Occupation", values.occupation);

        if (imageFile) {
          formData.append("Image", imageFile);
        }
        if (podcastFile) {
          formData.append("Podcast", podcastFile);
        }
        imageFiles.forEach((file, index) => {
          formData.append("images", file);
        });

        try {
          const response = await createAPIEndpoint(ENDPIONTS.Figure).update(
            values.id,
            formData
          );

          setNotify({ isOpen: true, message: "Figure is updated." });
          resetForm();
        } catch (err) {
          setNotify({ isOpen: true, message: "Figure is updated failed." });
        }
      }
    }
  };

  const openListOfFigure = () => {
    setFigureVisible(true);
  };
  return (
    <>
      <Form onSubmit={submit}>
        <Grid container>
          <Grid item xs={6}>
            <Input
              label="Figure Name"
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
              label="Birth Date"
              name="birthDate"
              value={values.birthDate}
              onChange={handleInputChange}
              error={errors.birthDate}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdornmentText>#</AdornmentText>
                  </InputAdornment>
                ),
              }}
            />
            <Input
              label="Death Date"
              name="deathDate"
              value={values.deathDate}
              onChange={handleInputChange}
              error={errors.deathDate}
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
            <Select
              label="Figure Category"
              name="categoryFigureId"
              value={values.categoryFigureId}
              onChange={handleInputChange}
              options={categoryList}
              error={errors.categoryFigureId}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Era"
              name="era"
              value={values.era}
              onChange={handleInputChange}
              error={errors.era}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdornmentText>#</AdornmentText>
                  </InputAdornment>
                ),
              }}
            />
            <Input
              label="Occupation"
              name="occupation"
              value={values.occupation}
              onChange={handleInputChange}
              error={errors.occupation}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdornmentText>#</AdornmentText>
                  </InputAdornment>
                ),
              }}
            />

            <Input
              label="Upload Podcast"
              type="file"
              name="podcast"
              onChange={handlePodcastUpload}
              error={errors.podcast} // Hàm xử lý tải lên podcast
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
              onClick={openListOfFigure}
              startIcon={<ReorderIcon />}
            >
              Figure
            </Button>
          </Grid>
        </Grid>
      </Form>
      {/* <Grid item xs={12}>
        <SearchArtifact {...{ setArtifactId, resetFormControls, setNotify }} />
      </Grid> */}
      <Popup
        title="List of Figures"
        openPopup={figureVisible}
        setOpenPopup={setFigureVisible}
      >
        <FigureList
          {...{
            setFigureId,
            resetFormControls,
            setNotify,
            setFigureVisible,
          }}
        />
      </Popup>

      <Notification {...{ notify, setNotify }} />
    </>
  );
}

export default FigureForm;

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
import ArtifactList from "./ArtifactList";
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

function ArtifactForm(props) {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = props;
  const [categoryList, setCategoryList] = useState([]);
  const [museumList, setMuseumList] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [artifactId, setArtifactId] = useState(0);
  const [notify, setNotify] = useState({ isOpen: false });
  const [imageFile, setImageFile] = useState(null);
  const [podcastFile, setPodcastFile] = useState(null);
  const [artifactVisible, setArtifactVisible] = useState(false);

  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.CategoryArtifact)
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

  useEffect(() => {
    if (artifactId == 0) resetForm();
    else {
      createAPIEndpoint(ENDPIONTS.Artifact)
        .fetchById(artifactId)
        .then((res) => {
          setValues({ ...res.data, images: [] });
        })
        .catch((err) => console.log(err));
    }
  }, [artifactId]);

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
    setArtifactId(0);
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
    temp.categoryArtifactId =
      values.categoryArtifactId != 0 ? "" : "This field is required.";
    temp.name = values.name != "" ? "" : "This field is required.";
    temp.description =
      values.description != "" ? "" : "This field is required.";
    temp.image = values.image != "" ? "" : "This field is required.";

    temp.podcast = values.podcast != "" ? "" : "This field is required.";
    temp.dateDiscovered =
      values.dateDiscovered != "" ? "" : "This field is required.";
    temp.dimenson = values.dimenson != "" ? "" : "This field is required.";
    temp.weight = values.weight != "" ? "" : "This field is required.";
    temp.material = values.material != "" ? "" : "This field is required.";
    temp.function = values.function != "" ? "" : "This field is required.";
    temp.condition = values.condition != "" ? "" : "This field is required.";
    temp.origin = values.origin != "" ? "" : "This field is required.";
    temp.museumId = values.museumId != 0 ? "" : "This field is required.";

    temp.images = values.images.length != 0 ? "" : "This field is required.";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const submit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (values.id == 0) {
        const formData = new FormData();
        formData.append("Name", values.artifactName);
        formData.append("Description", values.description);
        formData.append("CategoryArtifactId", values.categoryArtifactId);
        formData.append("MuseumId", values.museumId);
        formData.append("DateDiscovered", values.dateDiscovered);
        formData.append("Dimenson", values.dimenson);
        formData.append("Weight", values.weight);
        formData.append("Material", values.material);
        formData.append("Function", values.function);
        formData.append("Condition", values.condition);
        formData.append("Origin", values.origin);

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
          const response = await createAPIEndpoint(ENDPIONTS.Artifact).create(
            formData
          );

          setNotify({ isOpen: true, message: "New Artifact is created." });
          resetForm();
        } catch (err) {
          setNotify({
            isOpen: true,
            message: "New Artifact is created failed.",
          });
        }
      } else {
        const formData = new FormData();
        formData.append("Name", values.artifactName);
        formData.append("Description", values.description);
        formData.append("CategoryArtifactId", values.categoryArtifactId);
        formData.append("MuseumId", values.museumId);
        formData.append("DateDiscovered", values.dateDiscovered);
        formData.append("Dimenson", values.dimenson);
        formData.append("Weight", values.weight);
        formData.append("Material", values.material);
        formData.append("Function", values.function);
        formData.append("Condition", values.condition);
        formData.append("Origin", values.origin);

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
          const response = await createAPIEndpoint(ENDPIONTS.Artifact).update(
            values.id,
            formData
          );

          setNotify({ isOpen: true, message: " Artifact is updated." });
          resetForm();
        } catch (err) {
          setNotify({ isOpen: true, message: "Artifact is updated failed." });
        }
      }
    }
  };
  const openListOfArtifact = () => {
    setArtifactVisible(true);
  };

  return (
    <>
      <Form onSubmit={submit}>
        <Grid container>
          <Grid item xs={6}>
            <Input
              label="Artifact Name"
              name="artifactName"
              value={values.artifactName}
              onChange={handleInputChange}
              error={errors.artifactName}
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
              label="Date Discovered"
              name="dateDiscovered"
              value={values.dateDiscovered}
              onChange={handleInputChange}
              error={errors.dateDiscovered}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdornmentText>#</AdornmentText>
                  </InputAdornment>
                ),
              }}
            />
            <Input
              label="Dimenson"
              name="dimenson"
              value={values.dimenson}
              onChange={handleInputChange}
              error={errors.dimenson}
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
              label="Artifact Category"
              name="categoryArtifactId"
              value={values.categoryArtifactId}
              onChange={handleInputChange}
              options={categoryList}
              error={errors.categoryArtifactId}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Weight"
              name="weight"
              value={values.weight}
              onChange={handleInputChange}
              error={errors.weight}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdornmentText>#</AdornmentText>
                  </InputAdornment>
                ),
              }}
            />
            <Input
              label="Material"
              name="material"
              value={values.material}
              onChange={handleInputChange}
              error={errors.material}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdornmentText>#</AdornmentText>
                  </InputAdornment>
                ),
              }}
            />
            <Input
              label="Function"
              name="function"
              value={values.function}
              onChange={handleInputChange}
              error={errors.function}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdornmentText>#</AdornmentText>
                  </InputAdornment>
                ),
              }}
            />
            <Input
              label="Condition"
              name="condition"
              value={values.condition}
              onChange={handleInputChange}
              error={errors.condition}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdornmentText>#</AdornmentText>
                  </InputAdornment>
                ),
              }}
            />
            <Input
              label="Origin"
              name="origin"
              value={values.origin}
              onChange={handleInputChange}
              error={errors.origin}
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
            <Select
              label="Museum"
              name="museumId"
              value={values.museumId}
              onChange={handleInputChange}
              options={museumList}
              error={errors.museumId}
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
              onClick={openListOfArtifact}
              startIcon={<ReorderIcon />}
            >
              Artifact
            </Button>
          </Grid>
        </Grid>
      </Form>
      {/* <Grid item xs={12}>
        <SearchArtifact {...{ setArtifactId, resetFormControls, setNotify }} />
      </Grid> */}

      <Popup
        title="List of Artifact"
        openPopup={artifactVisible}
        setOpenPopup={setArtifactVisible}
      >
        <ArtifactList
          {...{
            setArtifactId,
            resetFormControls,
            setNotify,
            setArtifactVisible,
          }}
        />
      </Popup>

      <Notification {...{ notify, setNotify }} />
    </>
  );
}

export default ArtifactForm;

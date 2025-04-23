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
import { createAPIEndpoint, ENDPIONTS } from "../api";
import Select from "../controls/Select";
import Popup from "../layouts/Popup";
import Notification from "../layouts/Notification";
import HistoricalList from "./HistoricalList";
import ReorderIcon from "@mui/icons-material/Reorder";

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

function HistoricalForm(props) {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
    handleMultiSelectChange,
  } = props;
  const [categoryList, setCategoryList] = useState([]);
  const [historicalList, setHistoricalList] = useState([]);
  const [figureList, setFigureList] = useState([]);
  const [artifactList, setArtifactList] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [historicalId, setHistoricalId] = useState(0);
  const [notify, setNotify] = useState({ isOpen: false });
  const [imageFile, setImageFile] = useState(null);
  const [podcastFile, setPodcastFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [historyListVisibility, setHistoryListVisibility] = useState(false);
  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.CategoryHistorical)
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
    createAPIEndpoint(ENDPIONTS.Artifact)
      .fetchAll()
      .then((res) => {
        let artifactList = res.data.map((item) => ({
          id: item.id,
          title: item.artifactName,
        }));
        artifactList = [{ id: 0, title: "Select" }].concat(artifactList);
        setArtifactList(artifactList);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.Figure)
      .fetchAll()
      .then((res) => {
        let figureList = res.data.map((item) => ({
          id: item.id,
          title: item.name,
        }));
        figureList = [{ id: 0, title: "Select" }].concat(figureList);
        setFigureList(figureList);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.Historical)
      .fetchAll()
      .then((res) => {
        let historicalList = res.data.map((item) => ({
          id: item.id,
          title: item.name,
        }));
        historicalList = [{ id: 0, title: "Select" }].concat(historicalList);
        setHistoricalList(historicalList);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (historicalId == 0) resetForm();
    else {
      createAPIEndpoint(ENDPIONTS.Historical)
        .fetchById(historicalId)
        .then((res) => {
          setValues({ ...res.data, images: [] });
        })
        .catch((err) => console.log(err));
    }
  }, [historicalId]);

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
    setHistoricalId(0);
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

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);
      setValues({ ...values, podcast: URL.createObjectURL(file) });
    }
  };

  const validateForm = () => {
    let temp = {};
    temp.categoryHistoricalId =
      values.categoryHistoricalId != 0 ? "" : "This field is required.";
    temp.name = values.name != "" ? "" : "This field is required.";
    temp.description =
      values.description != "" ? "" : "This field is required.";
    temp.image = values.image != "" ? "" : "This field is required.";

    temp.podcast = values.podcast != "" ? "" : "This field is required.";
    temp.startDate = values.startDate != "" ? "" : "This field is required.";
    temp.endDate = values.endDate != "" ? "" : "This field is required.";
    temp.timeLine = values.timeLine != "" ? "" : "This field is required.";
    temp.location = values.location != "" ? "" : "This field is required.";
    temp.gorvernance =
      values.gorvernance != "" ? "" : "This field is required.";
    temp.politialStructure =
      values.politialStructure != "" ? "" : "This field is required.";
    temp.endDate = values.endDate != "" ? "" : "This field is required.";
    temp.artifactIds =
      values.artifactIds.length != 0 ? "" : "This field is required.";
    temp.figureIds =
      values.figureIds.length != 0 ? "" : "This field is required.";
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

        formData.append("StartDate", values.startDate);
        formData.append("EndDate", values.endDate);
        formData.append("TimeLine", values.timeLine);
        formData.append("Location", values.location);
        formData.append("Gorvernance", values.gorvernance);
        formData.append("PolitialStructure", values.politialStructure);
        formData.append("Figure", values.figure);
        formData.append("CategoryId", values.categoryHistoricalId);

        if (imageFile) {
          formData.append("Image", imageFile);
        }
        if (podcastFile) {
          formData.append("Podcast", podcastFile);
        }
        if (videoFile) {
          formData.append("Video", videoFile);
        }
        imageFiles.forEach((file, index) => {
          formData.append("images", file);
        });

        formData.append("ArtifactIds", values.artifactIds);
        formData.append("FigureIds", values.figureIds);
        try {
          const response = await createAPIEndpoint(ENDPIONTS.Historical).create(
            formData
          );

          setNotify({ isOpen: true, message: "New Historical is created." });
          resetForm();
        } catch (err) {
          console.log(err.response); // Kiểm tra toàn bộ response từ API
          console.log(err.response.data); // Kiểm tra nội dung lỗi từ API
          console.log("Form Data:", values);
          setNotify({
            isOpen: true,
            message: "New Historical is created failed.",
          });
        }
      } else {
        const formData = new FormData();
        formData.append("Name", values.name);
        formData.append("Description", values.description);
        formData.append("CategoryId", values.categoryHistoricalId);
        formData.append("StartDate", values.startDate);
        formData.append("EndDate", values.endDate);
        formData.append("TimeLine", values.timeLine);
        formData.append("Location", values.location);
        formData.append("Gorvernance", values.gorvernance);
        formData.append("PolitialStructure", values.politialStructure);
        formData.append("Figure", values.figure);

        if (imageFile) {
          formData.append("Image", imageFile);
        }
        if (podcastFile) {
          formData.append("Podcast", podcastFile);
        }
        imageFiles.forEach((file, index) => {
          formData.append("images", file);
        });

        if (videoFile) {
          formData.append("Video", videoFile);
        }

        try {
          const response = await createAPIEndpoint(ENDPIONTS.Historical).update(
            values.id,
            formData
          );

          setNotify({ isOpen: true, message: " Historical is updated." });
          resetForm();
        } catch (err) {
          setNotify({ isOpen: true, message: "Historical is updated failed." });
        }
      }
    }
  };

  const openListOfHistorical = () => {
    setHistoryListVisibility(true);
  };

  return (
    <>
      <Form onSubmit={submit}>
        <Grid container>
          <Grid item xs={6}>
            <Input
              label="Historical Name"
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
              label="Start Date"
              name="startDate"
              type="date"
              value={values.startDate}
              onChange={handleInputChange}
              error={errors.startDate}
              InputLabelProps={{ shrink: true }}
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
              name="endDate"
              type="date"
              value={values.endDate}
              onChange={handleInputChange}
              error={errors.endDate}
              InputLabelProps={{ shrink: true }}
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
              // Hàm xử lý tải lên hình ảnh
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
              // Hàm xử lý tải lên hình ảnh
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdornmentText>#</AdornmentText>
                  </InputAdornment>
                ),
              }}
            />
            <Select
              label="Historical Category"
              name="categoryHistoricalId"
              value={values.categoryHistoricalId}
              onChange={handleInputChange}
              options={categoryList}
              error={errors.categoryHistoricalId}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Timeline"
              name="timeLine"
              value={values.timeLine}
              onChange={handleInputChange}
              error={errors.timeLine}
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
            <Input
              label="Gorvernance"
              name="gorvernance"
              value={values.gorvernance}
              onChange={handleInputChange}
              error={errors.gorvernance}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdornmentText>#</AdornmentText>
                  </InputAdornment>
                ),
              }}
            />
            <Input
              label="Figure"
              name="figure"
              value={values.figure}
              onChange={handleInputChange}
              error={errors.figure}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdornmentText>#</AdornmentText>
                  </InputAdornment>
                ),
              }}
            />
            <Input
              label="PolitialStructure"
              name="politialStructure"
              value={values.politialStructure}
              onChange={handleInputChange}
              error={errors.politialStructure}
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
              // Hàm xử lý tải lên podcast
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
              onClick={openListOfHistorical}
              startIcon={<ReorderIcon />}
            >
              Historical
            </Button>
          </Grid>
        </Grid>
      </Form>

      <Popup
        title="List of Historical"
        openPopup={historyListVisibility}
        setOpenPopup={setHistoryListVisibility}
      >
        <HistoricalList
          {...{
            setHistoricalId,
            resetFormControls,
            setNotify,
            setHistoryListVisibility,
          }}
        />
      </Popup>
      <Notification {...{ notify, setNotify }} />
    </>
  );
}

export default HistoricalForm;

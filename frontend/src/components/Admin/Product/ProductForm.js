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

import ProductList from "./ProductList";
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

function ProductForm(props) {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = props;

  const [productId, setProductId] = useState(0);
  const [notify, setNotify] = useState({ isOpen: false });
  const [imageFile, setImageFile] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [productVisible, setProductVisible] = useState(false);

  useEffect(() => {
    if (productId == 0) resetForm();
    else {
      createAPIEndpoint(ENDPIONTS.Product)
        .fetchById(productId)
        .then((res) => {
          setValues({ ...res.data, images: [] });
        })
        .catch((err) => console.log(err));
    }
  }, [productId]);

  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.CategoryProduct)
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

  const resetForm = () => {
    setProductId(0);
    setImageFile(null);

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

  const validateForm = () => {
    let temp = {};

    temp.name = values.name != "" ? "" : "This field is required.";
    temp.description =
      values.description != "" ? "" : "This field is required.";
    temp.image = values.image != "" ? "" : "This field is required.";

    temp.point = values.location != "" ? "" : "This field is required.";
    temp.stock = values.startDate != "" ? "" : "This field is required.";

    temp.categoryId = values.categoryId != 0 ? "" : "This field is required.";
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

        formData.append("Point", values.point);
        formData.append("Stock", values.stock);

        formData.append("CategoryProductId", values.categoryId);
        if (imageFile) {
          formData.append("Image", imageFile);
        }

        try {
          const response = await createAPIEndpoint(ENDPIONTS.Product).create(
            formData
          );

          setNotify({ isOpen: true, message: "New Product is created." });
          resetForm();
        } catch (err) {
          setNotify({
            isOpen: true,
            message: "New Product is created failed.",
          });
        }
      } else {
        const formData = new FormData();
        formData.append("Name", values.name);
        formData.append("Description", values.description);

        formData.append("Point", values.point);
        formData.append("Stock", values.stock);

        formData.append("CategoryProductId", values.categoryId);
        if (imageFile) {
          formData.append("Image", imageFile);
        }

        try {
          const response = await createAPIEndpoint(ENDPIONTS.Product).update(
            values.id,
            formData
          );

          setNotify({ isOpen: true, message: "Product is updated." });
          resetForm();
        } catch (err) {
          setNotify({ isOpen: true, message: "Product is updated failed." });
        }
      }
    }
  };

  const openListOfEvent = () => {
    setProductVisible(true);
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
              label="Point"
              name="point"
              value={values.point}
              onChange={handleInputChange}
              error={errors.point}
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
              label="Stock"
              type="stock"
              name="stock"
              value={values.stock}
              onChange={handleInputChange}
              error={errors.stock}
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
              label="Category Product"
              name="categoryId"
              value={values.categoryId}
              onChange={handleInputChange}
              options={categoryList}
              error={errors.categoryId}
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
              onClick={openListOfEvent}
              startIcon={<ReorderIcon />}
            >
              Product
            </Button>
          </Grid>
        </Grid>
      </Form>
      {/* <Grid item xs={12}>
        <SearchArtifact {...{ setArtifactId, resetFormControls, setNotify }} />
      </Grid> */}
      <Popup
        title="List of Product"
        openPopup={productVisible}
        setOpenPopup={setProductVisible}
      >
        <ProductList
          {...{
            setProductId,
            resetFormControls,
            setNotify,
            setProductVisible,
          }}
        />
      </Popup>

      <Notification {...{ notify, setNotify }} />
    </>
  );
}

export default ProductForm;

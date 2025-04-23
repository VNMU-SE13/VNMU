import React, { useState } from "react";

export function useForm(getModel) {
  const [values, setValues] = useState(getModel());
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleMultiSelectChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value, // Giá trị tự động là mảng nếu multiple được bật
    });
  };

  const resetFormControls = () => {
    setValues(getModel());
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
    handleMultiSelectChange,
  };
}

import React from "react";
import { styled } from "@mui/material/styles";

const FormStyled = styled("form")(({ theme }) => ({
  "& .MuiFormControl-root": {
    width: "90%",
    margin: theme.spacing(2),
  },
}));

export default function Form(props) {
  const { children, ...other } = props;

  return (
    <FormStyled noValidate autoComplete="off" {...other}>
      {children}
    </FormStyled>
  );
}

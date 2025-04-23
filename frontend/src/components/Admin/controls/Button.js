import React from "react";
import { Button as MuiButton } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(MuiButton)(({ theme }) => ({
  margin: theme.spacing(1),
  textTransform: "none",
}));

export default function Button(props) {
  const {
    children,
    color = "inherit",
    variant = "contained",
    onClick,
    className,
    ...other
  } = props;

  return (
    <StyledButton
      className={className}
      variant={variant}
      color={color}
      onClick={onClick}
      {...other}
    >
      {children}
    </StyledButton>
  );
}

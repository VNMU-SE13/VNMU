import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { styled } from "@mui/system";

const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  top: theme.spacing(9),
  "& .MuiAlert-root": {
    backgroundColor: "#f3b33d",
    color: "#000",
  },
  "& .MuiAlert-icon": {
    color: "#000",
  },
}));

export default function Notification({ notify, setNotify }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;

    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <StyledSnackbar
      autoHideDuration={3000}
      open={notify.isOpen}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="warning">
        {notify.message}
      </Alert>
    </StyledSnackbar>
  );
}

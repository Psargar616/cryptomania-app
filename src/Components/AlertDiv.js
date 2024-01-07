import React from "react";
import { CryptoState } from "../CryptoContext";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";

const AlertDiv = () => {
  const { alert, setAlert } = CryptoState();

  const handleCloseAlert = () => {
    // if (reason === "clickaway") {
    //   return;
    // }
    setAlert({ open: false });
  };

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleCloseAlert}
    >
      <Alert
        onClose={handleCloseAlert}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default AlertDiv;

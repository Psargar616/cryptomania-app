import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { CryptoState } from "../../CryptoContext";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../config/firebaseConfig";
import { auth } from "../../firebase";

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAlert } = CryptoState();

  const handleSubmit = () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill required fields",
        type: "error",
      });
      return;
    }

    // Your web app's Firebase configuration
    // const firebaseConfig = {
    //   apiKey: "AIzaSyCC1kU5a4remkJo8-E6Zg_XY5SLad9dJVY",
    //   authDomain: "cryptomania-a3d0a.firebaseapp.com",
    //   projectId: "cryptomania-a3d0a",
    //   storageBucket: "cryptomania-a3d0a.appspot.com",
    //   messagingSenderId: "881347200319",
    //   appId: "1:881347200319:web:58acb680b6c01b8824ff8a",
    // };

    // Initialize Firebase
    // const app = initializeApp(firebaseConfig);

    // const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...

        setAlert({
          open: true,
          message: `login success for`,
          type: "success",
        });

        handleClose();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        style={{ backgroundColor: "#EEBC1D" }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;

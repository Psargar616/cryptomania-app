import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { AppBar } from "@mui/material";
import Login from "./Login";
import SignUp from "./SignUp";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { CryptoState } from "../../CryptoContext";

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);
  const { setAlert } = CryptoState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${result.user.email}`,
          type: "success",
        });

        handleClose();
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{
          width: 100,
          height: 50,
          fontSize: 16,
          backgroundColor: "#EEBC1D",
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <div
            style={{
              width: "400px",
              margin: "auto",
              backgroundColor: "black",
              border: "1px",
              borderColor: "whitesmoke",
              borderRadius: 10,
            }}
          >
            <AppBar
              position="static"
              style={{
                backgroundColor: "black",
                color: "white",
                width: 400,
                margin: "auto",
                marginTop: "20%",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{ borderRadius: 10 }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
              {value === 0 && <Login handleClose={handleClose}></Login>}
              {value === 1 && <SignUp handleClose={handleClose}></SignUp>}
              <Box
                style={{
                  padding: 24,
                  paddingTop: 0,
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  gap: 20,
                  fontSize: 20,
                  color: "white",
                }}
              >
                <span>OR</span>
                <GoogleButton
                  style={{ width: "100%", outline: "none", cursor: "pointer" , zIndex:100 }}
                  onClick={signInWithGoogle}
                />
              </Box>
              
            </AppBar>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

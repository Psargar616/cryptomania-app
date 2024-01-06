import React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CryptoState } from "../CryptoContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
  },
});

const Header = () => {
  const navigate = useNavigate();
  const { Currency, setCurrency } = CryptoState();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              sx={{
                flex: 1,
                fontWeight: 600,
                curser: "pointer",
                color: "gold",
                textTransform: "uppercase",
                fontSize: 30,
              }}
              onClick={() => navigate("/")}
            >
              CryptoMania
            </Typography>

            {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Currency</InputLabel>
              <Select
                label="Currency"
                style={{ width: 100, height: 40, marginLeft: 15 }}
                variant="outlined"
                value={Currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
              </Select>
            </FormControl> */}
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel >Currency</InputLabel>
              <Select
              
                variant="outlined"
                value={Currency}
                label="Curency"
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
              </Select>
             
            </FormControl>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;

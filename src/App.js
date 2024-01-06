import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import CoinsPage from "./Pages/CoinsPage";
import { styled } from "@mui/material";
// import CryptoContextProvider from "./CryptoContext";

const AppDiv = styled("div")({
  backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
})

function App() {
 

  return (
    <BrowserRouter>
    
        <AppDiv className="app">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/coins/:id" element={<CoinsPage />}></Route>
          </Routes>
        </AppDiv>
    
    </BrowserRouter>
  );
}

export default App;

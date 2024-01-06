import React from "react";

import { styled } from "@mui/system";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import Carousal from "./Carousal";

// const imageURL = "https://cdn.pixabay.com/photo/2023/05/20/20/39/european-roller-8007340__340.jpg";
const Background = styled("div")({
 
  width: "100%",
  height: 400,
  backgroundImage: `url(./banner2.jpg)`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  zIndex: 0,
});

const BannerContent = styled("div")({
  height: 400,
  display: "flex",
  flexDirection: "column",
  paddingTop: 25,
  justifyContent: "space-around",
  zIndex: 10,
});

const Tagline = styled('div')({
  height:"40%",
  display:"flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign:"center"

  
})

const Banner = () => {
  return (
    <div className="">
      <Background>
        <Container>
          <BannerContent>
            <Tagline>
              <Typography
                variant="h2"
                style={{
                  fontWeight: "bold",
                  marginBottom: 15,
                  fontFamily: "Monteserrat",
                }}
              >
                Crypto Finder
              </Typography>

              <Typography
                variant="subtitle2"
                style={{
                  color: "darkgrey",
                  textTransform: "capitalize",
                  fontFamily: "Monteserrat",
                }}
              >
                Get all the Info regarding your favorite Crypto Currency
              </Typography>
            </Tagline>

            <Carousal/>

          </BannerContent>
        </Container>
      </Background>
    </div>
  );
};

export default Banner;

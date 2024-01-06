import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import AliceCarousel from "react-alice-carousel";
import { CryptoState } from "../../CryptoContext";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import axios from "axios";
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const carousalDiv = styled("div")({
  height: "50%",
  display: "flex",
  textAlign: "center",
});

const carouselItems = styled("li")({
 
  display: "flex",
  flexDirection: "column",
 
  cursor: "pointer",
  textTransform: "uppercase",
  color: "white",
  justifyContent: "center" ,
  textAlign:"center",
  alignContent:"center"
});

const Carousal = () => {
    
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();
  // const axios = require("axios");
  // const fetchTrendingCoins = async () => {
  //   // fetch(
  //   //   `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
  //   // )

  //   try {
  //     const response = await fetch(
  //       `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
  //     );
  //     if (!response.ok) {
  //       // If the API responds meaningful error message,
  //       // then you can get it by calling response.statusText
  //       console.log("Sorry something went wrong");
  //     }
  //     const data = await response.json();
  //     setTrending(data);
  //   } catch (error) {
  //     // It is always recommended to define the error messages
  //     // in the client side rather than simply relying on the server messages,
  //     // since server messages might not make sense to end user most of the time.
  //     console.log(error.message);
  //   }
  // };
  console.log(trending);

  useEffect(() => {
    // try {
    //   fetchTrendingCoins();
    //    // eslint-disable-next-line react-hooks/exhaustive-deps
    // } catch (error) {
    //   console.log("error while fetching data : ", error);
    // }

      fetchTrendingCoins()
   
  }, [currency]);

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
 
    setTrending(data);
  };

  
  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link to={`/coins/${coin.id}`}>
        <carouselItems>
          <img
            src={coin?.image}
            alt={coin.name}
            height="100"
            width={100}
            style={{ marginBottom: 15}}
          />

          <div >
            {coin?.symbol}
            &nbsp;
            <span
              style={{
                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                fontWeight: 500,
              }}
            >
              {profit && "+"}
              {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </div>
          <div style={{ fontSize: 22, fontWeight: 500 }}>
            {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
          </div>
        </carouselItems>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <carousalDiv>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        items={items}
        disableButtonsControls
        autoPlay
      />
    </carousalDiv>
  );
};

export default Carousal;

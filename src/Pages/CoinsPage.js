import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import styled from "@emotion/styled";
import CoinInfo from "../Components/CoinInfo";
import { Button, Typography, createTheme } from "@mui/material";
import { LinearProgress } from "@mui/material";
import { collection, addDoc, deleteDoc } from "firebase/firestore";

// import ReactHtmlParser, {
//   processNodes,
//   convertNodeToElement,
//   htmlparser2,
// } from "react-html-parser";
import parse from "html-react-parser";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol, user, watchlist, setWatchlist, setAlert } =
    CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  const ContainerDiv = styled("div")({
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  });

  const SideBar = styled("div")({
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  });

  const MarketData = styled("div")({
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  });

  const addToWatchList = async () => {
    // const coinRef = doc(db, "watchlist", user.uid);

    try {
      // await setDoc(coinRef, {
      //   coins:watchlist ? [...watchlist, coin.id] : [coin.id],
      // })

      const coinRef = await addDoc(collection(db, "watchlist"), {
        coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
      });
      console.log("Document written with ID: ", coinRef.id);
      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist !`,
        type: "success",
      });
      return true;
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  // const removeFromWatchlist = async () => {
  //   const coinRef = addDoc(db, "watchlist");
  //   try {
  //     await addDoc(
  //       coinRef,
  //       { coins: watchlist.filter((wish) => wish !== coin?.id) },
  //       { merge: true }
  //     );

  //     setAlert({
  //       open: true,
  //       message: `${coin.name} Removed from the Watchlist !`,
  //       type: "success",
  //     });
  //   } catch (error) {
  //     setAlert({
  //       open: true,
  //       message: error.message,
  //       type: "error",
  //     });
  //   }
  // };

  const removeFromWatchlist = async () => {
    try {
      await deleteDoc(doc(db, "watchlist", "coin?.id"));
      // { merge: true }
      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const inWatchlist = watchlist.includes(coin?.id);
  // until coin is not loaded show linearprogress
  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <ContainerDiv>
      <SideBar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h3"
          style={{
            fontFamily: "Montserrat",
            marginBottom: "20",
            fontWeight: "bold",
          }}
        >
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          style={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: 25,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: "justify",
          }}
        >
          {parse(`${coin?.description.en.split(". ")[0]}`)}.
        </Typography>

        {/* market data */}
        <MarketData>
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                marginBottom: 20,
                fontFamily: "Montserrat",
              }}
            >
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                marginBottom: 20,
                fontFamily: "Montserrat",
              }}
            >
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                marginBottom: 20,
                fontFamily: "Montserrat",
              }}
            >
              {" "}
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
          

          {user && (
            <Button
              variant="outlined"
              style={{
                width: "100%",
                height: 40,
                color: "black",
                font: "bold",
                backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",
              }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchList}
            >
              {inWatchlist ? "Remove to Watchlist" : "Add to Watchlist"}
            </Button>
          )}
        </MarketData>
      </SideBar>
      <CoinInfo coin={coin}></CoinInfo>
    </ContainerDiv>
  );
};

export default CoinsPage;

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "./config/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./config/firebaseConfig";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const [watchlist, setWatchlist] = useState([]);

  // const fetchDataFromDb = async () => {
  //   const coinRef = await getDocs(collection(db, "watchlist"));
  //   var data = [];
  //   coinRef.forEach((coin) => {
  //     if (coin.exists()) {
  //       // console.log(coin.data().coins);
  //       setWatchlist(...watchlist, coin.data().coins);
  //     } else {
  //       console.log("No Items in Watchlist");
  //     }
  //   });
  // };
  var data = [];
  useEffect(() => {
    const fetchDataFromDb = async () => {
      if (user) {
        const coinRef = await getDocs(collection(db, "watchlist"));
      
      // const unsubscribe = 
      coinRef.forEach((coin) => {
          if (coin.exists()) {
            console.log("coin data",coin.data().coins);
          //  setWatchlist(coin.data().coins);
       
          data.push(coin.data().coins)
           
           
          } else {
            console.log("No Items in Watchlist");
          }
        });
      
        // return () => {
        //   unsubscribe();
        // };
      }
    };

    fetchDataFromDb()
    setWatchlist([...data])
  }, [user]);

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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        coins,
        loading,
        fetchCoins,
        alert,
        setAlert,
        user,
        watchlist,
        setWatchlist,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};

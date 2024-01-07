import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { CryptoState } from "../../CryptoContext";
import { Avatar } from "@mui/material";
// import styled from "@emotion/styled";
import { styled } from "@mui/system";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import { AiFillDelete } from "react-icons/ai";
import { deleteDoc, doc } from "firebase/firestore";

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const { user, setAlert, coins, symbol,watchlist } = CryptoState();

 
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    ></Box>
  );

 
  const coin = styled("div")({
    padding: 10,
    borderRadius: 5,
    color: "black",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EEBC1D",
    boxShadow: "0 0 3px black",
  });

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successfull !",
    });

    toggleDrawer();
  };

  const removeFromWatchlist = async ({coin}) => {
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

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 42,
              width: 42,
              marginLeft: 15,
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          ></Avatar>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {/* container */}
            <div
              style={{
                width: "350px",
                padding: 25,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                fontFamily: "monospace",
              }}
            >
              {/* profile */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                  height: "92%",
                }}
              >
                <Avatar
                  onClick={toggleDrawer(anchor, true)}
                  style={{
                    height: 200,
                    width: 200,
                    marginLeft: 15,
                    cursor: "pointer",
                    backgroundColor: "#EEBC1D",
                  }}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                ></Avatar>

                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                {/* watchlist */}

                <div
                  style={{
                    flex: 1,
                    width: "100%",
                    backgroundColor: "grey",
                    borderRadius: 10,
                    padding: 15,
                    paddingTop: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                    overflowY: "scroll",
                  }}
                >
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    Watchlist
                  </span>
                  {coins.map((coin) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <div
                          style={{
                            padding: 10,
                            borderRadius: 5,
                            color: "black",
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "#EEBC1D",
                            boxShadow: "0 0 3px black",
                          }}
                        >
                          <span>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}{" "}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <AiFillDelete
                              style={{ cursor: "pointer" }}
                              fontSize="16"
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </div>
                      );
                    else return <></>;
                  })}
                </div>
              </div>

              <Button
                variant="contained"
                style={{
                  height: "8%",
                  width: "100%",
                  backgroundColor: "#EEBC1D",
                  marginTop: 20,
                  cursor: "pointer",
                }}
                onClick={logOut}
              >
                Log Out
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import useInterval from "../hooks/use-interval.hook";

import { GameContext } from "./GameContext";
import items from "./data";

function App(props) {
  const {
    numCookies,
    purchasedItems,
    setNumCookies,
    calculateCookiesPerSecond,
  } = React.useContext(GameContext);
  const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);

  const secondsAway = Math.floor(
    (new Date().getTime() - JSON.parse(window.localStorage.getItem("time"))) /
      1000
  );

  React.useEffect(() => {
    setNumCookies(numCookies + numOfGeneratedCookies * secondsAway);
    // eslint-disable-next-line
  }, []);

  useInterval(() => {
    window.localStorage.setItem("num-cookies", JSON.stringify(numCookies));
    window.localStorage.setItem("items", JSON.stringify(purchasedItems));
    window.localStorage.setItem("time", JSON.stringify(new Date().getTime()));
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game items={items} />
        </Route>
      </Router>
    </>
  );
}

export default App;

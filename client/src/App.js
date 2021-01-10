import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Shop from "./components/pages/shop";
import LotteryThailand from "./components/pages/LotteryThailand";
import Game from "./components/pages/Game";
import SignUp from "./components/pages/SignUp";
import Consulting from "./components/pages/Consulting";
import Profile from "./components/pages/Profile";
import Sign_in from "./components/pages/Sign_in";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/lottery" component={LotteryThailand} />
        <Route path="/game" component={Game} />
        <Route path="/log-in" component={Sign_in} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/consulting" component={Consulting} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;

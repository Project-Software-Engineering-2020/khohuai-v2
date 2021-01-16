import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/pages/Home";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Shop from "./components/pages/shop";
import LotteryThailand from "./components/pages/LotteryThailand";
import Game from "./components/pages/Game";
import SignUp from "./components/pages/SignUp";
import Consulting from "./components/pages/Consulting";
import Profile from "./components/pages/Profile";
import Sign_in from "./components/pages/Sign_in";
import LotteryDetail from "./components/pages/LottoDetail"; 
import Error404 from './Error/Error404'
//redux 
import { Provider } from 'react-redux';
// import { createStore } from 'redux';
import store from './store/store';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/shop" component={Shop} />
          <Route path="/lottery" component={LotteryThailand} />
          <Route path="/game" component={Game} />
          <Route path="/login" component={Sign_in} />
          <Route path="/signup" component={SignUp} />
          <Route path="/consulting" component={Consulting} />
          <Route path="/product" component={ LotteryDetail } />
          <Route path="/me" component={Profile} />
          <Route component={Error404} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

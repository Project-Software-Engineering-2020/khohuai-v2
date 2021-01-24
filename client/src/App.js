import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//page
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Shop from "./components/pages/shop";
import LotteryThailand from "./components/pages/LotteryThailand";
import Game from "./components/pages/Game";
import SignUp from "./components/pages/SignUp";
import Consulting from "./components/pages/Consulting";
import Profile from "./components/pages/Profile";
import Sign_in from "./components/pages/Sign_in";
import LotteryDetail from "./components/pages/LottoDetail"; 
import UploadLottery from './components/pages/insertLottery'
import Error404 from './Error/Error404'
import UpdatePassword from './components/pages/Updatepassword';
import ForgotPassword from './components/pages/Forgotpassword'; 

//redux 
import { Provider } from 'react-redux';
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
          <Route path="/product/:id" component={ LotteryDetail } />
          <Route path="/me" component={Profile} />
          <Route path="/upload" component={UploadLottery} />
          <Route path="/updatepassword" component={UpdatePassword} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route component={Error404} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

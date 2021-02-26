import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route,useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'
import { createBrowserHistory } from 'history'
import PrivateRoute from './util/ProtectedRoute';
import AdminRoute from './util/AdminRoute';

//page
import Navbar from "./components/navbar/Navbar";
// import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Shop from "./components/shop/shop";
import LotteryThailand from "./components/lotterythai/LotteryThailand";
import Game from "./components/game/Game";
import SignUp from "./components/signup/SignUp";
import Profile from "./components/profile/Profile";
import Sign_in from "./components/signin/Sign_in";
import LotteryDetail from "./components/shop/LottoDetail";
import UploadLottery from "./components/insert/insertLottery";
import Error404 from "./components/error/Error404";
import UpdatePassword from "./components/recover/Updatepassword";
import ForgotPassword from "./components/recover/Forgotpassword";
import Basket from "./components/cart/CartTest";
import Sidebar from "./components/admin/Sidebar";
import CartTest from "./components/cart/CartTest";
// import Overview from './components/pages/Overview';
import LotteryReports from "./components/pages/LotteryReports";
import Invoice from "./components/pages/Invoice";
import AdUser from "./components/pages/AdUser";

import NavberAdmin from './components/chon/NavbarAdmin';
import Dashboard from './components/chon/Dashboard';
import USer from './components/chon/User';

function App() {

  let history = createBrowserHistory();

  const auth = useSelector(state => state.auth);

  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/lottery" component={LotteryThailand} />
        <Route path="/game" component={Game} />
        <Route path="/login" component={Sign_in} />
        <Route path="/signup" component={SignUp} />
        {/* <Route component={Error404} /> */}
        <PrivateRoute path="/product/:id" component={LotteryDetail} />
        <PrivateRoute path="/me" component={Profile} />
        <PrivateRoute path="/upload" component={UploadLottery} />
        <PrivateRoute path="/updatepassword" component={UpdatePassword} />
        <PrivateRoute path="/forgotpassword" component={ForgotPassword} />
        <PrivateRoute path='/LotteryReports' exact component={LotteryReports} />
        <PrivateRoute path='/Invoice' exact component={Invoice} />
        <PrivateRoute path='/AdUser' exact component={AdUser} />
        <PrivateRoute path="/game" component={Game} />
        <PrivateRoute path="/cart" component={Basket} />
        </Switch>
    </Router>
  );
}

export default App;

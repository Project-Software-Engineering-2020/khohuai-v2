import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import PrivateRoute from "./util/ProtectedRoute";

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
import Basket from "./components/pages/basket";
import Sidebar from "./components/admin/Sidebar";
import CartTest from "./components/cart/CartTest";
import Purchase from './components/purchase/Purchase';
import Reward from './components/reward/Reward';
import RewardDetail from './components/reward/RewardDetail'
import LotteryReports from "./components/pages/LotteryReports";
import Invoice from "./components/pages/Invoice";
import AdUser from "./components/pages/AdUser";
import PurchaseDetail from "./components/purchase/PurchaseDetail";
import SweetAlert from 'react-bootstrap-sweetalert';
import { closeAlert } from './redux/action/alertAction';
import { removeItemInCart } from "./redux/action/cartAction";
import { Fragment } from "react";

function App() {

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const alert = useSelector(state => state.alert)

  return (

    <Fragment>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/shop" component={Shop} />
          <Route path="/lottery" component={LotteryThailand} />
          {/* <Route path="/game" component={Game} /> */}
          <Route path="/login" component={Sign_in} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute path="/product/:id" component={LotteryDetail} />
          <PrivateRoute path="/me" component={Profile} />
          <PrivateRoute path="/upload" component={UploadLottery} />
          <PrivateRoute path="/updatepassword" component={UpdatePassword} />
          <PrivateRoute path="/forgotpassword" component={ForgotPassword} />
          <PrivateRoute
            path="/LotteryReports"
            exact
            component={LotteryReports}
          />
          <PrivateRoute path="/Invoice" exact component={Invoice} />
          <PrivateRoute path="/AdUser" exact component={AdUser} />
          <PrivateRoute path="/game" component={Game} />
          <PrivateRoute path="/cart" component={CartTest} />
          <PrivateRoute path="/purchase" exact={true} component={Purchase} />
          <PrivateRoute path="/purchase/:id" component={PurchaseDetail} />
          <Route path="/reward" exact={true} component={Reward} />
          <Route path="/reward/detail/:id" component={RewardDetail} />
        </Switch>


      </Router>

      <SweetAlert
        show={alert.open}
        title={alert.title}
        text={alert.text}
        onConfirm={e => dispatch(closeAlert())}
        type={alert.types}
        timeout={alert.time}
        showConfirm={alert.showCloseButton}
        showCancel={alert.CancelButton}
        hideOverlay={alert.overlay}
        onCancel={e => dispatch(closeAlert())}
      >
      </SweetAlert>

    </Fragment>
  );
}

export default App;

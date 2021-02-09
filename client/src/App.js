import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from './ProtectedRoute';

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
import UploadLottery from './components/insert/insertLottery'
import Error404 from './components/error/Error404'
import UpdatePassword from './components/recover/Updatepassword';
import ForgotPassword from './components/recover/Forgotpassword';
import Basket from './components/pages/basket';
import Sidebar from './components/admin/Sidebar';
import Overview from './components/pages/Overview';
import LotteryReports from './components/pages/LotteryReports';
import Invoice from './components/pages/Invoice';
import AdUser from './components/pages/AdUser';
//redux 
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persister } from './redux/store';


function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/shop" component={Shop} />
            <Route path="/lottery" component={LotteryThailand} />
            {/* <Route path="/game" component={Game} /> */}
            <Route path="/login" component={Sign_in} />
            <Route path="/signup" component={SignUp} />
            <Route path="/product/:id" component={LotteryDetail} />
            <Route path="/me" component={Profile} />
            <Route path="/upload" component={UploadLottery} />
            <Route path="/updatepassword" component={UpdatePassword} />
            <Route path="/forgotpassword" component={ForgotPassword} />
            {/* <Route component={Error404} /> */}

            <Route path='/dashbord' exact component={Overview} />
            <Route path='/LotteryReports' exact component={LotteryReports} />
            <Route path='/Invoice' exact component={Invoice} />
            <Route path='/AdUser' exact component={AdUser} />

            <PrivateRoute path="/game" component={Game} />
            <PrivateRoute path="/cart" component={Basket} />
          </Switch>

        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;

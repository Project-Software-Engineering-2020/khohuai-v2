import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from 'react-bootstrap'
import PrivateRoute from "./util/ProtectedRoute";

//page
import Navbar from "./components/navbar/Navbar";
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
import { Fragment } from "react";
import UpdateProfile from "./components/profile/UpdateProfile";
import jwtDecode from 'jwt-decode';
import { setauthenticate, setlogout } from "./redux/action/authAction";
import tutorial from './images/tutorial.jpg';
import Axios from 'axios';
import { api } from './environment';
import { uiddecoded } from './util/decodeUID'

function App() {

  const dispatch = useDispatch();
  const alert = useSelector(state => state.alert)
  const token = useSelector((state) => state.token);

  const [show, setShow] = useState(false);
  const handleClose = async () => {
    await Axios.get(api + '/user/currentuser/' + uiddecoded(token))
      .then((res) => {
        dispatch({ type: "SET_TOKEN", data: res.data })
        setShow(false)
      })

  };


  useEffect(() => {
    if (token) {
      const { exp, photoURL, displayName, new_user } = jwtDecode(token);
      if (exp * 1000 < Date.now()) {
        dispatch(setlogout());
      } else {
        if (new_user === true) {
          setShow(true);
        }
        dispatch(setauthenticate(photoURL, displayName));
      }
    }

  }, [token])

  return (

    <Fragment>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/shop" component={Shop} />
          <Route path="/lottery" component={LotteryThailand} />
          <Route path="/login" component={Sign_in} />
          <Route path="/signup" component={SignUp} />
          <Route path="/updatepassword" component={UpdatePassword} />
          <Route path="/forgotpassword" component={ForgotPassword} />

          <PrivateRoute path="/product/:id" component={LotteryDetail} />
          <PrivateRoute path="/me/:complete" component={Profile} />
          <PrivateRoute path="/upload" component={UploadLottery} />
          <PrivateRoute path="/LotteryReports" exact component={LotteryReports} />
          <PrivateRoute path="/Invoice" exact component={Invoice} />
          <PrivateRoute path="/AdUser" exact component={AdUser} />
          <PrivateRoute path="/game" component={Game} />
          <PrivateRoute path="/cart" component={CartTest} />
          <PrivateRoute path="/purchase" exact={true} component={Purchase} />
          <PrivateRoute path="/purchase/:id" component={PurchaseDetail} />
          <PrivateRoute path="/reward" exact={true} component={Reward} />
          <PrivateRoute path="/reward/detail/:id" component={RewardDetail} />
          <PrivateRoute path="/updateprofile" component={UpdateProfile} />
        </Switch>
      </Router>

      {/* tutorial */}
      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5>วิธีการใช้งาน</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={tutorial} className="w-100"></img>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            ฉันเข้าใจแล้ว
          </Button>
        </Modal.Footer>
      </Modal>

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

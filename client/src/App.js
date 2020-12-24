import React from 'react';
import { BrowserRouter, Link, NavLink, Route, Switch } from 'react-router-dom';
import logo from './khohuai.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// ***Component***
import Home from './Home/Homepage';
import Error404 from './Error/Error404';
import RegisterPage from './User/RegisterForm';
import LoginPage from './User/LoginForm';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-navbar">
          <div className="container">
            <Link to="/"><img src={logo} className="logo-web" alt="logo"></img></Link>
            <ul className="navbar-nav mr-auto">

              <li className="nav-item"><NavLink className="nav-link" to="/" exact={true} activeClassName="active-menu-navbar">หน้าแรก</NavLink></li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item"><NavLink className="nav-link" to="/login" activeClassName="active-menu-navbar navbar-right">ลงชื่อเข้าใช้</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/register" activeClassName="active-menu-navbar navbar-right">สมัครสมาชิก</NavLink></li>
            </ul>
          </div>
        </nav>


        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route component={Error404} />
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;


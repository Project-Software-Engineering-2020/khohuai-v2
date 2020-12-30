import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Find from './components/pages/Find';
import Lottoresult from './components/pages/Lottoresult';
import Game from './components/pages/Game';
import SignUp from './components/pages/SignUp';
import Consulting from './components/pages/Consulting';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/find' component={Find} />
        <Route path='/lottoresult' component={Lottoresult} />
        <Route path='/game' component={Game} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/consulting' component={Consulting} />
      </Switch>
    </Router>
  );
}

export default App;


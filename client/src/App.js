import React, { Component } from 'react';
import Login from './components/Login/login';
import SignUp from './components/SignUp/signUp';
import Home from './components/Home/home';
import Header from './components/shared/header';
import HOC from './HOC/auth';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

class App extends Component {
  render() {
    const newHome = HOC(Home);
    return (
      <Router>
        <div className="h-100">
          <Route exact path="/" component={Login} />
          <Route exact path="/signUp" component={SignUp} />
          <Route exact path="/home" component={Header} />
          <Route exact path="/home" component={newHome} />
        </div>
      </Router>
    );
  }
}

export default App;

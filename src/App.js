import React, { Component } from "react";
import logo from "./logo.svg";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// import components
import RegistrationForm from "./components/RegistrationForm";
import Welcome from "./components/Welcome";
import NavBar from "./components/Navigation/NavBar";

import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <NavBar />
        <Switch>
          <Route path="/welcome" component={Welcome} />

          <Route path="/(login|signup)" component={RegistrationForm} />
          <Redirect to="/welcome" />
        </Switch>
      </div>
    );
  }
}

export default App;

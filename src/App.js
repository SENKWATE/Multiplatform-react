import React, { Component } from "react";
import logo from "./logo.svg";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/category";
import * as actionProfile from "./store/actions/profile";
// import compoimport * as actionCreators from "../store/actions/category";nents
import RegistrationForm from "./components/RegistrationForm";
import Welcome from "./components/Welcome";
import NavBar from "./components/Navigation/NavBar";
import Types from "./components/Types";
import ItemDetail from "./components/ItemDetail";
import Footer from "./components/Footer";

import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <div className="content-wrapper" style={{ backgroundColor: "#1E1E1E" }}>
        <NavBar />
        <Switch>
          <Route path="/items/:itemID" component={ItemDetail} />
          <Route path="/types/:type" component={Types} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/(login|signup)" component={RegistrationForm} />
          <Redirect to="/welcome" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  fetchItems: () => dispatch(actionCreators.fetchItems()),
  getProfile: userID => dispatch(actionProfile.fetchProfileDetail(userID))
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);

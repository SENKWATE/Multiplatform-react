import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";

import * as actionCreators from "../../store/actions/authentication";
import * as actionProfile from "../../store/actions/profile";

import Popup from "../Popup";

class AuthButton extends Component {
  constructor() {
    super();
    this.state = {
      showPopup: false
    };
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  render() {
    const user = this.props.user;
    let buttons, buttons2;
    console.log(this.state.showPopup);

    if (user) {
      buttons = (
        <li className="nav-item">
          <span className="nav-link">
            <Link
              to="/welcome"
              className="nav-link"
              onClick={this.props.logout}
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout {user.username}
            </Link>
          </span>
        </li>
      );
      buttons2 = (
        <li className="nav-item dropdown navbar-brand" style={{ width: 100 }}>
          <span
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{ fontSize: 20 }}
          >
            <FontAwesomeIcon icon={faUserCircle} /> {user.username}
          </span>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link
              to="#"
              className="dropdown-item"
              onClick={this.togglePopup.bind(this)}
            >
              View Profile
            </Link>
            <div class="dropdown-divider" />
            <Link
              to="/welcome"
              className="dropdown-item"
              onClick={this.props.logout}
            >
              Logout
            </Link>
          </div>
        </li>
      );
    } else {
      buttons2 = [
        <li key="loginButton" className="nav-item">
          <Link to="/login" className="nav-link" style={{ fontSize: 18 }}>
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </Link>
        </li>,
        <li key="signupButton" className="nav-item">
          <Link to="/signup" className="nav-link" style={{ fontSize: 18 }}>
            <FontAwesomeIcon icon={faUserPlus} /> Signup
          </Link>
        </li>
      ];
    }

    return (
      <ul className="navbar-nav ml-auto">
        {/* <span className="navbar-text">{user.username}</span> */}
        {/*buttons*/}
        {buttons2}
        {this.state.showPopup ? (
          <Popup closePopup={this.togglePopup.bind(this)} />
        ) : null}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actionCreators.logout()),
  getProfile: userID => dispatch(actionProfile.fetchProfileDetail(userID))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthButton);

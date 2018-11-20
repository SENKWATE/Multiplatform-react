import React, { Component } from "react";
import { Link } from "react-router-dom";

// Components
import AuthButton from "./AuthButton";

class NavBar extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
        id="mainNav"
      >
        <Link className="navbar-brand" to="/welcome">
          Home
        </Link>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <AuthButton />
        </div>
      </nav>
    );
  }
}

export default NavBar;

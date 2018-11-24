import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// Components
import AuthButton from "./AuthButton";
import SideNav from "./SideNav";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Category"
    };
  }

  categoryName(typeName) {
    this.setState({ name: typeName });
  }
  render() {
    let category = this.props.category.map(type => (
      <Link
        className="dropdown-item"
        to={`/types/${type.id}`}
        key={type.name}
        type={type}
        onClick={() => this.categoryName(type.name)}
      >
        {type.name}
      </Link>
    ));

    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
        id="mainNav"
        style={{ height: 70 }}
      >
        <Link
          className="navbar-brand"
          to="/welcome"
          style={{ width: 50 }}
          onClick={() => this.categoryName("Category")}
        >
          Home
        </Link>
        <li className="nav-item dropdown navbar-brand">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{ color: "white" }}
          >
            {this.state.name}
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            {category}
          </div>
        </li>
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
          <SideNav />
          <AuthButton />
        </div>
      </nav>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user,
  category: state.category.items
});
export default connect(mapStateToProps)(NavBar);

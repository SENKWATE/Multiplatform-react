import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/authentication";

class Welcome extends Component {
  render() {
    let category = this.props.category.map(name => name.name);
    let types = this.props.category.map(name =>
      name.item_types.map(a => a.name)
    );

    console.log("category:");
    console.log(category);
    console.log("types:");
    console.log(types);

    return (
      <header className="masthead d-flex" style={{ marginRight: 300 }}>
        <div className="container text-center my-auto z-1">
          <h1 className="mb-1 title">WELCOME TO CHATR</h1>

          {this.props.user ? null : (
            <div>
              <h3 className="mb-5" style={{ marginTop: 100 }}>
                <em className="description" style={{ fontSize: 40 }}>
                  What are you waiting for...??? Sign-in or signup to join with
                  your friends
                </em>
              </h3>
              <div style={{ marginBottom: 40 }}>
                <Link to="/login" className="btn btn-primary btn-lg">
                  Login
                </Link>
                <Link
                  style={{ marginLeft: 10 }}
                  to="/signup"
                  className="btn btn-primary btn-lg"
                >
                  Signup
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="overlay z-0" />
      </header>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  category: state.category.items
});

const mapDispatchToProps = dispatch => ({
  // checkToken: () => dispatch(actionCreators.checkForExpiredToken())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/authentication";

class Welcome extends Component {
  // componentDidMount() {
  //    this.props.checkToken();
  //  }

  render() {
    return (
      <header className="masthead d-flex ">
        <div className="container text-center my-auto z-1">
          <h1 className="mb-1 title">WELCOME TO CHATR</h1>
          <h3 className="mb-5">
            <p className="description" style={{ marginTop: 40 }}>
              In this application, you can share, with your friends, all the
              activites that you like with all over people around the world. In
              addition, you can create a channel that you and other people like
              to share common ideas.
            </p>
          </h3>
          {this.props.user ? null : (
            <div>
              <h3 className="mb-5">
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
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  // checkToken: () => dispatch(actionCreators.checkForExpiredToken())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);

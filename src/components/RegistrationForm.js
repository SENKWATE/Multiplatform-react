import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/authentication";
import * as actionErrors from "../store/actions/errors";

class RegistationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      first_name: "",
      last_name: ""
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentWillUnmount() {
    this.props.resetForm();
  }

  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitHandler(e, type) {
    e.preventDefault();
    if (this.props.match.url.substring(1) === "login") {
      this.props.login(
        { username: this.state.username, password: this.state.password },
        this.props.history
      );
    } else {
      this.props.signup(this.state, this.props.history);
    }
  }

  render() {
    const type = this.props.match.url.substring(1);
    const { username, password } = this.state;
    const errors = this.props.errors;

    if (this.props.user) {
      return <Redirect to="/" />;
    }
    return (
      <div className="card col-6 mx-auto p-0 mt-5">
        <div className="card-body">
          <h5 className="card-title mb-4">
            {type === "login"
              ? "Login to send messages"
              : "Register an account"}
          </h5>
          {errors.non_field_errors && (
            <div className="alert alert-danger" role="alert">
              {errors.non_field_errors}
            </div>
          )}
          <form onSubmit={this.submitHandler}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Username"
                name="username"
                required
                onChange={this.changeHandler}
              />
            </div>
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                name="password"
                required
                onChange={this.changeHandler}
              />
            </div>
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
            {type !== "login" && (
              <div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="e-mail address"
                    name="email"
                    required
                    onChange={this.changeHandler}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="First name...."
                    name="first_name"
                    required
                    onChange={this.changeHandler}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Last name...."
                    name="last_name"
                    required
                    onChange={this.changeHandler}
                  />
                </div>
              </div>
            )}

            <input
              className="btn btn-primary"
              type="submit"
              value={type.replace(/^\w/, c => c.toUpperCase())}
            />
          </form>
        </div>
        <div className="card-footer">
          <Link
            to={type === "login" ? "/signup" : "/login"}
            className="btn btn-small btn-link"
            // onClick={() => (authStore.errors = [])}
          >
            {type === "login"
              ? "register an account"
              : "login with an existing account"}
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors
});
const mapDispatchToProps = dispatch => {
  return {
    signup: (userData, history) =>
      dispatch(actionCreators.signup(userData, history)),
    login: (userData, history) =>
      dispatch(actionCreators.login(userData, history)),

    resetForm: () => dispatch(actionErrors.setErrors({}))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistationForm);

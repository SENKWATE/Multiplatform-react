import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as actionCreators from "../store/actions/index";
import { connect } from "react-redux";

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: ""
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitHandler(event) {
    event.preventDefault();
    this.props.postChannel(this.state);
    this.setState({ name: "", first_name: "", last_name: "", email: "" });
  }

  componentWillUnmount() {
    this.setState({ name: "", first_name: "", last_name: "", email: "" });
  }
  render() {
    return (
      <div className="card col-6 mx-auto p-0 mt-5">
        <div className="card-body">
          <h5 className="card-title mb-4">Edit Profile</h5>
          <form onSubmit={this.submitHandler} noValidate>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="first name...."
                name="first_name"
                value={this.state.first_name}
                onChange={this.changeHandler}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="last name...."
                name="last_name"
                required
                value={this.state.last_name}
                onChange={this.changeHandler}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="last name...."
                name="last_name"
                required
                value={this.state.last_name}
                onChange={this.changeHandler}
              />
            </div>
            <input className="btn btn-light" type="submit" value="Edit" />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm);

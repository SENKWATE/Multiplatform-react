import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/profile";

class Popup extends React.Component {
  componentDidMount() {
    this.props.getProfile(this.props.user.user_id);
  }

  render() {
    let bio; // = (
    //   <p style={{ marginLeft: 100 }}>Bio: {this.props.profile.profile.bio}</p>
    // );

    console.log(this.props.profile);
    //  console.log(this.props.profile.profile.bio);
    return (
      <div className="popup">
        <div
          className="popup_inner"
          style={{ borderRadius: 25, backgroundColor: "rgba(33,77,120)" }}
        >
          <h1 className="text-center profile">{`Profile`}</h1>
          <div className="Pcontent text-center">
            <p style={{ marginTop: 30 }}>
              username: {this.props.profile.username}
            </p>
            <p>
              Name: {this.props.profile.first_name}{" "}
              {this.props.profile.last_name}
            </p>
            <p>e-mail: {this.props.profile.email}</p>
            {/*this.props.profile.profile.bio ? bio : null*/}
          </div>
          <button style={{ marginLeft: 300 }} onClick={this.props.closePopup}>
            close me
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile.profile,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: userID => dispatch(actionCreators.fetchProfileDetail(userID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Popup);

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/profile";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Components
import Loading from "./Loading";

class Popup extends React.Component {
  componentDidMount() {
    this.props.getProfile(this.props.user.user_id);
  }
  render() {
    //     console.log("USER", this.propss.profile);
    // console.log("PROFILE", this.props.profile.profile.bio);
    if (this.props.loading) {
      return <Loading />;
    } else {
      let bio = <p>Bio: {this.props.profile.profile.bio}</p>;
      let location = <p>Location: {this.props.profile.profile.location}</p>;
      let birth_date = (
        <p>Birth Date: {this.props.profile.profile.birth_date}</p>
      );

      return (
        <div className="popup">
          <div
            className="popup_inner"
            style={{
              borderRadius: 25,
              backgroundColor: "rgba(33,77,120)",
              overflowY: "auto"
            }}
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
              {this.props.profile.profile.bio ? bio : null}
              {this.props.profile.profile.location ? location : null}
              {this.props.profile.profile.birth_date ? birth_date : null}
              <span className="nav-link-text mr-2 col-md-2 col-md-offset-3">
                <FontAwesomeIcon
                  icon={faWindowClose}
                  onClick={this.props.closePopup}
                  style={{ fontSize: 40, color: "red" }}
                />
              </span>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile.profile,
    loading: state.profile.loading,
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

import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/authentication";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlusCircle,
  faBoxOpen,
  faGavel
} from "@fortawesome/free-solid-svg-icons";

// Components
// import ChannelNavLink from "./ChannelNavLink";

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };
  }

  // componentDidMount() {
  //   this.props.fetchChannels();
  // }

  render() {
    // const channelLinks = this.props.channels.map(channel => (
    //   <ChannelNavLink key={channel.name} channel={channel} />
    // ));

    return (
      <div>
        {this.props.user ? (
          <div>
            <ul
              className="navbar-nav navbar-sidenav"
              id="exampleAccordion"
              style={{
                backgroundColor: "#6663BD"
              }}
            >
              <li
                className="nav-item"
                data-toggle="tooltip"
                data-placement="right"
              >
                <div
                  className="nav-link heading text-center"
                  style={{ color: "white" }}
                >
                  <FontAwesomeIcon icon={faGavel} style={{ fontSize: 25 }} />
                  <span className="nav-link-text mr-2"> My Auctions</span>
                </div>
              </li>

              <div className="card" style={{ marginLeft: 5, width: 220 }}>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">iPhoneX {`<TIME>`} </li>
                  <li className="list-group-item">MAC {`<TIME>`} </li>
                  <li className="list-group-item">MSI PC {`<TIME>`} </li>
                </ul>
              </div>

              {/*this.props.channel*/}
            </ul>
            <ul className="navbar-nav sidenav-toggler">
              <li className="nav-item">
                <span
                  className="nav-link text-center"
                  id="sidenavToggler"
                  style={{ backgroundColor: "#3E39C3" }}
                  onClick={() =>
                    this.setState(prevState => ({
                      collapsed: !prevState.collapsed
                    }))
                  }
                >
                  <FontAwesomeIcon
                    icon={this.state.collapsed ? faAngleLeft : faAngleRight}
                  />
                </span>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user
  // channels: state.auth.channels
});

const mapDispatchToProps = dispatch => {
  return {
    // fetchChannels: () => dispatch(actionCreators.fetchChannels())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SideNav)
);

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

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };
  }
  sortItemsById(biddingsHistory) {
    biddingsHistory.sort((a, b) => {
      return a.item.id - b.item.id;
    });
  }

  takeTheLastBid(myBiddings, biddingsHistory) {
    let count = 0;
    for (let i in biddingsHistory) {
      if (myBiddings.length === 0) {
        myBiddings.push(biddingsHistory[i]);
      } else {
        for (let j in myBiddings) {
          if (
            biddingsHistory[i].item.id === myBiddings[j].item.id &&
            biddingsHistory[i].item.highest_bid > myBiddings[j].item.highest_bid
          ) {
            myBiddings[j] = biddingsHistory[i];
          } else {
            for (let z in myBiddings) {
              if (biddingsHistory[i].item.id === myBiddings[z].item.id) {
                count = count + 1;
              }
            }
            if (count === 0) {
              myBiddings.push(biddingsHistory[i]);
            } else {
              for (let w in myBiddings) {
                if (biddingsHistory[i].item.id === myBiddings[w].item.id) {
                  myBiddings[w] = biddingsHistory[i];
                }
              }
            }
            count = 0;
          }
        }
      }
    }
  }

  render() {
    let biddingsHistory = this.props.profile.biddings;
    let myBiddings = [];
    if (biddingsHistory && biddingsHistory.length) {
      biddingsHistory.sort((a, b) => {
        return a.item.id - b.item.id;
      });
      this.takeTheLastBid(myBiddings, biddingsHistory);
    }

    console.log("MYBiddings: ", myBiddings);

    let rows = myBiddings.map(
      row => (
        console.log(row),
        (
          <li className="list-group-item">
            <Link to={`/items/${row.item.id}/`}>{row.item.name}</Link>
          </li>
        )
      )
    );
    return (
      <div>
        {this.props.user ? (
          <div>
            <ul
              className="navbar-nav navbar-sidenav"
              id="exampleAccordion"
              style={{
                backgroundColor: "#545454"
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
                <ul className="list-group list-group-flush">{rows}</ul>
              </div>

              {/*this.props.channel*/}
            </ul>
            <ul className="navbar-nav sidenav-toggler">
              <li className="nav-item">
                <span
                  className="nav-link text-center"
                  id="sidenavToggler"
                  style={{ backgroundColor: "#393939" }}
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
  user: state.auth.user,
  profile: state.profile.profile
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

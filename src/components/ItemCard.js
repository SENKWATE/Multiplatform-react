import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import * as actionCreators from "../store/actions/profile";
import { connect } from "react-redux";
import moment from "moment";

class ItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 0
    };
  }
  getDate(date) {
    if (date) {
      date = date.slice(0, 10);
      return date;
    }
  }
  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ timer: this.timer + 1 }),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getRemainingTime(dateTime, name) {
    const deadline = moment(dateTime);
    const today = moment(new Date());
    const difference = deadline.diff(today);

    if (difference <= 0) return "Finished";
    else {
      const duration = moment.duration(difference);
      const units = ["years", "months", "days", "hours", "minutes", "seconds"];

      return units.reduce((timeRemaining, unit) => {
        if (duration[unit]() > 0) {
          return timeRemaining + `${duration[unit]()} ${unit} ${","}`;
        }
        return timeRemaining;
      }, "");
    }
  }

  render() {
    const item = this.props.item;
    console.log(item);
    return (
      <div className="mb-2">
        <Link
          to={`/items/${item.id}/`}
          className="card"
          style={{
            width: 340,
            height: 360,
            marginRight: 10,
            backgroundColor: "black"
          }}
        >
          <div className="image">
            <img
              className="card-img-top img-fluid"
              src={item.logo}
              alt={item.name}
              style={{ height: 230 }}
            />
          </div>
          <div className="card-body">
            <h4 className="card-title text-center" style={{ color: "white" }}>
              <span>{item.name}</span>
              <div style={{ fontSize: 16 }}>
                {item.biddings && item.biddings.length ? (
                  <div>Bidding price: {item.highest_bid} K.D by</div>
                ) : (
                  <div>Initial Price: {item.starting_price} K.D</div>
                )}
              </div>
              <div style={{ fontSize: 15 }}>
                {" "}
                Time remaining: {this.getRemainingTime(item.end_date)}{" "}
                <div>End Date: {this.getDate(item.end_date)}</div>
              </div>
            </h4>
          </div>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: userID => dispatch(actionCreators.fetchProfileDetail(userID))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ItemCard)
);

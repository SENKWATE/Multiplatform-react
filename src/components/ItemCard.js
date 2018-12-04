import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import * as actionCreators from "../store/actions/profile";
import { connect } from "react-redux";

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

  getRemainingTime(dateTime) {
    let date = new Date();
    let current_year = date.getFullYear(),
      current_month = date.getMonth() + 1,
      current_day = date.getDate(),
      current_hour = date.getHours(),
      current_min = date.getMinutes(),
      current_sec = date.getSeconds();

    if (dateTime) {
      let year = parseInt(dateTime.slice(0, 4), 10);
      let month = parseInt(dateTime.slice(5, 7), 10);
      let day = parseInt(dateTime.slice(8, 10), 10);
      let hour = parseInt(dateTime.slice(11, 13), 10);
      let min = parseInt(dateTime.slice(14, 16), 10);

      let year_difference = year - current_year;
      let month_difference = month - current_month;
      let day_difference = day - current_day;
      let hour_difference = 23 - current_hour;
      let min_difference = 60 - current_min;
      let sec_difference = 60 - current_sec;

      if (year_difference > 0) {
        return (
          year_difference +
          " years, " +
          month_difference +
          " months, " +
          "and " +
          day_difference +
          " days."
        );
      } else {
        if (month_difference > 1) {
          return (
            month_difference + " months " + "and " + day_difference + " days."
          );
        } else {
          if (month_difference === 1) {
            return day_difference + " days.";
          } else {
            if (day_difference > 1) {
              return (
                day_difference +
                " days, " +
                hour_difference +
                "h ,and " +
                min_difference +
                "min."
              );
            } else {
              if (day_difference === 1) {
                return hour_difference + "h ,and " + min_difference + "min.";
              } else {
                if (hour - current_hour > 1) {
                  return (
                    hour -
                    current_hour +
                    "h," +
                    min_difference +
                    "min, and " +
                    sec_difference +
                    "sec"
                  );
                } else {
                  if (hour - current_hour === 1) {
                    return (
                      min_difference + "min, and " + sec_difference + "sec"
                    );
                  } else {
                    if (min - current_min > 1) {
                      return (
                        min -
                        current_min -
                        1 +
                        "min and " +
                        sec_difference +
                        "sec"
                      );
                    } else {
                      // show seconds only
                      if (min - current_min === 1) {
                        return sec_difference + "sec";
                      } else {
                        if (this.state.z === 0) {
                          this.setState({ bidding: false });
                        }
                        this.state.z = this.state.z + 1;
                        return "The bidding is finished";
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
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
            height: 340,
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
                Top bidding: {item.highest_bid} K.D
              </div>
              <p style={{ fontSize: 15 }}>
                {" "}
                Time remaining: {this.getRemainingTime(item.end_date)}{" "}
                <div>End Date: {this.getDate(item.end_date)}</div>
              </p>
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

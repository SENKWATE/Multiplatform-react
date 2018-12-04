import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/category";
import { Link } from "react-router-dom";
// Components
import Loading from "./Loading";
import BiddingForm from "./BiddingForm";

class ItemDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 5,
      bidding: true,
      z: 0
    };
  }

  componentDidMount() {
    //  if (this.state.time > 0) {
    this.interval = setInterval(() => this.getItem(), 1000);
    //  }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.itemID !== this.props.match.params.itemID) {
      this.getItem();
    }
    // if (this.state.time === 0) {
    //   clearInterval(this.interval);
    // }
  }

  getItem() {
    const itemID = this.props.match.params.itemID;
    this.props.fetchItemDetail(itemID);
  }

  getDate(date) {
    if (date) {
      date = date.slice(0, 10);
      return date;
    }
  }

  getTime(time) {
    if (time) {
      time = time.slice(11, 16);
      return time;
    }
  }

  getRemainingTime(dateTime, name) {
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

      console.log("YEAR: ", year_difference);
      console.log("MONTH: ", month_difference);
      console.log("DAY: ", day_difference);
      // if (year_difference < 0) {
      //   year_difference = year_difference * -1;
      // }
      // if (month_difference < 0) {
      //   month_difference = month_difference * -1;
      // }
      // if (day_difference < 0) {
      //   day_difference = day_difference * -1;
      // }
      // if (hour_difference < 0) {
      //   hour_difference = hour_difference * -1;
      // }
      // if (min_difference < 0) {
      //   min_difference = min_difference * -1;
      // }

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
                if (hour - current_hour > 1 && day_difference === 0) {
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
                  if (hour - current_hour === 1 && day_difference === 0) {
                    return (
                      min_difference + "min, and " + sec_difference + "sec"
                    );
                  } else {
                    if (min - current_min > 1 && day_difference === 0) {
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
                      if (min - current_min === 1 && day_difference === 0) {
                        return sec_difference + "sec";
                      } else {
                        if (this.state.z === 0) {
                          this.setState({ bidding: false });
                        }
                        this.state.z = this.state.z + 1;
                        return name + " won the auction.";
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
    const item = this.props.itemDetail;
    let amount = item.starting_price;
    let name;
    let price = item.starting_price;
    let bidder;
    let x = parseInt(item.starting_price, 10);

    if (item.biddings && item.biddings.length) {
      bidder = item.biddings.map(
        a => (parseInt(price, 10) < parseInt(a.amount, 10) ? a : bidder)
      );
      console.log("BIDDER:", bidder);
      amount = bidder.map(
        a => (x < a.amount ? ((x = a.amount), (name = a.user)) : (x = x))
      );
      //name = bidder.map(a => a.user.username);
    }

    // console.log("X:", x);
    // console.log("Name:", name);

    return (
      <div className="card mb-3">
        <h5
          className="card-title text-center itemdetail"
          style={{ marginTop: 100, fontSize: 50 }}
        >
          {item.name} {/*this.state.time*/}
        </h5>
        <img
          style={{ width: 700, marginLeft: 300, borderRadius: 10 }}
          className="card-img-top"
          src={item.logo}
          alt="Card image cap"
        />
        <div className="card-body itemdetail">
          <h1 className="text-center">
            {item.biddings && item.biddings.length ? (
              <p>
                Bidding price: {item.highest_bid} K.D by {name}
              </p>
            ) : (
              <p>Initial Price: {item.starting_price} K.D</p>
            )}
          </h1>

          <div className="card-text text-center" style={{ fontSize: 30 }}>
            <small className="text-muted">
              End date: {this.getDate(item.end_date)}
            </small>
            <div className="text-muted">
              <small>
                End time in Kuwait City (in 24h): {this.getTime(item.end_date)}
              </small>
            </div>
            <div className="text-muted">
              <small>
                Remaining time left:{" "}
                {this.getRemainingTime(item.end_date, name)}
              </small>
            </div>
          </div>
          <div className="card-text text-center">
            <h3>Description:</h3>{" "}
            <div style={{ fontSize: 20 }}>{item.description}</div>
          </div>
        </div>
        {this.props.user ? (
          this.state.bidding ? (
            <BiddingForm item={item} amount={x} />
          ) : null
        ) : (
          <small className="text-center">
            <Link to="/login" style={{ color: "red", fontSize: 18 }}>
              {" "}
              Signin or sign up to start bidding on this item
            </Link>
          </small>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    itemDetail: state.category.item,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchItemDetail: itemID => dispatch(actionCreators.fetchItemDetail(itemID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetail);

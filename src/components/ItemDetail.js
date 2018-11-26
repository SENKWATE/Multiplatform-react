import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/category";

// Components
import Loading from "./Loading";

class ItemDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 5
    };
  }

  componentDidMount() {
    this.getItem();
    //  if (this.state.time > 0) {
    this.interval = setInterval(
      () => this.setState({ time: this.state.time - 1 }),
      1000
    );
    //  }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.itemID !== this.props.match.params.itemID) {
      this.getItem();
    }
    //  if (this.state.time === 0) {
    //  clearInterval(this.interval);
    //  }
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

  getRemainingTime(dateTime) {
    let date = new Date();
    let current_year = date.getFullYear(),
      current_month = date.getMonth() + 1,
      current_day = date.getDate(),
      current_hour = date.getHours(),
      current_min = date.getMinutes();
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

      console.log(hour_difference);

      if (year_difference < 0) {
        year_difference = year_difference * -1;
      }
      if (month_difference < 0) {
        month_difference = month_difference * -1;
      }
      if (day_difference < 0) {
        day_difference = day_difference * -1;
      }
      if (hour_difference < 0) {
        hour_difference = hour_difference * -1;
      }
      if (min_difference < 0) {
        min_difference = min_difference * -1;
      }

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
        if (month_difference > 0) {
          return (
            month_difference + " months " + "and " + day_difference + " days."
          );
        } else {
          if (day_difference > 0) {
            return (
              day_difference +
              " days, " +
              hour_difference +
              "h ,and " +
              min_difference +
              "min."
            );
          } else {
            if (hour - current_hour) {
              return hour - current_hour + "h and " + min_difference + "min.";
            } else {
              if (min - current_min > 0) {
                return min - current_min + "min.";
              } else {
                // show seconds only
                return "The bidding is finished";
              }
            }
          }
        }
      }
    }
  }

  render() {
    const item = this.props.itemDetail;

    return (
      <div className="card mb-3">
        <h5
          className="card-title text-center"
          style={{ marginTop: 100, fontSize: 50 }}
        >
          {item.name} {/*this.state.time*/}
        </h5>
        <img
          style={{ width: 600, marginLeft: 350 }}
          className="card-img-top"
          src={item.logo}
          alt="Card image cap"
        />
        <div className="card-body">
          <p className="card-text">
            <h3>Description:</h3> <div>{item.description}</div>
          </p>
          <p className="card-text">
            <small className="text-muted">
              End date: {this.getDate(item.end_date)}
            </small>
            <div>
              <small className="text-muted">
                End time in Kuwait City (in 24h): {this.getTime(item.end_date)}
              </small>
            </div>
            <div>
              <small className="text-muted">
                Remanining time left: {this.getRemainingTime(item.end_date)}
              </small>
            </div>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    itemDetail: state.category.item
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

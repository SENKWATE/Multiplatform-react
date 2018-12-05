import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/category";
import { Link } from "react-router-dom";
// Components
import Loading from "./Loading";
import BiddingForm from "./BiddingForm";
import moment from "moment";

class ItemDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 5,
      bidding: true
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
      // console.log("BIDDER:", bidder);
      amount = bidder.map(
        a =>
          x < parseInt(a.amount, 10)
            ? ((x = a.amount), (name = a.user))
            : (x = x)
      );
      //name = bidder.map(a => a.user.username);
    }
    // console.log(x);
    let bidding = this.getRemainingTime(item.end_date) !== "Finished";
    console.log(bidding);

    if (this.props.loading) {
      return <Loading />;
    } else {
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
                  End time in Kuwait City (in 24h):{" "}
                  {this.getTime(item.end_date)}
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
            bidding ? (
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
}

const mapStateToProps = state => {
  return {
    itemDetail: state.category.item,
    user: state.auth.user,
    loading: state.category.loading
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

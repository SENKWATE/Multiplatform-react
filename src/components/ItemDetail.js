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
    if (this.state.time > 0) {
      this.interval = setInterval(
        () => this.setState({ time: this.state.time - 1 }),
        1000
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.itemID !== this.props.match.params.itemID) {
      this.getItem();
    }
    if (this.state.time === 0) {
      clearInterval(this.interval);
    }
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

  render() {
    const item = this.props.itemDetail;
    // console.log("ITEMID", item);

    return (
      <div className="card mb-3">
        <h5
          className="card-title text-center"
          style={{ marginTop: 100, fontSize: 50 }}
        >
          {item.name} {this.state.time}
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

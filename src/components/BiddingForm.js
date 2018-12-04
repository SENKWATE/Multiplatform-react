import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

// Actions
import * as actionCreators from "../store/actions/category";

class BiddingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      user: this.props.user.username
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onTextChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.postBiddings(this.props.item.id, this.state);
    this.setState({ amount: "" });
  }

  render() {
    let amount = parseInt(this.props.amount, 10) + 1;

    return (
      <div className="col-6 mx-auto p-0 mt-5">
        <form onSubmit={this.onSubmit}>
          <input
            style={{ width: 550 }}
            type="number"
            name="amount"
            placeholder="add bid"
            min={amount}
            onChange={this.onTextChange}
          />

          <input
            style={{ width: 550 }}
            className="btn btn-secondary"
            type="submit"
            value="BID"
          />
        </form>
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
    postBiddings: (id, newBidding) =>
      dispatch(actionCreators.postBiddings(id, newBidding))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BiddingForm);

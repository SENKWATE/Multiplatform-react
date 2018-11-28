import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
// Actions

class BiddingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onTextChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    alert("button is pressed");

    //this.setState({ message: "" });
    // this.props.postBook(this.state, this.props.authorID);
  }

  render() {
    let amount = 0;
    if (this.props.item.biddings) {
      amount = this.props.item.biddings.map(a => a.amount);
      amount = parseInt(amount, 10) + 1;
    }

    return (
      <div className="col-6 mx-auto p-0 mt-5">
        <form onSubmit={this.onSubmit}>
          <input
            style={{ width: 550 }}
            type="number"
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
    // channel: state.auth.channel
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // postMessage: (id, newChannel) =>
    //   dispatch(actionCreators.postMessage(id, newChannel))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BiddingForm);

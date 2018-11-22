import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/category";

class Category extends Component {
  render() {
    let items = this.props.items;
    return (
      <div className="jumbotron">
        <div>{items}</div>
        <h1>ASS</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.category.items
});

const mapDispatchToProps = dispatch => ({
  fetchItems: () => dispatch(actionCreators.fetchItems())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/category";

class Types extends Component {
  render() {
    const typeID = this.props.match.params.type;

    const type = this.props.items.filter(obj => obj.id.toString() === typeID);
    const name = type.map(content => content.name);
    // const itemTypes = type.map(content => content.item_types);
    let products = type.map(content =>
      content.item_types.map(a => (
        <button className="dropdown-item" type="button">
          {a.name}
        </button>
      ))
    );

    // console.log("item_type:");
    // console.log(itemTypes);
    // console.log("Current:");
    // console.log(type);
    // console.log("names:");
    // console.log(products);

    return (
      
        <h1>{name}</h1>

        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Types
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            {products}
          </div>
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
)(Types);

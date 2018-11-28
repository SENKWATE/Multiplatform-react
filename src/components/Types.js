import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/category";

// Components
import ItemCard from "./ItemCard";

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

    // let itemcards = this.props.category.map(category =>
    //   category.item_types.map(itemType =>
    //     itemType.items.map(item => <ItemCard key={item.name} item={item} />)
    //   )
    // );

    let containers = type.map(content =>
      content.item_types.map(container => (
        <div
          className="container ::-webkit-scrollbar ::-webkit-scrollbar-track ::-webkit-scrollbar-thumb ::-webkit-scrollbar-thumb:hover"
          style={{ height: 500, overflow: "auto", marginTop: 40 }}
        >
          <h1 className="text-center typeshape" id={container.name}>
            <strong>{container.name}</strong>
          </h1>
          <div
            className="jumbotron"
            style={{ height: 400, backgroundColor: "#D9D8F9" }}
          >
            <div className="row">
              {container.items.map(item => (
                <ItemCard key={item.name} item={item} />
              ))}{" "}
            </div>
          </div>
        </div>
      ))
    );

    let links = type.map(content =>
      content.item_types.map(container => (
        <li className="list-group-item">
          <a href={`#${container.name}`}>{container.name}</a>
        </li>
      ))
    );
    // console.log("item_type:");
    // console.log(itemTypes);
    // console.log("Current:");
    console.log("Current", type);
    // console.log("names:");
    // console.log(products);

    return (
      <div>
        <h1
          className="text-center typeTitle"
          style={{ marginTop: 50, fontSize: 60 }}
        >
          {name}
        </h1>

        <div className="container text-center col-md-2 col-md-offset-3">
          <div className="card " style={{ width: 220, borderRadius: 8 }}>
            <div className="card-header">Jump to</div>
            <ul className="list-group list-group-flush">{links}</ul>
          </div>
        </div>

        {containers}
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

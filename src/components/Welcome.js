import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/authentication";
import Types from "./Types";
import Popup from "./Popup";

class Welcome extends Component {
  render() {
    let category = this.props.category.map(
      type => (
        console.log(type),
        (
          <li class="list-group-item">
            {" "}
            <Link
              className="dropdown-item"
              to={`/types/${type.id}`}
              key={type.name}
              type={type}
            >
              {type.name}
            </Link>
          </li>
        )
      )
    );

    let items = this.props.category.map(category =>
      category.item_types.map(itemType =>
        itemType.items.map(item => (
          <div className="card" style={{ width: 200 }}>
            <img
              className="card-img-top"
              src={item.logo}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">{item.description}</p>
              <a href="#" className="btn btn-primary">
                See Detail
              </a>
            </div>
          </div>
        ))
      )
    );

    console.log("items:");
    console.log(items);
    // let types = this.props.category.map(name =>
    //   name.item_types.map(a => (
    //     <button className="dropdown-item" type="button">
    //       {a.name}
    //     </button>
    //   ))
    // );

    // console.log("category:");
    // console.log(category);
    // console.log("types:");
    // console.log(types);

    return (
      <div
        className=""
        style={{ width: 300, marginTop: 100, borderRadius: 25 }}
      >
        {/*<div
          className="card text-center"
          style={{ width: 200, borderRadius: 25, marginLeft: 10 }}
        >
          <div className="card-header">Categories</div>
          <ul className="list-group list-group-flush">{category}</ul>
        </div>*/}
        {items}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  category: state.category.items
});

const mapDispatchToProps = dispatch => ({
  // checkToken: () => dispatch(actionCreators.checkForExpiredToken())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);

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
        <div
          className="card text-center"
          style={{ width: 200, borderRadius: 25, marginLeft: 10 }}
        >
          <div className="card-header">Categories</div>
          <ul className="list-group list-group-flush">{category}</ul>
        </div>

        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Category
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            {category}
          </div>
        </div>
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

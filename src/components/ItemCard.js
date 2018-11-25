import React, { Component } from "react";
import { Link } from "react-router-dom";

class ItemCard extends Component {
  render() {
    const item = this.props.item;
    return (
      <div className="mb-2">
        <Link
          to="/welcome"
          className="card"
          style={{
            width: 340,
            height: 300,
            marginRight: 10,
            backgroundColor: "black"
          }}
        >
          <div className="image">
            <img
              className="card-img-top img-fluid"
              src={item.logo}
              alt={item.name}
              style={{ height: 200 }}
            />
          </div>
          <div className="card-body">
            <h5 className="card-title text-center" style={{ color: "white" }}>
              <span>{item.name}</span>
            </h5>
          </div>
        </Link>
      </div>
    );
  }
}

export default ItemCard;

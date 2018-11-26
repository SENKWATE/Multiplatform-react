import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";

class ItemCard extends Component {
  getDate(date) {
    if (date) {
      date = date.slice(0, 10);
      return date;
    }
  }

  render() {
    const item = this.props.item;

    return (
      <div className="mb-2">
        <Link
          to={`/items/${item.id}/`}
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
              style={{ height: 230 }}
            />
          </div>
          <div className="card-body">
            <h5 className="card-title text-center" style={{ color: "white" }}>
              <span>{item.name}</span>
              <div style={{ fontSize: 15 }}>
                {" "}
                End Date: {this.getDate(item.end_date)}
              </div>
            </h5>
          </div>
        </Link>
      </div>
    );
  }
}

export default withRouter(ItemCard);

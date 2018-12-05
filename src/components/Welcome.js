import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/category";
import Types from "./Types";
import Popup from "./Popup";
import ItemCard from "./ItemCard";
import SearchBar from "./SearchBar";

class Welcome extends Component {
  componentDidMount() {
    this.interval = setInterval(() => this.props.fetchItems(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let category = this.props.category.map(
      type => (
        console.log(type),
        (
          <li className="list-group-item">
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
          <div className="card" style={{ width: 200, marginLeft: 30 }}>
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

    // let itemcards = this.props.category.map(category =>
    //   category.item_types.map(itemType =>
    //     itemType.items.map(
    //       item => (
    //         console.log("card1", item), <ItemCard key={item.name} item={item} />
    //       )
    //     )
    //   )
    // );

    let itemcards = this.props.filterItems.map(item =>
      item.map(a =>
        a.map(
          b => (console.log("card2", b), <ItemCard key={b.name} item={b} />)
        )
      )
    );

    console.log("items:");
    console.log(items);
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);

    // let types = this.props.category.map(name =>
    //   name.item_types.map(a => (
    //     <button className="dropdown-item" type="button">
    //       {a.name}
    //     </button>
    //   ))
    // );

    let categories = this.props.category.map(
      cat => (
        console.log(cat.logo),
        (
          <div>
            <div
              className="jumbotron catback"
              style={{
                height: 400,
                backgroundImage: `url(${cat.logo})`,
                width: 900
              }}
            />
            <div className="jumbotron catback" />
          </div>
        )
      )
    );

    let images = this.props.category.map(cat => (
      <div className="carousel-item" key={cat.name}>
        <img
          className="d-block w-100"
          src={cat.logo}
          alt={cat.name}
          style={{ height: 500 }}
        />
      </div>
    ));

    let n = 0;
    let slides = this.props.category.map(
      slide => (
        (n = n + 1),
        (
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to={`${n}`}
            key={slide.name}
          />
        )
      )
    );
    n = 0;
    let cats = this.props.category.map(cat => (
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="http://development.com/wp-content/uploads/2018/05/development.jpg"
              alt="First slide"
              style={{ height: 500 }}
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="http://development.com/wp-content/uploads/2018/05/development.jpg"
              alt="First slide"
              style={{ height: 500 }}
            />
          </div>
        </div>

        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    ));

    return (
      <div style={{ marginTop: 100 }}>
        {/*<SearchBar />*/}
        <div
          className="container ::-webkit-scrollbar ::-webkit-scrollbar-track ::-webkit-scrollbar-thumb ::-webkit-scrollbar-thumb:hover"
          style={{ height: 600, overflow: "auto" }}
        >
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
            style={{ width: 900, height: 500, marginLeft: 100 }}
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="active"
              />

              {slides}
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="d-block w-100"
                  src="https://www.alghad.com/file.php?fileid=267733&width=658&height=400"
                  alt="First slide"
                  style={{ height: 500 }}
                />
              </div>
              {images}
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        /////////////////////////////////////////////////////////////////////////////////////
        <div
          id="carouselExampleControls1"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src="http://development.com/wp-content/uploads/2018/05/development.jpg"
                alt="First slide"
                style={{ height: 500 }}
              />
            </div>
            {images}
          </div>

          <a
            className="carousel-control-prev"
            href="#carouselExampleControls1"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleControls1"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
        ///////////////////////////////////////////////////////////////////////////////////
        {/*  <div style={{ marginTop: 100 }}>{categories}</div> */}
        {cats}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  category: state.category.items,
  filterItems: state.category.filterItems
});

const mapDispatchToProps = dispatch => ({
  // checkToken: () => dispatch(actionCreators.checkForExpiredToken())
  fetchItems: () => dispatch(actionCreators.fetchItems())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);

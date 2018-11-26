import axios from "axios";
import jwt_decode from "jwt-decode";

import * as actionTypes from "./actionTypes";
import { setErrors } from "./errors";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/"
});

export const fetchItems = () => {
  return dispatch => {
    //This function gets called by Redux Thunk
    axios
      .get("http://127.0.0.1:8000/api/items/")
      .then(res => res.data)
      .then(items =>
        dispatch({
          type: actionTypes.FETCH_ITEMS,
          payload: items
        })
      );
  };
};

export const fetchItemDetail = itemID => {
  return dispatch => {
    instance
      .get(`items/${itemID}/`)
      .then(res => res.data)
      .then(item => {
        // console.log("CHANNEL");
        // console.log(item);
        dispatch({
          type: actionTypes.FETCH_ITEM_DETAIL,
          payload: item
        });
      })
      .catch(err => console.error(err));
  };
};

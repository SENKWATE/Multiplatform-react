import axios from "axios";
import jwt_decode from "jwt-decode";

import * as actionTypes from "./actionTypes";
import { setErrors } from "./errors";

const instance = axios.create({
  baseURL: "http://104.248.37.122/api/"
});

export const fetchItems = () => {
  return dispatch => {
    //This function gets called by Redux Thunk
    axios
      .get("http://104.248.37.122/api/items/")
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
        dispatch({
          type: actionTypes.FETCH_ITEM_DETAIL,
          payload: item
        });
      })
      .catch(err => console.error(err));
  };
};

export const postBiddings = (itemID, userBidder) => {
  return dispatch => {
    instance
      .post(`items/${itemID}/bid/`, userBidder)
      .then(res => res.data)
      .then(item => {
        dispatch({
          type: actionTypes.POST_BIDDINGS,
          payload: item
        });
      })
      .catch(err => console.error(err));
  };
};

export const filterItems = query => {
  return {
    type: actionTypes.FILTER_ITEMS,
    payload: query
  };
};

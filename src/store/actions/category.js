import axios from "axios";
import jwt_decode from "jwt-decode";

import * as actionTypes from "./actionTypes";
import { setErrors } from "./errors";

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

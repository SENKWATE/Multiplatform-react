import axios from "axios";
import jwt_decode from "jwt-decode";

import * as actionTypes from "./actionTypes";
import { setErrors } from "./errors";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/"
});

export const fetchProfileDetail = userID => {
  return dispatch => {
    instance
      .get(`profile/${userID}/`)
      .then(res => res.data)
      .then(channel => {
        dispatch({
          type: actionTypes.FETCH_PROFILE_DETAIL,
          payload: channel
        });
      })
      .catch(err => console.error(err));
  };
};

import axios from "axios";
import jwt_decode from "jwt-decode";

import * as actionTypes from "./actionTypes";
import { setErrors } from "./errors";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/"
});

const setLoading = () => ({
  type: actionTypes.SET_PROFILE_LOADING
});

export const fetchProfileDetail = userID => {
  return dispatch => {
    dispatch(setLoading());
    instance
      .get(`profile/${userID}/`)
      .then(res => res.data)
      .then(profile => {
        dispatch({
          type: actionTypes.FETCH_PROFILE_DETAIL,
          payload: profile
        });
      })
      .catch(err => console.error(err));
  };
};

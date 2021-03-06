import axios from "axios";
import jwt_decode from "jwt-decode";

import * as actionTypes from "./actionTypes";
import { setErrors } from "./errors";
import { fetchProfileDetail } from "./profile";
const setAuthToken = token => {
  if (token) {
    console.log(token);
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `jwt ${token}`;
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};

export const checkForExpiredToken = () => {
  return dispatch => {
    // Get token
    const token = localStorage.getItem("token");
    if (token) {
      const currentTime = Date.now() / 1000;
      // Decode token and get user info
      const user = jwt_decode(token);
      // Check token expiration
      if (user.exp >= currentTime) {
        // Set auth token header
        setAuthToken(token);
        // Set user
        dispatch(setCurrentUser(user));
      } else {
        dispatch(logout());
      }
    }
  };
};

export const login = (userData, history) => {
  return dispatch => {
    axios
      .post("http://104.248.37.122/api/login/", userData)
      .then(res => res.data)
      .then(user => {
        const decodedUser = jwt_decode(user.token);
        setAuthToken(user.token);
        dispatch(setCurrentUser(decodedUser));
        history.push("/");
      })
      .catch(err => {
        console.log(err.response.data);
        dispatch(setErrors(err.response.data));
      });
  };
};

export const signup = (userData, history) => {
  return dispatch => {
    axios
      .post("http://104.248.37.122/api/register/", userData)
      .then(() =>
        dispatch(
          login(
            { username: userData.username, password: userData.password },
            history
          )
        )
      )
      .then(() => history.push("/"))
      .catch(err => {
        dispatch(setErrors(err.response.data));
      });
  };
};

export const logout = () => {
  setAuthToken();
  return setCurrentUser();
};

const setCurrentUser = user => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: user
});

import { combineReducers } from "redux";

// Reducers
import authReducer from "./authentication";

export default combineReducers({
  auth: authReducer
});

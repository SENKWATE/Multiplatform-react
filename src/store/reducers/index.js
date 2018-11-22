import { combineReducers } from "redux";

// Reducers
import authReducer from "./authentication";
import errorReducer from "./errors";
import itemReducer from "./category";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  category: itemReducer
});

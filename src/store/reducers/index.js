import { combineReducers } from "redux";

// Reducers
import authReducer from "./authentication";
import errorReducer from "./errors";
import itemReducer from "./category";
import profileReducer from "./profile";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  category: itemReducer,
  profile: profileReducer
});

import * as actionTypes from "../actions/actionTypes";

const initialState = {
  profile: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROFILE_DETAIL:
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
};

export default reducer;

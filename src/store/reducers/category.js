import * as actionTypes from "../actions/actionTypes";

const initialState = {
  items: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ITEMS:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
};

export default reducer;

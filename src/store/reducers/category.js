import * as actionTypes from "../actions/actionTypes";

const initialState = {
  items: [],
  categoryNames: [],
  item: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ITEMS:
      return {
        ...state,
        items: action.payload,
        categoryNames: action.payload.map(name => name.name)
      };
    case actionTypes.FETCH_ITEM_DETAIL:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
};

export default reducer;

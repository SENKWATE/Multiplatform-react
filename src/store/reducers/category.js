import * as actionTypes from "../actions/actionTypes";

const initialState = {
  items: [],
  categoryNames: [],
  item: [],
  filterItems: [],
  bidders: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ITEMS:
      return {
        ...state,
        items: action.payload,
        categoryNames: action.payload.map(name => name.name),
        filterItems: action.payload.map(category =>
          category.item_types.map(itemType => itemType.items.map(item => item))
        ),
        typeItems: action.payload.map(category =>
          category.item_types.map(itemType => itemType.items.map(item => item))
        )
      };

    case actionTypes.FETCH_ITEM_DETAIL:
      return {
        ...state,
        item: action.payload
      };
    case actionTypes.POST_BIDDINGS:
      return {
        ...state,
        bidders: state.bidders.concat(action.payload)
      };
    case actionTypes.FILTER_ITEMS:
      // let type = state.items.filter(obj => obj.id.toString() === action.id);
      // console.log("TYPEDUS:", type);
      return {
        ...state,
        filterItems: state.items.map(category =>
          category.item_types.map(itemType =>
            itemType.items.filter(item => {
              return `${item.name}`
                .toLowerCase()
                .includes(action.payload.toLowerCase());
            })
          )
        )
      };
    default:
      return state;
  }
};

export default reducer;

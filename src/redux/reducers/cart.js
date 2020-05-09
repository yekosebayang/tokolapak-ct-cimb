const init_state = {
  qty: 0,
  cartChange: true
};

export default (state = init_state, action) => {
  switch (action.type) {
    case "GET_CART_DATA":
      return { 
        ...state,
        qty: action.payload
      };
      case "UPDATE_CART_TOTAL":
        return { 
          ...state,
          cartChange: action.payload
        };
    default:
      return { ...state,};
     }
};


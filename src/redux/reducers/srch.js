const init_state = {
  searchData: ""
};

export default (state = init_state, action) => {
  switch (action.type) {
    case "DATA_FOUND":
      return {
        ...state,
        searchData: action.payload
      };
    default:
      return { ...state,};
     }
};

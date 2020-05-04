import { combineReducers } from "redux";
import userReducer from "./user";
import srchReducer from "./srch";
import cartReducer from "./cart";


export default combineReducers({
  user: userReducer,
  srch: srchReducer,
  cart: cartReducer,
});

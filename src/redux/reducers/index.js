import { combineReducers } from "redux";
import userReducer from "./user";
import srchReducer from "./srch";

export default combineReducers({
  user: userReducer,
  srch: srchReducer,
});

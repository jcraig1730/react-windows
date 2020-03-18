import { combineReducers } from "redux";

import desktopReducer from "./desktop";

export default combineReducers({
  desktop: desktopReducer
});

import { combineReducers } from "redux";

import desktopReducer from "./desktop";
import windowsReducer from "./windows";

export default combineReducers({
  desktop: desktopReducer,
  windows: windowsReducer
});

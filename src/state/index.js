import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middlewares = [thunk];

const enhancers = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : null;
const composedMiddleware = compose(applyMiddleware(...middlewares), enhancers);

export default () => {
  return createStore(rootReducer, composedMiddleware);
};

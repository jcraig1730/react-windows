import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createStore from "./state";
import "regenerator-runtime";

import App from "./components/App";

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

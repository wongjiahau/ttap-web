import "./index.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { AllReducers } from "./core/redux/reducers/allReducers";
import { App } from "./core/react/app";
import { Playground } from "./core/react/playground";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";

const actionExtractor = (store) => (next) => (action) => {
  next(action.Action());
};

let store;
const isProductionBuild = false; // do not modify this line at all unless you know what you're doing, because .travis.yml will modify this line let store
if (isProductionBuild) {
  store = createStore(AllReducers, applyMiddleware(actionExtractor));
} else {
  const createLogger = require("redux-logger").createLogger;
  const logger = createLogger({
    collapsed: true,
  });
  store = createStore(AllReducers, applyMiddleware(actionExtractor, logger));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

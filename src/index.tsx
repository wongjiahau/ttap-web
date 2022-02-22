import "./index.css";
import "react-app-polyfill/stable";
import * as React from "react";
import * as ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { AllReducers } from "./ts/redux/reducers/allReducers";
import { App } from "./ts/react/app";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import init from "ttap-wasm";

// Initialize WASM modules
// Refer https://tkat0.github.io/posts/how-to-create-a-react-app-with-rust-and-wasm#call-the-wasm-function-from-the-react-app
init();

const actionExtractor = (store: any) => (next: any) => (action: any) => {
  next(action.Action());
};

let store;
const isProductionBuild = false; // do not modify this line at all unless you know what you're doing, because .travis.yml will modify this line let store
if (isProductionBuild) {
  store = createStore(AllReducers, applyMiddleware(actionExtractor as any));
} else {
  const createLogger = require("redux-logger").createLogger;
  const logger = createLogger({
    collapsed: true,
  });
  store = createStore(
    AllReducers,
    applyMiddleware(actionExtractor as any, logger)
  );
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

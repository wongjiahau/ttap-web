import React from "react";
import ReactDOM from "react-dom";
import { AllReducers } from "../core/redux/reducers/allReducers";
import { App } from "../core/react/app";
import { Provider } from "react-redux";
import { createStore } from "redux";

let store = createStore(AllReducers);

it("should renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
});

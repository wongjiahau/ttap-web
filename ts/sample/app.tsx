import * as React from "react";
import {HelloWorldContainer} from "./containers/helloWorldContainer";
import {NameEditContainer} from "./containers/nameEditContainer";

export const App = () => {
  return (
    <div>
      <HelloWorldContainer/>
      <br/>
      <NameEditContainer/>
    </div>
  );
};

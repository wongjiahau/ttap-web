import * as React from "react";

export interface IHelloWorldComponentProps {
  UserName : string;
}

export const HelloWorldComponent = (props : IHelloWorldComponentProps) => {
  return (
    <h2>Hello Mr. {props.UserName} !</h2>
  );
};

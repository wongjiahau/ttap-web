import * as React from "react";
import { TimetableCreatorContainer } from "../redux/containers/timetableCreatorContainer";

export interface IPlaygroundProps {
  id: number; // this line is just to surpress TSLint error on empty interface
}

export class Playground extends React.Component<IPlaygroundProps, {}> {
  public render() {
    return <TimetableCreatorContainer />;
  }
}

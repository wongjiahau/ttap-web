import * as React from "react";

export interface IUserProps { name: string; age: number; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export default class User extends React.Component<IUserProps, {}> {
    public render() {
        return <h1>Hello from {this.props.name} which is {this.props.age} years old</h1>;
    }
}

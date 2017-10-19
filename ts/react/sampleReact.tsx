import * as React from "react";

export interface IClassComponentProps {
    name: string;
    age: number;
}
export class ClassComponent extends React.Component < IClassComponentProps, {} > {
    public render() {
        return (
            <h1>Hello from {this.props.name}
                which is {this.props.age}
                years old</h1>
        );
    }
}

export interface IFunctionalComponentsProp {
    compiler: string;
    framework: string;
}

export const FunctionalComponent = (props: IFunctionalComponentsProp) => (
    <h1>Hello from {props.compiler}
        and {props.framework}!</h1>
);

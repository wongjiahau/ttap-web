import * as React from "react";
import {ReactNode} from "react";

const tableStyle : React.CSSProperties = {
    borderCollapse: "collapse"
};

export type Orientation = "horizontal" | "vertical";

export interface IStackPanelProps {
    orientation : Orientation;
    style?: React.CSSProperties;
}
export class StackPanel extends React.Component < IStackPanelProps, {} > {
    public render() {
        const children = this.props.children as ReactNode[];
        let childToBeRendered;
        if (this.props.orientation === "horizontal") {
            childToBeRendered = (
                <tr>
                    {children.map((x) => (
                        <td>{x}</td>
                    ))}
                </tr>
            );
        } else if (this.props.orientation === "vertical") {
            childToBeRendered = children.map((x) => (
                <tr>
                    <td>
                        {x}
                    </td>
                </tr>
            ));
        }
        return (
            <div style={this.props.style}>
                <table style={tableStyle}>
                    {childToBeRendered}
                </table>
            </div>
        );
    }
}

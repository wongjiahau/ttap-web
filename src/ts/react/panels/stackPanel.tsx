import * as React from "react";
import { ReactNode } from "react";

const tableStyle: React.CSSProperties = {
  borderCollapse: "collapse",
};

export type Orientation = "horizontal" | "vertical";
export type HorizontalAlignment = "left" | "center" | "right";

export interface IStackPanelProps {
  horizontalAlignment?: HorizontalAlignment;
  orientation: Orientation;
  style?: React.CSSProperties;
}
export class StackPanel extends React.Component<IStackPanelProps, {}> {
  public render() {
    let style = {
      ...tableStyle,
    };
    style = {
      ...this.props.style,
    };
    switch (this.props.horizontalAlignment) {
      case "center":
        style.margin = "0 auto";
        break;
      case "right":
        style.marginLeft = "auto";
        style.marginRight = "0";
        break;
      case "left":
        style.marginRight = "auto";
        style.marginLeft = "0";
        break;
    }
    const children = this.props.children as ReactNode[];
    let childToBeRendered;
    if (this.props.orientation === "horizontal") {
      childToBeRendered = (
        <tr>
          {children.map((x, index) => (
            <td key={index}>{x}</td>
          ))}
        </tr>
      );
    } else if (this.props.orientation === "vertical") {
      childToBeRendered = children.map((x, index) => (
        <tr key={index}>
          <td>
            <div style={style}>
              <table style={style}>
                <tbody>
                  <tr>
                    <td>{x}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      ));
    }
    return (
      <div style={style}>
        <table style={style}>
          <tbody>{childToBeRendered}</tbody>
        </table>
      </div>
    );
  }
}

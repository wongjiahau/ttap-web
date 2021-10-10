import * as React from "react";

const containerStyle: React.CSSProperties = {
  top: 64, // Padding to allow Appbar to function
  left: 0,
  width: "100%",
  height: "85%",
  position: "absolute",
  display: "table",
};

const childStyle: React.CSSProperties = {
  display: "table-cell",
  verticalAlign: "middle",
};

export function VerticalAlign(props: React.Props<any>) {
  return (
    <div style={containerStyle}>
      <div style={childStyle}>{props.children}</div>
    </div>
  );
}

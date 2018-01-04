import * as React from "react";

const containerStyle : React.CSSProperties = {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    display: "table"
};

const childStyle : React.CSSProperties = {
    display: "table-cell",
    verticalAlign: "middle"
};

export function VerticalAlign(props) {
    return (
        <div style={containerStyle}>
            <div style={childStyle}>
                {props.children}
            </div>
        </div>
    );
}

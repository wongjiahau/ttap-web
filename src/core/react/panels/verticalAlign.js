"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const containerStyle = {
    top: 64,
    left: 0,
    width: "100%",
    height: "85%",
    position: "absolute",
    display: "table"
};
const childStyle = {
    display: "table-cell",
    verticalAlign: "middle"
};
function VerticalAlign(props) {
    return (React.createElement("div", { style: containerStyle },
        React.createElement("div", { style: childStyle }, props.children)));
}
exports.VerticalAlign = VerticalAlign;
//# sourceMappingURL=verticalAlign.js.map
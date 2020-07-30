"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class LeftRightPanel extends React.Component {
    render() {
        const childCount = React.Children.count(this.props.children);
        if (childCount !== 2) {
            throw new Error("LeftRightPanel expected only TWO children, but you gave it " + childCount);
        }
        const children = this.props.children;
        return (React.createElement("table", { style: { width: "100%" } },
            React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("td", { style: { textAlign: "left" } }, children[0]),
                    React.createElement("td", { style: { textAlign: "right" } }, children[1])))));
    }
}
exports.LeftRightPanel = LeftRightPanel;
//# sourceMappingURL=leftRightPanel.js.map
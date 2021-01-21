"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const tableStyle = {
    borderCollapse: "collapse"
};
class StackPanel extends React.Component {
    render() {
        let style = Object.assign({}, tableStyle);
        style = Object.assign({}, this.props.style);
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
        const children = this.props.children;
        let childToBeRendered;
        if (this.props.orientation === "horizontal") {
            childToBeRendered = (React.createElement("tr", null, children.map((x, index) => (React.createElement("td", { key: index }, x)))));
        }
        else if (this.props.orientation === "vertical") {
            childToBeRendered = children.map((x, index) => (React.createElement("tr", { key: index },
                React.createElement("td", null,
                    React.createElement("div", { style: style },
                        React.createElement("table", { style: style },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null, x)))))))));
        }
        return (React.createElement("div", { style: style },
            React.createElement("table", { style: style },
                React.createElement("tbody", null, childToBeRendered))));
    }
}
exports.StackPanel = StackPanel;
//# sourceMappingURL=stackPanel.js.map
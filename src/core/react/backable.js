"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const stackPanel_1 = require("./panels/stackPanel");
class Backable extends React.Component {
    render() {
        const childCount = React.Children.count(this.props.children);
        if (childCount > 1) {
            throw new Error("Backable can only receive one child.");
        }
        return (React.createElement(stackPanel_1.StackPanel, { orientation: "vertical", horizontalAlignment: "center" },
            this.props.children,
            React.createElement("a", { href: "#", onClick: () => { window.history.back(); } }, "click here to go back")));
    }
}
exports.Backable = Backable;
//# sourceMappingURL=backable.js.map
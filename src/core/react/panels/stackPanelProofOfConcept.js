"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const stackPanel_1 = require("./stackPanel");
exports.StackPanelProofOfConcept = () => {
    return (React.createElement("div", null,
        React.createElement(stackPanel_1.StackPanel, { style: {
                margin: "5px"
            }, orientation: "horizontal" },
            React.createElement("button", null, "hello"),
            React.createElement("button", null, "bye")),
        React.createElement(stackPanel_1.StackPanel, { orientation: "vertical" },
            React.createElement("p", null, "vertical orientation"),
            React.createElement("button", null, "hello"),
            React.createElement("button", null, "bye")),
        React.createElement(stackPanel_1.StackPanel, { orientation: "horizontal", horizontalAlignment: "right" },
            React.createElement("p", null, "right aligned"),
            React.createElement("button", null, "hello"),
            React.createElement("button", null, "bye")),
        React.createElement(stackPanel_1.StackPanel, { orientation: "horizontal", horizontalAlignment: "center" },
            React.createElement("p", null, "center aligned"),
            React.createElement("button", null, "hello"),
            React.createElement("button", null, "bye")),
        React.createElement(stackPanel_1.StackPanel, { orientation: "horizontal", horizontalAlignment: "left" },
            React.createElement("p", null, "Left aligned"),
            React.createElement("button", null, "hello"),
            React.createElement("button", null, "bye"))));
};
//# sourceMappingURL=stackPanelProofOfConcept.js.map
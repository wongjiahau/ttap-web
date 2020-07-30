"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = require("@material-ui/core/Button");
const React = require("react");
const react_router_1 = require("react-router");
const parseFgoHtmlToRawSlot_1 = require("../parser/parseFgoHtmlToRawSlot");
const app_1 = require("./app");
const stackPanel_1 = require("./panels/stackPanel");
const verticalAlign_1 = require("./panels/verticalAlign");
class FgoView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }
    render() {
        if (this.state.redirect) {
            return React.createElement(react_router_1.Redirect, { push: true, to: "/play" });
        }
        return (React.createElement(verticalAlign_1.VerticalAlign, null,
            React.createElement(stackPanel_1.StackPanel, { orientation: "vertical", horizontalAlignment: "center" },
                React.createElement("textarea", { style: { height: "500px", width: "500px" }, id: "fgotextarea", placeholder: "Paste HTML here" }),
                React.createElement(Button_1.default, { color: "primary", variant: "contained", onClick: () => {
                        app_1.ToggleLoadingScreen("Parsing HTML", () => {
                            try {
                                const textarea = document.getElementById("fgotextarea");
                                this.props.handleLoadSlot(parseFgoHtmlToRawSlot_1.ParseFgoHtmlToRawSlot(textarea.value));
                                this.setState({ redirect: true });
                            }
                            catch (error) {
                                alert("Error loading data: " + error.message);
                            }
                        });
                    } }, "Load Data"))));
    }
}
exports.FgoView = FgoView;
//# sourceMappingURL=fgoView.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const PlayArrow_1 = require("@material-ui/icons/PlayArrow");
const React = require("react");
const react_router_1 = require("react-router");
const stackPanel_1 = require("./panels/stackPanel");
const verticalAlign_1 = require("./panels/verticalAlign");
const styles_1 = require("./styles");
class GetStarted extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = () => {
            this.setState({ redirect: true });
        };
        this.state = {
            redirect: false
        };
    }
    render() {
        if (this.state.redirect) {
            return React.createElement(react_router_1.Redirect, { push: true, to: "/learn" });
        }
        else {
            return (React.createElement(verticalAlign_1.VerticalAlign, null,
                React.createElement(stackPanel_1.StackPanel, { orientation: "vertical", horizontalAlignment: "center" },
                    React.createElement("img", { src: window["PUBLIC_URL"] + "/big_calendar.png" }),
                    React.createElement(core_1.Typography, { variant: "display3" }, "Welcome to TTAP!"),
                    React.createElement(core_1.Button, { variant: "contained", color: "secondary", onClick: this.handleClick },
                        React.createElement(PlayArrow_1.default, { style: styles_1.iconStyle }),
                        "Get started"))));
        }
    }
}
exports.GetStarted = GetStarted;
//# sourceMappingURL=getStarted.js.map
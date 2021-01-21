"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = require("@material-ui/core/Button");
const KeyboardArrowDown_1 = require("@material-ui/icons/KeyboardArrowDown");
const KeyboardArrowLeft_1 = require("@material-ui/icons/KeyboardArrowLeft");
const KeyboardArrowRight_1 = require("@material-ui/icons/KeyboardArrowRight");
const KeyboardArrowUp_1 = require("@material-ui/icons/KeyboardArrowUp");
const React = require("react");
class CounterView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const getButton = (handler, icon, tooltip, tooltipPosition = "up") => {
            return (
            // Refer https://kazzkiq.github.io/balloon.css/
            React.createElement("div", { "data-balloon": tooltip, "data-balloon-pos": tooltipPosition, "data-balloon-length": "xlarge" },
                React.createElement(Button_1.default, { onClick: handler, variant: "contained", style: { width: "100%" } }, icon)));
        };
        const centerButtonStyle = {
            height: "40px",
            width: "100%"
        };
        return (React.createElement("div", { style: {
                marginLeft: "5px",
                marginRight: "5px",
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 3fr 1fr 2fr',
                alignItems: 'center',
                gap: '2px',
            } },
            React.createElement("div", { className: "grid-item" }, getButton(this.props.handleClickLeft, React.createElement(KeyboardArrowLeft_1.default, null), this.props.leftTooltip, "up")),
            React.createElement("div", { className: "grid-item" }, getButton(this.props.handleClickUp, React.createElement(KeyboardArrowUp_1.default, null), this.props.upTooltip)),
            React.createElement("div", { className: "grid-item" },
                React.createElement("div", { "data-balloon": this.props.middleTooltip, "data-balloon-pos": "up" },
                    React.createElement(Button_1.default, { style: centerButtonStyle, onClick: this.props.handleClickMiddle, variant: "contained" }, `${this.props.currentIndex}(${this.props.currentSubIndex}) / ${this.props.maxIndex}`))),
            React.createElement("div", { className: "grid-item" }, getButton(this.props.handleClickDown, React.createElement(KeyboardArrowDown_1.default, null), this.props.downTooltip, "up")),
            React.createElement("div", { className: "grid-item" }, getButton(this.props.handleClickRight, React.createElement(KeyboardArrowRight_1.default, null), this.props.rightTooltip, "up"))));
    }
}
exports.CounterView = CounterView;
//# sourceMappingURL=counterView.js.map
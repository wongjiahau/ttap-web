"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const Typography_1 = require("@material-ui/core/Typography");
const Close_1 = require("@material-ui/icons/Close");
const React = require("react");
const innerDivStyle = {
    position: "relative",
    background: "white",
    height: window.innerHeight,
};
class AlgorithmVisualizerView extends React.Component {
    render() {
        const expectedHitCount = this.props.expectedHitCount();
        const percentage = (expectedHitCount / this.props.actualHitCount * 100).toFixed(2);
        return (React.createElement(core_1.Dialog, { open: this.props.open, fullScreen: true },
            React.createElement(core_1.AppBar, { style: { position: "relative" } },
                React.createElement(core_1.Toolbar, null,
                    React.createElement(Typography_1.default, { variant: "title", color: "inherit", style: { flex: 1 } }, "Algorithm Visualizer"),
                    React.createElement(core_1.IconButton, { color: "inherit", onClick: () => {
                            this.props.handleClearAnimation();
                            this.props.handleClose();
                        }, "aria-label": "Close" },
                        React.createElement(Close_1.default, null)))),
            React.createElement("div", { id: "for-algo-visualization", style: innerDivStyle }),
            React.createElement("p", { style: { marginLeft: 15, position: "absolute", left: 0, bottom: 0 } },
                "Hit rate = ",
                expectedHitCount,
                " / ",
                this.props.actualHitCount,
                " = ",
                React.createElement("b", null,
                    percentage,
                    "%"),
                React.createElement("br", null),
                "Brute force search paths = ",
                React.createElement("b", null, this.props.fullSearchPathCount),
                React.createElement("br", null),
                "Reduced search paths = ",
                this.props.fullSearchPathCount,
                " - ",
                this.props.actualHitCount,
                " = ",
                this.props.fullSearchPathCount - this.props.actualHitCount,
                " = ",
                React.createElement("b", null,
                    ((this.props.fullSearchPathCount - this.props.actualHitCount) /
                        this.props.fullSearchPathCount * 100).toFixed(2),
                    "%"),
                React.createElement("br", null),
                "Time taken = ",
                React.createElement("b", null,
                    (this.props.timeTaken / 1000).toFixed(2),
                    " seconds"))));
    }
}
exports.AlgorithmVisualizerView = AlgorithmVisualizerView;
//# sourceMappingURL=algorithmVisualizerView.js.map
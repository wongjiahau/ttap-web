"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
// @ts-ignore
const react_tippy_1 = require("react-tippy");
const stcBox_1 = require("../../model/matrix/stcBox");
const skeleton_1 = require("./skeleton");
function GenerateStateViews(states, handleSetTimeContraintAt, handleDesetTimeConstraintAt) {
    const GetStateView = (state) => {
        switch (state.Kind) {
            case stcBox_1.BoxKind.DefinitelyOccupied:
                return (React.createElement(Box, { color: stcBox_1.ColorOfDefinitelyOccupied }));
            case stcBox_1.BoxKind.DefinitelyUnoccupied:
                return (React.createElement(Box, { color: stcBox_1.ColorOfDefinitelyUnoccupied }));
            case stcBox_1.BoxKind.MaybeOccupied:
                return (React.createElement(MaybeOccupiedBox, { handleClick: () => { handleSetTimeContraintAt(state); } }));
            case stcBox_1.BoxKind.Clicked:
                return (React.createElement(ClickedBox, { handleClick: () => { handleDesetTimeConstraintAt(state); } }));
            default:
                throw Error();
        }
    };
    const child = [];
    const layouts = new Array();
    states.forEach((s) => {
        const content = GetStateView(s);
        const key = s
            .Uid
            .toString();
        child.push(React.createElement("div", { key: key }, content));
        layouts.push({
            i: key,
            x: s.X + skeleton_1.Skeleton.X_OFFSET,
            y: s.Day + skeleton_1.Skeleton.Y_OFFSET,
            h: 1,
            w: 1
        });
    });
    return { Children: child, Layouts: layouts };
}
exports.GenerateStateViews = GenerateStateViews;
const boxFrameStyle = {
    height: "49px",
    width: "100%",
    borderTop: "1px solid grey"
};
const Box = (props) => {
    const style = Object.assign({}, boxFrameStyle, { background: props.color });
    return (React.createElement("div", { style: style }));
};
const MaybeOccupiedBox = (props) => {
    const style = Object.assign({}, boxFrameStyle, { background: stcBox_1.ColorOfMaybeOccupied, cursor: "pointer" });
    const html = React.createElement("span", { style: { fontSize: "14px" } }, "Click me if you don't want to have class here");
    return (React.createElement(react_tippy_1.Tooltip, { arrow: true, position: "bottom", html: html },
        React.createElement("span", { className: "maybeOccupiedBox" },
            React.createElement("button", { onClick: props.handleClick, style: style }))));
};
const ClickedBox = (props) => {
    const style = Object.assign({}, boxFrameStyle, { background: stcBox_1.ColorOfClicked, fontWeight: "bold", fontSize: "20px", cursor: "pointer" });
    return (React.createElement("button", { onClick: props.handleClick, style: style }, "X"));
};
//# sourceMappingURL=generateStateView.js.map
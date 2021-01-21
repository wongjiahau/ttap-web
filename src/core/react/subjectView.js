"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const Checkbox_1 = require("@material-ui/core/Checkbox");
const React = require("react");
const Highlighter = require("react-highlight-words");
const clashReportStyle = {
    background: "DarkRed" /* DarkRed */,
    color: "White" /* White */,
    fontSize: "14px",
    overflowY: "hidden",
    padding: "10px",
    width: "200px"
};
class SubjectView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const divStyle = {
            background: this.props.isSelected
                ? "Azure" /* Azure */
                : "White" /* White */
        };
        const primary = (React.createElement(Highlighter, { searchWords: [this.props.searchWord], textToHighlight: this.props.subjectName }));
        const secondary = (React.createElement(Highlighter, { highlightClassName: "YourHighlightClass", searchWords: [this.props.searchWord], textToHighlight: this.props.subjectCode }));
        const gotClashReport = this.props.clashReport !== null;
        const listItemStyle = { cursor: this.props.isLoading ? "wait" : "default" };
        return (React.createElement("div", { className: "ui pushable", style: { overflowY: "hidden" } },
            React.createElement("div", { style: clashReportStyle, className: "ui " + (gotClashReport ? "visible" : "") + " right overlay sidebar" }, getClashReport(this.props.clashReport)),
            React.createElement("div", { className: (gotClashReport
                    ? "dimmed"
                    : "") + " pusher" },
                React.createElement("div", { style: divStyle },
                    React.createElement(core_1.ListItem, { id: this.props.id, className: "subjectview", style: listItemStyle, button: true, divider: true, onClick: this.props.handleSelection },
                        React.createElement(Checkbox_1.default, { checked: this.props.isSelected, tabIndex: -1, disableRipple: true }),
                        React.createElement(core_1.ListItemText, { primary: primary, secondary: secondary }))))));
    }
}
exports.SubjectView = SubjectView;
const getClashReport = (x) => {
    if (x) {
        if (x.Type === "single") {
            return (React.createElement("div", null,
                "Cannot select this subject as it clashes with : ",
                React.createElement("br", null),
                React.createElement("b", null, x.TargetName)));
        }
        else if (x.Type === "group") {
            return (React.createElement("div", null, "Cannot select this subject as it clashes with the subject(s) you selected previously."));
        }
    }
    else {
        return "";
    }
};
exports.default = SubjectView;
//# sourceMappingURL=subjectView.js.map
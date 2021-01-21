"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const timetableSummary_1 = require("../model/timetableSummary");
const colorhash_1 = require("../util/colorhash");
const invertColor_1 = require("../util/invertColor");
class TimetableSummaryView extends React.Component {
    render() {
        if (!this.props.slots) {
            return false;
        }
        const subjectSummaries = new timetableSummary_1.TimetableSummary(this.props.slots).SubjectSummaries;
        const tableStyle = {
            border: "1px solid black",
            borderCollapse: "collapse",
            fontSize: "16px",
            justifySelf: 'center',
            backgroundColor: 'whitesmoke'
        };
        return (
        // @ts-ignore
        React.createElement("table", { cellPadding: "0", cellSpacing: "0", style: tableStyle, border: "1" },
            React.createElement("tbody", null,
                React.createElement("tr", null,
                    getTd("Code"),
                    getTd("Name"),
                    getTd("Lecture"),
                    getTd("Tutorial"),
                    getTd("Practical"),
                    getTd("Credit Hour")),
                subjectSummaries.map((x, i) => {
                    return this.generateSubjectSummaryView(x, colorhash_1.ColorHash(x.SubjectCode), i);
                }),
                React.createElement("tr", null,
                    getTd("Total Credit Hour", "right", 5),
                    getTd(subjectSummaries
                        .reduce((x, y) => x + y.CreditHour, 0)
                        .toFixed(1))))));
    }
    generateSubjectSummaryView(x, backgroundColor, index) {
        const style = {
            color: invertColor_1.invertColor(backgroundColor),
            backgroundColor
        };
        return (React.createElement("tr", { key: index.toString(), style: style },
            getTd(x.SubjectCode),
            getTd(x.SubjectName),
            getTd(x.Lecture),
            getTd(x.Tutorial),
            getTd(x.Practical),
            getTd(x.CreditHour.toFixed(1))));
    }
}
exports.TimetableSummaryView = TimetableSummaryView;
function getTd(content, textAlign = 'center', colSpan = 1) {
    const style = {
        textAlign,
        padding: "5px",
        fontFamily: "roboto"
    };
    return (React.createElement("td", { style: style, colSpan: colSpan }, content));
}
//# sourceMappingURL=timetableSummaryView.js.map
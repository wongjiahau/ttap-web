"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const Button_1 = require("@material-ui/core/Button");
const Checkbox_1 = require("@material-ui/core/Checkbox");
const Divider_1 = require("@material-ui/core/Divider");
const Drawer_1 = require("@material-ui/core/Drawer");
const Paper_1 = require("@material-ui/core/Paper");
const Table_1 = require("@material-ui/core/Table");
const Typography_1 = require("@material-ui/core/Typography");
const React = require("react");
const subject_1 = require("../model/subject");
const beautifySubjectName_1 = require("../util/beautifySubjectName");
const stackPanel_1 = require("./panels/stackPanel");
const headerStyle = {
    marginLeft: "10px"
};
const titleStyle = {
    fontWeight: "bold",
    marginLeft: "15px",
    marginTop: "10px"
};
const divStyle = {
    flex: "2",
    overflow: "auto"
};
const footerStyle = {
    margin: "10px",
    minHeight: "36px",
    textAlign: "left"
};
class SlotsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionStyle: this.getSectionStyle()
        };
    }
    getSectionStyle() {
        return {
            display: "flex",
            flexFlow: "column",
            height: window.innerHeight
        };
    }
    render() {
        return (React.createElement(Drawer_1.default, { anchor: "right", open: this.props.isOpen, onClose: this.props.handleDone },
            React.createElement("section", { style: this.state.sectionStyle },
                React.createElement("header", { style: headerStyle },
                    React.createElement(stackPanel_1.StackPanel, { orientation: "vertical" },
                        React.createElement(Typography_1.default, { variant: "display1", color: "primary" }, "Below are the time slots of selected subjects."),
                        React.createElement(Typography_1.default, { variant: "subheading", gutterBottom: true }, "You can select or deselect some specific time slots."))),
                React.createElement(Paper_1.default, { style: divStyle }, this
                    .props
                    .selectedSubjects
                    .map((subject) => {
                    return (React.createElement("div", { key: subject.Code },
                        React.createElement(Typography_1.default, { style: titleStyle, variant: "subheading" }, subject.Code + " - " + beautifySubjectName_1.BeautifySubjectName(subject.Name)),
                        React.createElement(Table_1.default, null,
                            React.createElement(core_1.TableHead, null,
                                React.createElement(core_1.TableRow, null,
                                    React.createElement(core_1.TableCell, { padding: "checkbox" },
                                        React.createElement(Checkbox_1.default, { indeterminate: this.props.subjectStates[subject.Code] === "intermediate", checked: this.props.subjectStates[subject.Code] === "true", onClick: () => this.props.handleSlotsGroupCheckChanged(subject.Code) })),
                                    React.createElement(core_1.TableCell, { padding: "dense" }, "No"),
                                    React.createElement(core_1.TableCell, { padding: "dense" }, "Type"),
                                    React.createElement(core_1.TableCell, { padding: "dense" }, "Group"),
                                    React.createElement(core_1.TableCell, { padding: "dense" }, "Day"),
                                    React.createElement(core_1.TableCell, { padding: "dense" }, "Time"),
                                    React.createElement(core_1.TableCell, { padding: "dense" }, "Week"),
                                    React.createElement(core_1.TableCell, { padding: "dense" }, "Room"),
                                    React.createElement(core_1.TableCell, { padding: "dense" }, "Remark"))),
                            React.createElement(core_1.TableBody, null, this.props.rawSlotStore
                                .GetBunch(subject.SlotUids)
                                .map((slot, index) => {
                                const checked = this.props.slotStates[slot.Number];
                                const clickHandler = () => this
                                    .props
                                    .handleSlotCheckChanged(slot.Number, checked, subject.Code);
                                return (React.createElement(core_1.TableRow, { key: index, hover: true, onClick: clickHandler },
                                    React.createElement(core_1.TableCell, { padding: "checkbox" },
                                        React.createElement(Checkbox_1.default, { checked: checked, onClick: clickHandler })),
                                    React.createElement(core_1.TableCell, { padding: "dense" }, slot.Number),
                                    React.createElement(core_1.TableCell, { padding: "dense" }, slot.Type),
                                    React.createElement(core_1.TableCell, { padding: "dense" }, slot.Group),
                                    React.createElement(core_1.TableCell, { padding: "dense" }, slot.Day),
                                    React.createElement(core_1.TableCell, { padding: "dense" }, slot.TimePeriod),
                                    React.createElement(core_1.TableCell, { padding: "dense" }, slot.WeekNumber),
                                    React.createElement(core_1.TableCell, { padding: "dense" }, slot.Room),
                                    React.createElement(core_1.TableCell, { padding: "dense" }, slot.Remark)));
                            }))),
                        React.createElement(Divider_1.default, null),
                        React.createElement(Divider_1.default, null)));
                })),
                React.createElement("div", null, GenerateErrorLabels(this.props.errorMessages)),
                React.createElement("footer", { style: footerStyle },
                    React.createElement(stackPanel_1.StackPanel, { orientation: "horizontal", horizontalAlignment: "left" },
                        React.createElement(Button_1.default, { variant: "contained", color: "primary", onClick: this.props.handleDone }, "Find new timetables"),
                        React.createElement(Button_1.default, { onClick: this.props.handleCancel }, "Cancel"))))));
    }
}
exports.SlotsTable = SlotsTable;
function GenerateErrorLabels(diffReports) {
    const errorStyle = {
        color: "Red" /* Red */
    };
    if (!diffReports) {
        return "";
    }
    if (diffReports[0].MissingSlotType === "no possible timetables found") {
        return (React.createElement("div", { style: errorStyle },
            React.createElement("ul", null,
                React.createElement("li", null, "The currently selected slots do not produce any possible timetables. Try selecting more slots."))));
    }
    const getType = (type) => {
        switch (type) {
            case "L":
                return "LECTURE";
            case "T":
                return "TUTORIAL";
            case "P":
                return "PRACTICAL";
            case "no possible timetables found":
                return "";
        }
    };
    return (React.createElement("div", { style: errorStyle },
        React.createElement("ul", null, diffReports.map((r) => (React.createElement("li", null,
            "At least one ",
            getType(r.MissingSlotType),
            "\u00A0is needed for ",
            subject_1.Subject.GetSubjectNameOf(r.SubjectCode)))))));
}
//# sourceMappingURL=slotsTableView.js.map
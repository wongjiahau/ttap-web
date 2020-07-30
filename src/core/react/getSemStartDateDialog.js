"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const Button_1 = require("@material-ui/core/Button");
const Dialog_1 = require("@material-ui/core/Dialog");
const React = require("react");
const stackPanel_1 = require("./panels/stackPanel");
const format = require("date-fns/format");
class GetSemStartDateDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleDateChanged = (event) => {
            const chosenDate = new Date(Date.parse(event.target.value));
            if (chosenDate.getDay() !== 1) {
                this.setState({
                    helperText: "Error: the date you chose is not a Monday.",
                    error: true,
                    dateIsSelected: false
                });
                return;
            }
            this.setState({
                helperText: `The date you picked is ${format(chosenDate, "DD-MMMM-YYYY (dddd)")}.`,
                error: false,
                dateIsSelected: true,
                date: chosenDate
            });
        };
        this.state = {
            date: null,
            error: false,
            helperText: "",
            dateIsSelected: false
        };
    }
    render() {
        const buttonStyle = {
            marginRight: "10px"
        };
        return (React.createElement(Dialog_1.default, { open: this.props.isOpen },
            React.createElement(core_1.DialogTitle, null,
                "Pick a date that represent the",
                React.createElement("br", null),
                "Monday of Week One of next semester."),
            React.createElement("div", null,
                React.createElement(stackPanel_1.StackPanel, { orientation: "vertical", horizontalAlignment: "center" },
                    React.createElement(core_1.TextField, { id: "date", label: "Date", type: "date", error: this.state.error, helperText: this.state.helperText, onChange: this.handleDateChanged, InputLabelProps: {
                            shrink: true,
                        } }),
                    ""),
                React.createElement(stackPanel_1.StackPanel, { style: { margin: "10px" }, orientation: "horizontal", horizontalAlignment: "right" },
                    React.createElement(Button_1.default, { style: buttonStyle, onClick: this.props.handleClose }, "Cancel"),
                    React.createElement(Button_1.default, { onClick: () => {
                            if (this.state.date) {
                                this.props.handleSaveToGoogleCalendar(this.state.date);
                            }
                        }, style: buttonStyle, disabled: !this.state.dateIsSelected, variant: "contained", color: "primary" }, "Add to Google Calendar")))));
    }
}
exports.GetSemStartDateDialog = GetSemStartDateDialog;
//# sourceMappingURL=getSemStartDateDialog.js.map
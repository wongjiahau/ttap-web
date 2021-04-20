"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const Button_1 = require("@material-ui/core/Button");
const Dialog_1 = require("@material-ui/core/Dialog");
const List_1 = require("@material-ui/core/List");
const InsertDriveFile_1 = require("@material-ui/icons/InsertDriveFile");
const InsertPhoto_1 = require("@material-ui/icons/InsertPhoto");
const Web_1 = require("@material-ui/icons/Web");
const React = require("react");
const getSemStartDateDialog_1 = require("./getSemStartDateDialog");
const cancelButtonStyle = {
    marginBottom: "7px",
    marginLeft: "7px"
};
class SaveTimetableDialog extends React.Component {
    render() {
        const getListItem = (text, icon, handler) => {
            return (React.createElement(core_1.ListItem, { button: true, onClick: handler },
                React.createElement(core_1.ListItemIcon, null, icon),
                React.createElement(core_1.ListItemText, { primary: text })));
        };
        return (React.createElement(Dialog_1.default, { open: this.props.isMainDialogOpen, onBackdropClick: this.props.handleClose },
            React.createElement(core_1.DialogTitle, null, "Save this timetable as . . ."),
            React.createElement("div", null,
                React.createElement(List_1.default, null,
                    getListItem("Text file", React.createElement(InsertDriveFile_1.default, null), this.props.handleSaveAsTextFile),
                    getListItem("HTML", React.createElement(Web_1.default, null), this.props.handleSaveAsHtml),
                    getListItem("Picture", React.createElement(InsertPhoto_1.default, null), this.props.handleSaveAsImage)),
                React.createElement(Button_1.default, { color: "primary", style: cancelButtonStyle, onClick: this.props.handleClose }, "cancel")),
            React.createElement(getSemStartDateDialog_1.GetSemStartDateDialog, { isOpen: this.props.isGetDateDialogOpen, handleClose: this.props.handleCloseGetDateDialog, handleSaveToGoogleCalendar: this.props.handleSaveToGoogleCalendar })));
    }
}
exports.SaveTimetableDialog = SaveTimetableDialog;
//# sourceMappingURL=saveTimetableDialog.js.map
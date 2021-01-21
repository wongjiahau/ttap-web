"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Note: SBCW means Search By Considering Week Number
const core_1 = require("@material-ui/core");
const Button_1 = require("@material-ui/core/Button");
const React = require("react");
class TurnOnSBCWDialog extends React.Component {
    render() {
        return (React.createElement(core_1.Dialog, { open: this.props.isOpen },
            React.createElement(core_1.DialogTitle, null, "Turn on search by considering week number?"),
            React.createElement(core_1.DialogContent, null,
                React.createElement(core_1.DialogContentText, null,
                    "Turning on this feature will allow TTAP to search for more timetables. WARNING: This will ",
                    React.createElement("b", null,
                        React.createElement("i", null, "slow")),
                    " down the search process.")),
            React.createElement(core_1.DialogActions, null,
                React.createElement(Button_1.default, { onClick: this.props.handleClose, color: "primary" }, "cancel"),
                React.createElement(Button_1.default, { onClick: this.props.handleTurnOn, color: "primary" }, "Turn on"))));
    }
}
exports.TurnOnSBCWDialog = TurnOnSBCWDialog;
//# sourceMappingURL=turnOnSBCWConfirmationDialog.js.map
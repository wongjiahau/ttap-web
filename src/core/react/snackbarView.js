"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = require("@material-ui/core/Button");
const Snackbar_1 = require("@material-ui/core/Snackbar");
const React = require("react");
let viewCount = 0;
class SnackbarView extends React.Component {
    render() {
        viewCount++;
        const okButton = (React.createElement(Button_1.default, { color: "secondary", onClick: this.props.handleClose }, "Got it"));
        const snackbarMessage = React.createElement("span", null, this.props.message);
        const anchorOrigin = {
            horizontal: "left",
            vertical: "bottom"
        };
        const getSnackbar = (open) => React.createElement(Snackbar_1.default, { action: okButton, open: open, anchorOrigin: anchorOrigin, message: snackbarMessage });
        return (React.createElement(React.Fragment, null,
            getSnackbar(this.props.isOpen && (viewCount % 2 === 0)),
            getSnackbar(this.props.isOpen && (viewCount % 2 === 1))));
    }
}
exports.SnackbarView = SnackbarView;
//# sourceMappingURL=snackbarView.js.map
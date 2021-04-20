"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const Button_1 = require("@material-ui/core/Button");
const Dialog_1 = require("@material-ui/core/Dialog");
const ThumbUp_1 = require("@material-ui/icons/ThumbUp");
const React = require("react");
const constants_1 = require("../constants");
class GetFeedbackDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleNo = () => {
            this.setState({ isOpen: false });
        };
        this.handleYes = () => {
            this.setState({ isOpen: false });
            this.setCookies();
            window.open(constants_1.FeedbackFormUrl, "_blank");
        };
        this.setCookies = () => {
            Cookies.set("feedbackPrompted", "true", { expires: 7 }); // eslint-disable-line no-undef
        };
        this.state = {
            isOpen: false,
        };
        try {
            const feedbackPrompted = Cookies.get("feedbackPrompted") === "true"; // eslint-disable-line no-undef
            const HOW_MANY_MINUTE = 4.25; // This is just a guess
            if (!feedbackPrompted) {
                window.setTimeout(() => {
                    this.setState({ isOpen: true });
                }, 60000 * HOW_MANY_MINUTE); // Note: 60,000ms = 1 minute
            }
        }
        catch (e) {
            // surpess Cookies is not defined error
            // This is because Cookies is loaded from <script> via CDN
        }
    }
    render() {
        return (React.createElement(Dialog_1.default, { open: this.state.isOpen },
            React.createElement("img", { style: { height: "350px" }, src: "thank_3148710_640.png" }),
            React.createElement(core_1.DialogTitle, null, "Thank you for using TTAP!"),
            React.createElement(core_1.DialogContent, null,
                React.createElement(core_1.DialogContentText, null, "Will you please rate us? :)")),
            React.createElement(core_1.DialogActions, null,
                React.createElement(Button_1.default, { onClick: this.handleNo, color: "primary" }, "No thanks"),
                React.createElement(Button_1.default, { variant: "contained", onClick: this.handleYes, color: "primary" },
                    "Rate ttap",
                    React.createElement(ThumbUp_1.default, { style: {
                            color: "white",
                            marginLeft: "10px"
                        } })))));
    }
}
exports.GetFeedbackDialog = GetFeedbackDialog;
//# sourceMappingURL=getFeedbackDialog.js.map
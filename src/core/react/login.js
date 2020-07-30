"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const Button_1 = require("@material-ui/core/Button");
const Dialog_1 = require("@material-ui/core/Dialog");
const Typography_1 = require("@material-ui/core/Typography");
const React = require("react");
const react_router_1 = require("react-router");
const parseStudentHtmlToRawSlot_1 = require("../parser/parseStudentHtmlToRawSlot");
const str_1 = require("../util/str");
const stackPanel_1 = require("./panels/stackPanel");
const selectCourseView_1 = require("./selectCourseView");
const divStyle = {
    textAlign: "center",
    display: 'grid'
};
const iframeStyle = {
    height: "490px",
    width: "500px"
};
const debugging = false;
const URL = debugging
    ? "https://wongjiahau.github.io/mock-utar-unitreg/"
    : "https://unitreg.utar.edu.my/portal/courseRegStu/login.jsp";
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.currentPage = 1;
        this.htmls = [];
        this.handleLoadDemo = () => {
            this.handleClose();
            selectCourseView_1.LoadSlotsFromUrl("https://raw.githubusercontent.com/wongjiahau/ttap-datahub/master/Demo.json", "json", () => this.setState({ loading: true }), (slots) => {
                this.props.handleLoadSlots(slots);
                this.setState({ loading: false, redirect: true });
            }, (error) => alert(error));
        };
        this.handleIFrameOnLoad = () => {
            const iframe = document.getElementById("unitregiframe");
            if (iframe === null) {
                throw new Error();
            }
            if (iframe.contentWindow === null) {
                throw new Error();
            }
            const newLocation = new str_1.Str(iframe.contentWindow.location.href);
            if (newLocation.Contains("studentRegistration")) {
                iframe.src = "http://unitreg.utar.edu.my/portal/courseRegStu/schedule/masterSchedule.jsp";
                return;
            }
            if (newLocation.Contains("masterSchedule")) {
                const currentHtml = iframe.contentWindow.document.body.innerHTML;
                this.htmls.push(currentHtml);
                if ((new str_1.Str(currentHtml)).Contains(`changePage('${this.currentPage + 1}')`)) {
                    this.currentPage++;
                    iframe.contentWindow["changePage"](this.currentPage); // changePage is a function defined in <script></script>
                }
                else {
                    try {
                        // Logout from the unitreg page
                        // To free up the connection to server
                        // So that the server won't be overwhelmed
                        iframe.src = "https://unitreg.utar.edu.my/portal/courseRegStu/logout.jsp";
                        // Parse the HTML data
                        this.props.handleLoadSlots(this.htmls.map(parseStudentHtmlToRawSlot_1.default).reduce((x, y) => x.concat(y)));
                        this.setState({ redirect: true });
                    }
                    catch (error) {
                        this.htmls = []; // Clear previous stored HTMLS
                        this.setState({ openErrorDialog: true });
                        console.log(error);
                    }
                }
            }
        };
        this.handleRefresh = () => {
            const iframe = document.getElementById("unitregiframe");
            iframe.src = iframe.src;
        };
        this.handleClose = () => {
            this.setState({ openErrorDialog: false });
        };
        this.state = {
            redirect: false,
            openErrorDialog: false,
            openAddSlotManuallyDialog: false,
            loading: false,
        };
    }
    render() {
        if (this.state.loading) {
            return selectCourseView_1.getLoadingElement();
        }
        if (this.state.redirect) {
            return React.createElement(react_router_1.Redirect, { push: true, to: "/play" });
        }
        return (React.createElement("div", { style: divStyle },
            React.createElement("div", { style: { display: 'grid', alignContent: 'center', justifyContent: 'center', gridGap: '12px', justifyItems: 'center' } },
                React.createElement(Typography_1.default, { variant: "h6" }, "Please wait for the login page to appear."),
                React.createElement("iframe", { id: "unitregiframe", scrolling: "no", style: iframeStyle, onLoad: this.handleIFrameOnLoad, src: URL }),
                React.createElement(stackPanel_1.StackPanel, { orientation: "horizontal", horizontalAlignment: "center" },
                    React.createElement(Button_1.default, { variant: "contained", color: "secondary", onClick: this.handleRefresh }, "Refresh"),
                    React.createElement("p", null),
                    React.createElement(Button_1.default, { variant: "contained", color: "primary", onClick: this.handleLoadDemo }, "TRY DEMO")),
                React.createElement(Button_1.default, { onClick: () => this.setState({ openAddSlotManuallyDialog: true }) }, "Add slots manually")),
            React.createElement(Dialog_1.default, { open: this.state.openAddSlotManuallyDialog },
                React.createElement(core_1.DialogTitle, null, "Add slots manually"),
                React.createElement(core_1.DialogContent, null,
                    React.createElement("textarea", { style: { height: "100px" }, id: "htmlarea", placeholder: "Paste HTML here" }),
                    React.createElement("br", null),
                    React.createElement("a", { href: "https://github.com/wongjiahau/ttap-web/blob/master/HowToAddSlotManually.md" }, "How to add slots manually?")),
                React.createElement(core_1.DialogActions, null,
                    React.createElement(Button_1.default, { onClick: () => this.setState({ openAddSlotManuallyDialog: false }) }, "Cancel"),
                    React.createElement(Button_1.default, { color: "primary", variant: "contained", onClick: () => {
                            const textarea = document.getElementById("htmlarea");
                            try {
                                this.props.handleLoadSlots(parseStudentHtmlToRawSlot_1.default(textarea.value));
                                this.setState({ redirect: true });
                            }
                            catch (error) {
                                alert("Failed. Make sure you paste in the correct content.");
                            }
                        } }, "ADD SLOTS"))),
            React.createElement(Dialog_1.default, { open: this.state.openErrorDialog },
                React.createElement(core_1.DialogTitle, null, "We can't load the data :("),
                React.createElement(core_1.DialogContent, null,
                    React.createElement(core_1.DialogContentText, null, "It may be due to the following reasons:"),
                    React.createElement("ul", null,
                        React.createElement("li", null, "You have not met your Academic Advisor(AA)."),
                        React.createElement("li", null, "Your time to view the data have not reach yet."),
                        React.createElement("li", null, "Internal error of TTAP.")),
                    React.createElement(Typography_1.default, { gutterBottom: true }, "Do you want to try the demo instead?")),
                React.createElement(core_1.DialogActions, null,
                    React.createElement(Button_1.default, { onClick: this.handleClose }, "No thanks"),
                    React.createElement(Button_1.default, { variant: "contained", onClick: this.handleLoadDemo, color: "primary" }, "TRY DEMO")))));
    }
    componentDidMount() {
        // Check if user is using the Electron-based TTAP Desktop Client
        // Refer https://github.com/electron/electron/issues/2288
        const userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.indexOf(" electron/") > -1) {
            // OK, good
        }
        else {
            // Redirect the user to go download TTAP-Desktop
            alert("Please download the desktop version of TTAP.");
            window.location.href = "https://get-ttap.surge.sh";
        }
    }
}
exports.Login = Login;
//# sourceMappingURL=login.js.map
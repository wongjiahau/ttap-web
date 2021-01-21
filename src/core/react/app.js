"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppBar_1 = require("@material-ui/core/AppBar");
const Button_1 = require("@material-ui/core/Button");
const indigo_1 = require("@material-ui/core/colors/indigo");
const pink_1 = require("@material-ui/core/colors/pink");
const IconButton_1 = require("@material-ui/core/IconButton");
const createMuiTheme_1 = require("@material-ui/core/styles/createMuiTheme");
const MuiThemeProvider_1 = require("@material-ui/core/styles/MuiThemeProvider");
const Toolbar_1 = require("@material-ui/core/Toolbar");
const Typography_1 = require("@material-ui/core/Typography");
const ArrowBack_1 = require("@material-ui/icons/ArrowBack");
const Menu_1 = require("@material-ui/icons/Menu");
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const getFeedbackDialog_1 = require("./getFeedbackDialog");
const mainRouter_1 = require("./mainRouter");
const otherStuffDrawer_1 = require("./otherStuffDrawer");
const theme = createMuiTheme_1.default({
    palette: {
        primary: indigo_1.default,
        secondary: pink_1.default,
    },
    props: {
        MuiButtonBase: {
            // The properties to apply
            disableRipple: true,
        },
    }
});
function ToggleLoadingScreen(loadingWord, work) {
    const x = document.getElementById("loading-words");
    if (x) {
        x.style.display = "";
        const y = document.getElementById("loading-inner-word");
        if (y) {
            y.innerHTML = loadingWord + "<br> . . . . . .";
        }
        setTimeout(() => {
            work();
            x.style.display = "none";
        }, 100 /*ms*/);
    }
}
exports.ToggleLoadingScreen = ToggleLoadingScreen;
class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleOpenDrawer = () => this.setState({ isSecondaryDrawerOpen: true });
        this.handleCloseDrawer = () => this.setState({ isSecondaryDrawerOpen: false });
        this.state = {
            isSecondaryDrawerOpen: false
        };
        // hide loading words
        const x = document.getElementById("loading-words");
        if (x) {
            x.style.display = "none";
        }
    }
    render() {
        const menuButton = (React.createElement(IconButton_1.default, { onClick: this.handleOpenDrawer },
            React.createElement(Menu_1.default, null)));
        return (React.createElement(react_router_dom_1.HashRouter, null,
            React.createElement(MuiThemeProvider_1.default, { theme: theme },
                React.createElement("div", { style: { display: 'grid', gridTemplateRows: 'auto 1fr', overflowY: 'auto', overflowX: 'hidden' } },
                    React.createElement(AppBar_1.default, { position: "static", style: { width: "100%", alignSelf: 'start' } },
                        React.createElement(Toolbar_1.default, null,
                            React.createElement(Button_1.default, { onClick: () => window.history.back() },
                                React.createElement(ArrowBack_1.default, { style: { color: "white" } })),
                            React.createElement(Typography_1.default, { style: { flex: 1 }, variant: "title", color: "inherit" }, "Timetable Arranging Program (UTAR)"),
                            React.createElement(IconButton_1.default, { onClick: this.handleOpenDrawer, style: { marginRight: "-12px", color: "white" } },
                                React.createElement(Menu_1.default, { style: { color: "white" } })))),
                    React.createElement(otherStuffDrawer_1.OtherStuffDrawer, { isOpen: this.state.isSecondaryDrawerOpen, onItemClick: this.handleCloseDrawer }),
                    React.createElement(getFeedbackDialog_1.GetFeedbackDialog, null),
                    React.createElement(mainRouter_1.MainRouter, null)))));
        // <Drawer     width={200}     docked={false}     openSecondary={true}
        // open={this.state.isSecondaryDrawerOpened}Drawer >     <Button color="primary"
        // variant="contained" onClick={this.handleCloseDrawer}>         hide drawer
        // </Button>     {/* < DrawerContent onItemClick={this.handleCloseDrawer}/> */}
        // </Drawer> <GetFeedbackDialog/> {/* <Main/> */}
    }
    componentDidMount() {
        const x = document.getElementById("loading-inner-word");
        if (x) {
            x.innerHTML
                = "Finding possible timetables <br> . . . . . .";
        }
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map
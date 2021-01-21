"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const Drawer_1 = require("@material-ui/core/Drawer");
const List_1 = require("@material-ui/core/List");
const BugReport_1 = require("@material-ui/icons/BugReport");
const Feedback_1 = require("@material-ui/icons/Feedback");
const Help_1 = require("@material-ui/icons/Help");
const Info_1 = require("@material-ui/icons/Info");
const School_1 = require("@material-ui/icons/School");
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const constants_1 = require("../constants");
const linkStyle = {
    textDecoration: "none"
};
const MenuItemStyle = {
    fontSize: 15,
    fontWeight: "bold"
};
exports.OtherStuffDrawer = (props) => {
    const routerLink = (icon, text, to) => React.createElement(react_router_dom_1.Link, { style: linkStyle, to: to },
        React.createElement(core_1.ListItem, { button: true, onClick: props.onItemClick },
            React.createElement(core_1.ListItemIcon, null, icon),
            React.createElement(core_1.ListItemText, { primary: text })));
    const newTabLink = (icon, text, url) => {
        return (React.createElement(core_1.ListItem, { button: true, onClick: () => { window.open(url, "_blank"); props.onItemClick(); } },
            React.createElement(core_1.ListItemIcon, null, icon),
            React.createElement(core_1.ListItemText, { primary: text })));
    };
    return (React.createElement(Drawer_1.default, { open: props.isOpen, anchor: "right", onClose: props.onItemClick },
        React.createElement(List_1.default, null,
            routerLink(React.createElement(Help_1.default, null), "Tutorial", "learn"),
            newTabLink(React.createElement(Feedback_1.default, null), "Feedback", constants_1.FeedbackFormUrl),
            newTabLink(React.createElement(BugReport_1.default, null), "Report a bug", constants_1.BugFormUrl),
            routerLink(React.createElement(Info_1.default, null), "About TTAP", "about"),
            routerLink(React.createElement(School_1.default, null), "Terms of Service", "tospp"))));
};
//# sourceMappingURL=otherStuffDrawer.js.map
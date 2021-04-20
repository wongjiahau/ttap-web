"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_1 = require("react-router");
const react_router_dom_1 = require("react-router-dom");
const constants_1 = require("../constants");
const fgoViewContainer_1 = require("../redux/containers/fgoViewContainer");
const loginContainer_1 = require("../redux/containers/loginContainer");
const selectCourseContainer_1 = require("../redux/containers/selectCourseContainer");
const getStarted_1 = require("./getStarted");
const masterView_1 = require("./masterView");
const fourOhFour_1 = require("./pages/fourOhFour");
const stackPanel_1 = require("./panels/stackPanel");
const playground_1 = require("./playground");
const markdownPage_1 = require("./tutorial/markdownPage");
const tutorial_1 = require("./tutorial/tutorial");
exports.MainRouter = () => (React.createElement(react_router_dom_1.Switch, null,
    React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: RedirectTo }),
    React.createElement(react_router_dom_1.Route, { exact: true, path: "/getStarted", component: getStarted_1.GetStarted }),
    React.createElement(react_router_dom_1.Route, { exact: true, path: "/learn", component: tutorial_1.Tutorial }),
    React.createElement(react_router_dom_1.Route, { exact: true, path: "/login", component: loginContainer_1.LoginContainer }),
    React.createElement(react_router_dom_1.Route, { exact: true, path: "/select", component: selectCourseContainer_1.SelectCourseViewContainer }),
    React.createElement(react_router_dom_1.Route, { exact: true, path: "/play", component: masterView_1.MasterView }),
    React.createElement(react_router_dom_1.Route, { exact: true, path: "/404", component: fourOhFour_1.FourOhFour }),
    React.createElement(react_router_dom_1.Route, { exact: true, path: "/playground", component: playground_1.Playground }),
    React.createElement(react_router_dom_1.Route, { exact: true, path: "/tospp", component: Page(constants_1.RawTosppUrl) }),
    React.createElement(react_router_dom_1.Route, { exact: true, path: "/about", component: Page(constants_1.RawReadmeUrl) }),
    React.createElement(react_router_dom_1.Route, { exact: true, path: "/fgo", component: fgoViewContainer_1.FgoViewContainer })));
const RedirectTo = () => {
    return React.createElement(react_router_1.Redirect, { push: true, to: "/getStarted" });
};
const width = 0.9 * window.innerWidth;
const height = 0.825 * window.innerHeight;
const Page = (src) => {
    return () => (React.createElement(stackPanel_1.StackPanel, { orientation: "vertical", horizontalAlignment: "center" },
        React.createElement(markdownPage_1.MarkdownPage, { width: width, height: height, src: src }),
        " ",
        ""));
};
//# sourceMappingURL=mainRouter.js.map
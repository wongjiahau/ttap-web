"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const backable_1 = require("../backable");
const divStyle = {
    margin: "auto",
    textAlign: "center"
};
const EmbeddedPage = (props) => {
    return (React.createElement(backable_1.Backable, null,
        React.createElement("div", { style: divStyle },
            React.createElement("iframe", { src: props.src, width: 0.9 * window.innerWidth, height: 0.80 * window.innerHeight }, "Loading..."))));
};
exports.FeedbackForm = () => {
    return (React.createElement(EmbeddedPage, { src: "https://docs.google.com/forms/d/e/1FAIpQLSeaHX6ckUye3r-MSNk0cSSyc8D2i-UHQdi4QasFgwH920olgg/viewform?embedded=true" }));
};
exports.ReportBugForm = () => {
    return (React.createElement(EmbeddedPage, { src: "https://docs.google.com/forms/d/e/1FAIpQLSfgVvjrplcc4pVc4tadmP0wadj9lX_vYL9KCpAQwrA_0KVJ3w/viewform?embedded=true" }));
};
//# sourceMappingURL=embeddedPage.js.map
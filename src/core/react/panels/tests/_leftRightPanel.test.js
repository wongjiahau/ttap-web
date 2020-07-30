"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const React = require("react");
const ReactDOM = require("react-dom");
const str_1 = require("../../../util/str");
const leftRightPanel_1 = require("../leftRightPanel");
describe("<LeftRightPanel/>", () => {
    it("should throw error if it does not receive 2 children", () => {
        const div = document.createElement("div");
        const toBeRender = (React.createElement(leftRightPanel_1.LeftRightPanel, null,
            React.createElement("div", null, "First"),
            React.createElement("div", null, "Second"),
            React.createElement("div", null, "Third")));
        chai_1.expect(() => {
            ReactDOM.render(toBeRender, div);
        }).to.throw();
    });
    it("should render a table of 1 row and 2 column", () => {
        const div = document.createElement("div");
        const toBeRender = (React.createElement(leftRightPanel_1.LeftRightPanel, null,
            React.createElement("div", null, "First"),
            React.createElement("div", null, "Second")));
        ReactDOM.render(toBeRender, div);
        const html = div.innerHTML;
        const tableCount = new str_1.Str(html).Count("</table>");
        const tableRowCount = new str_1.Str(html).Count("</tr>");
        const tableDataCount = new str_1.Str(html).Count("</td>");
        chai_1.expect(tableCount).to.eq(1);
        chai_1.expect(tableRowCount).to.eq(1);
        chai_1.expect(tableDataCount).to.eq(2);
    });
});
//# sourceMappingURL=_leftRightPanel.test.js.map
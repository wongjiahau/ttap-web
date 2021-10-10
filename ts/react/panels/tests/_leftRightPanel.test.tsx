import { expect } from "chai";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { Str } from "../../../util/str";
import { LeftRightPanel } from "../leftRightPanel";

describe("<LeftRightPanel/>", () => {
  it("should throw error if it does not receive 2 children", () => {
    const div = document.createElement("div");
    const toBeRender = (
      <LeftRightPanel>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </LeftRightPanel>
    );
    expect(() => {
      ReactDOM.render(toBeRender, div);
    }).to.throw();
  });

  it("should render a table of 1 row and 2 column", () => {
    const div = document.createElement("div");
    const toBeRender = (
      <LeftRightPanel>
        <div>First</div>
        <div>Second</div>
      </LeftRightPanel>
    );
    ReactDOM.render(toBeRender, div);
    const html = div.innerHTML;
    const tableCount = new Str(html).Count("</table>");
    const tableRowCount = new Str(html).Count("</tr>");
    const tableDataCount = new Str(html).Count("</td>");
    expect(tableCount).to.eq(1);
    expect(tableRowCount).to.eq(1);
    expect(tableDataCount).to.eq(2);
  });
});

import { expect } from "chai";
import { GetStandardDayColumnLayout } from "../timetableView";

describe("GetStandardDayColumnLayout", () => {
  it("should return an array of Layouts", () => {
    const result = GetStandardDayColumnLayout();
    expect(result).to.deep.eq([
      { h: 1, i: "d0", w: 2, x: 0, y: 0 },
      { h: 1, i: "d1", w: 2, x: 0, y: 1 },
      { h: 1, i: "d2", w: 2, x: 0, y: 2 },
      { h: 1, i: "d3", w: 2, x: 0, y: 3 },
      { h: 1, i: "d4", w: 2, x: 0, y: 4 },
      { h: 1, i: "d5", w: 2, x: 0, y: 5 },
      { h: 1, i: "d6", w: 2, x: 0, y: 6 },
      { h: 1, i: "d7", w: 2, x: 0, y: 7 },
    ]);
  });
});

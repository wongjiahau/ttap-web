import { expect } from "chai";
import { CompressDayTimeMatrix } from "../timetable";

describe("CompressDayTimeMatrix", () => {
  it("case 1", () => {
    const matrix = [0, 0, 255, 0, 0, 0, 0, 0, 255, 0, 0, 0, 0, 0];
    const result = CompressDayTimeMatrix(matrix);
    expect(result).to.deep.eq([0, 255, 255, 0, 0, 0, 0]);
  });

  it("case 2", () => {
    const matrix = [0, 0, 255, 0, 0, 0, 0, 0, 255, 255, 0, 0, 0, 0];
    const result = CompressDayTimeMatrix(matrix);
    expect(result).to.deep.eq([0, 255, 255, 0, 0, 0, 0]);
  });
});

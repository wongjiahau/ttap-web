import { expect } from "chai";
import { DecToBin } from "../decToBin";

describe("DecToBin()", () => {
  it("case 1", () => {
    const input = 7;
    const result = DecToBin(input, 4);
    expect(result).to.eq("0111");
  });

  it("case 2", () => {
    const input = 255;
    const result = DecToBin(input, 32);
    expect(result).to.eq("00000000000000000000000011111111");
  });
});

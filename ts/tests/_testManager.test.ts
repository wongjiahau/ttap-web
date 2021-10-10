import { assert, expect } from "chai";

import { Str } from "../util/str";
import testManager from "./testManager";
import { FileName } from "./testManager";

describe("TestManager functions", () => {
  it("GetFileNameOf should return string based on FileName enum", () => {
    const result = new testManager().GetDataFrom(FileName.jiahau_2017_sept);
    expect(new Str(result).Contains("unitreg")).to.equal(true);
  });
});

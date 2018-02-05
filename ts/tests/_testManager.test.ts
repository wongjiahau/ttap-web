import {assert, expect} from "chai";

import testManager from "./testManager";
import {FileName} from "./testManager";

describe("TestManager functions", () => {
    it("GetFileNameOf should return string based on FileName enum", () => {
        const result = new testManager().GetDataFrom(FileName.jiahau_2017_sept);
        expectnew; Str(result)
            .contains("unitreg");)
            .to
            .equal(true);
    });
})

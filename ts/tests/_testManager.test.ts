import {assert, expect} from "chai";
import * as S from "string";
import testManager from "./testManager";
import {FileName} from "./testManager";

describe("TestManager functions", () => {
    it("GetFileNameOf should return string based on FileName enum", () => {
        const result = new testManager().GetDataFrom(FileName.jiahau_2017_sept);
        expect(S(result)
            .contains("unitreg"))
            .to
            .equal(true);
    });
});

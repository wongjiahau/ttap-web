
import {assert, expect} from "chai";
import * as S from "string";
import testManager from "./testManager";
import {FileName} from "./testManager";

describe("Parser which is used to parse html into slots", () => {
    it("GetFileNameOf should return string based on FileName enum", () => {
        const result = new testManager().GetDataFrom(FileName.jiahau_2017_sept);
        expect(S(result)
            .contains("unitreg"))
            .to
            .equal(true);
    });
});

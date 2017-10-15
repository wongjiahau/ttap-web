import {expect} from "chai";
import {last} from "lodash";
import ParseHtmlToSlots from "../parser/parseHtmlToSlot";
import testManager from "./testManager";
import {FileName} from "./testManager";

describe("Parser which is used to parse html into slots", () => {
    it("jiahau_2017_sept's data should have 203 slots", () => {
        const plainHtml = new testManager().GetDataFrom(FileName.jiahau_2017_sept);
        const result = ParseHtmlToSlots(plainHtml);
        expect(result.length)
            .to
            .equal(203);
    });

    it("jiahau_2017_sept's last slot should have number of 129", () => {
        const plainHtml = new testManager().GetDataFrom(FileName.jiahau_2017_sept);
        const result = ParseHtmlToSlots(plainHtml);
        expect(last(result).Number)
            .to
            .equal("129");
    });
});

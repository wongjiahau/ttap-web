import {expect} from "chai";
import {random} from "lodash";
import ParseHtmlToSlots from "../parser/parseHtmlToRawSlot";
import SlotStore from "../store/slotStore";
import testManager from "./testManager";
import {FileName} from "./testManager";

describe("Slot store", () => {
    it("should take RawSlot[] as constructor parameter", () => {
        const rawSlots = ParseHtmlToSlots(new testManager().GetDataFrom(FileName.jiahau_2017_sept));
        const s = new SlotStore(rawSlots);
    });

    it("GetSlot should return a RawSlot when passed in a SlotId", () => {
        const rawSlots = ParseHtmlToSlots(new testManager().GetDataFrom(FileName.jiahau_2017_sept));
        const s = new SlotStore(rawSlots);
        expect(s.GetSlot(random(s.GetMinRange(), s.GetMaxRange())))
            .to
            .has
            .property("HashId");
    });

    it("GetAvailableRange should return a [number, number]", () => {
        const rawSlots = ParseHtmlToSlots(new testManager().GetDataFrom(FileName.jiahau_2017_sept));
        const s = new SlotStore(rawSlots);
        expect(s.GetAvailableRange())
            .to
            .be
            .an("array")
            .with
            .lengthOf(2);
    });

    it("GetAvailableRange should return a [x, y] where x in min and y is max", () => {
        const rawSlots = ParseHtmlToSlots(new testManager().GetDataFrom(FileName.jiahau_2017_sept));
        const s = new SlotStore(rawSlots);
        expect(s.GetAvailableRange()[0])
            .to
            .be
            .lessThan(s.GetAvailableRange()[1]);
    });

    it("GetMinRange should return a number", () => {
        const rawSlots = ParseHtmlToSlots(new testManager().GetDataFrom(FileName.jiahau_2017_sept));
        const s = new SlotStore(rawSlots);
        expect(s.GetMinRange()).to.be.a("number");
    });

    it("GetMaxRange should return a number", () => {
        const rawSlots = ParseHtmlToSlots(new testManager().GetDataFrom(FileName.jiahau_2017_sept));
        const s = new SlotStore(rawSlots);
        expect(s.GetMaxRange()).to.be.a("number");
    });

});

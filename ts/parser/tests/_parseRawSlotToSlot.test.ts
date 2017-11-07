import {
    expect
} from "chai";
import {
    GetTestRawSlot1
} from "./../../tests/testDataGenerator";
import {
    ParseRawSlotToSlot
} from "./../parseRawSlotToSlot";

describe("parseRawSlotToSlot", () => {
    it("case 1", () => {
        expect(() => {
            ParseRawSlotToSlot(GetTestRawSlot1());
        }).to.not.throw();
    });

    it("logging results", () => {
        const result = ParseRawSlotToSlot(GetTestRawSlot1());
        //
        console.log(result);
    });

});

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

});

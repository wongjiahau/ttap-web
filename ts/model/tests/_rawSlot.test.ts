import { expect } from "chai";
import { CodeOf } from "../../tests/testData/heng_2017_sept";
import { RawSlot } from "../rawSlot";
import { GetTestRawSlot1 } from "./../../tests/testDataGenerator";

describe("RawSlot", () => {
    it("every RawSlot should have a unique Uid", () => {
        const rawSlot1 = new RawSlot();
        const rawSlot2 = new RawSlot();
        expect(rawSlot1.Uid).to.not.eq(rawSlot2.Uid);
    });
});

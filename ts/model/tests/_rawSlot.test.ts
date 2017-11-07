import {
    expect
} from "chai";
import {
    RawSlot
} from "../rawSlot";
import {
    GetTestRawSlot1
} from "./../../tests/testDataGenerator";

describe("RawSlot", () => {
    it("every RawSlot should have a unique hashId", () => {
        const rawSlots = GetTestRawSlot1();
        for (let i = 0; i < rawSlots.length; i++) {
            expect(rawSlots.filter((x) => x.HashId === rawSlots[i].HashId).length).to.eq(1);
        }
    });

    describe("RawSlot.GetOne()", () => {
        it("should return one RawSlot if the argument matches one of the RawSlots's HashId", () => {
            const rawSlots = GetTestRawSlot1();
            const result = RawSlot.GetOne(1);
            expect(result.HashId).to.eq(1);
        });

        it("should return null if the argument does not match any RawSlot's HashId", () => {
            const rawSlots = GetTestRawSlot1();
            const result = RawSlot.GetOne(9999);
            expect(result).to.eq(null);
        });
    });

    describe("RawSlot.GetBunch()", () => {

        it("should return a bunch of RawSlots based on the argument", () => {
            const input = [1, 2, 3, 4];
            const result = RawSlot.GetBunch(input);
            expect(result.length).to.eq(4);
        });

        it("should throw error if one of the input does not matches any RawSlot's HashId", () => {
            const input = [1, 2, 3, 9999];
            expect(() => {
                RawSlot.GetBunch(input);
            }).to.throw();
        });

    });

});

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

    describe("RawSlot.GetRelated()", () => {
        it("case 1", () => {
            // Note: 0 and 1 is the hash id for slot of Lecture-1 of Hubungan Etnik
            const rawSlots = GetTestRawSlot1();
            const result = RawSlot.GetRelated(0);
            expect(result).to.deep.eq([0, 1]);
        });
    });

    describe("RawSlot.Reset()", () => {
        it("should set allRawSlot to empty array", () => {
            GetTestRawSlot1();
            expect(RawSlot.allRawSlots).to.not.deep.eq([]);
            RawSlot.Reset();
            expect(RawSlot.allRawSlots).to.deep.eq([]);
        });

        it("should set hash to zero", () => {
            GetTestRawSlot1();
            expect(RawSlot.hash).to.not.eq(0);
            RawSlot.Reset();
            expect(RawSlot.hash).to.eq(0);
        });
    });

});

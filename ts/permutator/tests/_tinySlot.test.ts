import {
    expect
} from "chai";
import {
    isEqual
} from "lodash";
import {
    CreateSlotFromInterface,
    ISlot
} from "./../../model/slot";
import {
    GetTinySlotsOf
} from "./../../tests/testDataGenerator";
import {
    TinySlot
} from "./../tinySlot";

function GetTestSlot() {
    const result: ISlot = {
        Day: 1, // 1 means Monday
        Group: 2,
        HashId: 3,
        SlotNumber: 4,
        SubjectCode: 333,
        TimePeriod: 15, // 15 = 1111 in base 2
        Type: 1,
        Week: 15, // 15 = 1111 in base 2

    };
    return CreateSlotFromInterface(result);
}
describe("tinySlot", () => {
    describe("constructor", () => {
        it("should set SlotNumber", () => {
            const result = new TinySlot(GetTestSlot());
            expect(result.SlotNumber).to.eq(4);

        });

        it("should set HashIds", () => {
            const result = new TinySlot(GetTestSlot());
            expect(isEqual(result.HashIds, [3])).to.eq(true);
        });

        it("should set PartitionKey", () => {
            const result = new TinySlot(GetTestSlot());
            expect(result.PartitionKey).to.eq(3331);
        });

        it("should set State 1", () => {
            const result = new TinySlot(GetTestSlot());
            const expected = [
                15,
                0,
                0,
                0,
                0,
                0,
                0,
            ];
            expect(isEqual(result.State, expected)).to.eq(true);
        });

        it("should set State 2", () => {
            const result = GetTinySlotsOf("MPU32013");
            const expected = [
                0,
                parseInt("111111", 2),
                parseInt("111111", 2),
                0,
                0,
                0,
                0
            ];
            expect(result[0].State).to.deep.eq(expected);
        });
    });

});

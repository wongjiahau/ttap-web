import { isEqual } from 'lodash';
import {
    expect
} from "chai";
import {
    CreateSlotFromInterface,
    ISlot
} from "./../../model/slot";
import {
    TinySlot
} from "./../tinySlot";

function GetTestSlot() {
    const result: ISlot = {
        Day: 0,
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

        it("should set State", () => {
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
    });

});

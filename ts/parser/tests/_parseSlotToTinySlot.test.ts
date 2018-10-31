import {
    expect
} from "chai";
const isEqual = require("lodash.isequal");
import {
    ParseSlotToTinySlot
} from "../parseSlotToTinySlot";
import {
    CreateSlotFromInterface,
    ISlot
} from "./../../model/slot";

describe("ParseSlotToTinySlot", () => {
    it("should join slots into same group if they have the same SlotNumber", () => {
        const slot1: ISlot = {
            Day: 0,
            Group: 1,
            Uid: 1,
            Week: 999,
            SlotNumber: 1,
            SubjectCode: 333,
            SubjectName: "xxx",
            TimePeriod: 15,
            Type: "L"
        };
        const slot2: ISlot = {
            Day: 0,
            Group: 1,
            Uid: 2,
            SlotNumber: 1,
            SubjectCode: 333,
            SubjectName: "xxx",
            Week: 999,
            TimePeriod: 15,
            Type: "L"
        };
        const input = [slot1, slot2];
        const result = ParseSlotToTinySlot(input);
        expect(result.length).to.eq(1);
    });

    it("should separate slots into different group if they have different SlotNumber", () => {
        const slot1: ISlot = {
            Day: 0,
            Group: 1,
            Uid: 1,
            SlotNumber: 1,
            SubjectCode: 333,
            TimePeriod: 15,
            Type: "L",
            SubjectName: "xxx",
            Week: 999,
        };
        const slot2: ISlot = {
            Day: 0,
            Group: 1,
            Uid: 2,
            SlotNumber: 2,
            SubjectCode: 333,
            TimePeriod: 15,
            Type: "L",
            SubjectName: "xxx",
            Week: 999,
        };
        const input = [slot1, slot2];
        const result = ParseSlotToTinySlot(input);
        expect(result.length).to.eq(2);
    });

    it("should collect Uid of slots from the same group", () => {
        const slot1: ISlot = {
            Day: 0, // Monday
            Group: 1,
            Uid: 1,
            SlotNumber: 1,
            SubjectCode: 333,
            TimePeriod: 15,
            Type: "L",
            SubjectName: "xxx",
            Week: 999,
        };
        const slot2: ISlot = {
            Day: 1, // Tuesday
            Group: 1,
            Uid: 2,
            SlotNumber: 1,
            SubjectCode: 333,
            TimePeriod: 15,
            Type: "L",
            SubjectName: "xxx",
            Week: 999,
        };
        const input = [slot1, slot2];
        const result = ParseSlotToTinySlot(input);
        expect(isEqual(result[0].SlotIds, [1, 2])).to.eq(true);
    });

    it("should join timeperiod into a state for slots from the same group", () => {
        const slot1: ISlot = {
            Day: 1, // Monday
            Group: 1,
            Uid: 1,
            SlotNumber: 1,
            SubjectCode: 333,
            TimePeriod: 15,
            Type: "L",
            SubjectName: "xxx",
            Week: 999,
        };
        const slot2: ISlot = {
            Day: 2, // Tuesday
            Group: 1,
            Uid: 2,
            SlotNumber: 1,
            SubjectCode: 333,
            TimePeriod: 15,
            Type: "L",
            SubjectName: "xxx",
            Week: 999,
        };
        const input = [slot1, slot2];
        const result = ParseSlotToTinySlot(input);
        const expectedState = [15, 15, 0, 0, 0, 0, 0];
        expect(isEqual(result[0].State, expectedState)).to.eq(true);
    });

});

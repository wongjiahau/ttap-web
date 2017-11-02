import {
    expect
} from "chai";
import {
    isEqual
} from "lodash";
import {
    Type
} from "../../att/type";
import {
    Partitionize
} from "../partitionize";
import {
    ISlot
} from "./../../model/slot";

describe("partitionize", () => {
    it("case 1", () => {
        const slot1: ISlot = {
            Group: 1,
            SubjectCode: 123,
            Type: Type.LECTURE,
        };
        const slot2: ISlot = {
            Group: 2,
            SubjectCode: 123,
            Type: Type.LECTURE,
        };
        const input = [slot1, slot2];
        const actual = Partitionize(input);
        const expected = [input.slice()];
        expect(actual.length).to.eq(expected.length);
        expect(isEqual(expected, actual)).to.eq(true);
    });

    it("case 2", () => {
        const slot1: ISlot = {
            Group: 1,
            SubjectCode: 123,
            Type: Type.LECTURE,
        };
        const slot2: ISlot = {
            Group: 1,
            SubjectCode: 123,
            Type: Type.TUTORIAL,
        };
        const input = [slot1, slot2];
        const actual = Partitionize(input);
        const expected = [
            [input[0]],
            [input[1]]
        ];
        expect(actual.length).to.eq(expected.length);
        expect(isEqual(expected, actual)).to.eq(true);
    });

    it("case 3", () => {
        const slot1: ISlot = {
            Group: 1,
            SubjectCode: 123,
            Type: Type.LECTURE,
        };
        const slot2: ISlot = {
            Group: 1,
            SubjectCode: 123,
            Type: Type.TUTORIAL,
        };
        const slot3: ISlot = {
            Group: 1,
            SubjectCode: 999,
            Type: Type.LECTURE,
        };
        const input = [slot1, slot2, slot3];
        const actual = Partitionize(input);
        const expected = [
            [input[0]],
            [input[1]],
            [input[2]]
        ];
        expect(actual.length).to.eq(expected.length);
        expect(isEqual(expected, actual)).to.eq(true);
    });

    it("case 4", () => {
        const slot1: ISlot = {
            Group: 1,
            SubjectCode: 123,
            Type: Type.LECTURE,
        };
        const slot2: ISlot = {
            Group: 1,
            SubjectCode: 123,
            Type: Type.TUTORIAL,
        };
        const slot3: ISlot = {
            Group: 1,
            SubjectCode: 999,
            Type: Type.TUTORIAL,
        };
        const slot4: ISlot = {
            Group: 2,
            SubjectCode: 999,
            Type: Type.TUTORIAL,
        };
        const input = [slot1, slot2, slot3, slot4];
        const actual = Partitionize(input);
        const expected = [
            [input[0]],
            [input[1]],
            [input[2], input[3]]
        ];
        expect(actual.length).to.eq(expected.length);
        expect(isEqual(expected, actual)).to.eq(true);
    });

    it("case 5", () => {
        const slot1: ISlot = {
            Group: 1,
            SubjectCode: 123,
            Type: Type.LECTURE,
        };
        const slot2: ISlot = {
            Group: 1,
            SubjectCode: 123,
            Type: Type.TUTORIAL,
        };
        const slot3: ISlot = {
            Group: 1,
            SubjectCode: 999,
            Type: Type.TUTORIAL,
        };
        const slot4: ISlot = {
            Group: 2,
            SubjectCode: 999,
            Type: Type.TUTORIAL,
        };
        const slot5: ISlot = {
            Group: 2,
            SubjectCode: 123,
            Type: Type.TUTORIAL,
        };
        const input = [slot1, slot2, slot3, slot4, slot5];
        const actual = Partitionize(input);
        const expected = [
            [input[0]],
            [input[1], input[4]],
            [input[2], input[3]]
        ];
        expect(actual.length).to.eq(expected.length);
        expect(isEqual(expected, actual)).to.eq(true);
    });

    it("case 6", () => {
        const slot1: ISlot = {
            Group: 1,
            SubjectCode: 123,
            Type: Type.LECTURE,
        };
        const slot2: ISlot = {
            Group: 2,
            SubjectCode: 123,
            Type: Type.LECTURE,
        };
        const slot3: ISlot = {
            Group: 3,
            SubjectCode: 123,
            Type: Type.LECTURE,
        };
        const slot4: ISlot = {
            Group: 1,
            SubjectCode: 123,
            Type: Type.LECTURE,
        };
        const slot5: ISlot = {
            Group: 2,
            SubjectCode: 123,
            Type: Type.LECTURE,
        };
        const slot6: ISlot = {
            Group: 3,
            SubjectCode: 123,
            Type: Type.LECTURE,
        };
        const input = [slot1, slot2, slot3, slot4, slot5, slot6];
        const actual = Partitionize(input);
        const expected = [
            [input[0], input[1], input[2]],
            [input[3], input[4], input[5]],
        ];
        expect(actual.length).to.eq(expected.length);
        expect(isEqual(expected, actual)).to.eq(true);
    });

});

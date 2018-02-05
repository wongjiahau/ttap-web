import {
    expect
} from "chai";
import { DecToBin } from "../../../util/decToBin";
import {
    GenerateTotalState,
    GetDefinitelyOccupiedState,
    GetDefinitelyUnoccupiedState,
    GetMaybeOccupiedState,
    StringifyTotalState
} from "../generateTotalState";
import {
    GetTestTimetables1
} from "./../../../tests/testDataGenerator";

describe("GenerateTotalState", () => {
    it("case 1", () => {
        const timetables = GetTestTimetables1();
        const totalStates = GenerateTotalState(timetables);
    });

    describe("GetDefinitelyOccupiedState()", () => {
        it("case 1", () => {
            const timetables = GetTestTimetables1();
            const definitelyOccupiedState = GetDefinitelyOccupiedState(timetables);
            let actual = "";
            definitelyOccupiedState.forEach((day) => {
                actual += (DecToBin(day, 32) + "\n").split("").reverse().join("");
            });
            // 1 means definitely occupied
            const expected = `
00000000000000000000000000000000
00111111000000001111110000000000
00000000000000000000000000000000
00000000111111111111000000000000
00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000`;
            expect(actual).to.eq(expected);
        });

    });

    describe("GetDefinitelyUnoccupiedState()", () => {
        it("case 1", () => {
            const timetables = GetTestTimetables1();
            const definitelyUnoccupiedState = GetDefinitelyUnoccupiedState(timetables);
            let actual = "";
            definitelyUnoccupiedState.forEach((day) => {
                actual += (DecToBin(day, 32) + "\n").split("").reverse().join("");
            });
            // 0 means definitely unoccupied
            const expected = `
00000011110000000011110000000000
00111111110011111111110000000000
00000011111111000011110000000000
00111111111111111111000000000000
00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000`;
            expect(actual).to.eq(expected);
        });

    });

    describe("GetMaybeOccupiedState()", () => {
        it("case 1", () => {
            const timetables = GetTestTimetables1();
            const definitelyUnoccupiedState = GetDefinitelyUnoccupiedState(timetables);
            const definitelyOccupiedState = GetDefinitelyOccupiedState(timetables);
            const maybeOccupiedState = GetMaybeOccupiedState(definitelyOccupiedState, definitelyUnoccupiedState);
            let actual = "";
            maybeOccupiedState.forEach((day) => {
                actual += (DecToBin(day, 32) + "\n").split("").reverse().join("");
            });
            // 1 means maybe occupied or unoccupied
            const expected = `
00000011110000000011110000000000
00000000110011110000000000000000
00000011111111000011110000000000
00111111000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000`;
            expect(actual).to.eq(expected);
        });
    });

    describe("StringifyTotalState", () => {
        it("case 1", () => {
            const timetables = GetTestTimetables1();
            const totalStates = GenerateTotalState(timetables);
            const result = StringifyTotalState(totalStates);
            const expected = `
------OOOO--------OOOO----
--******OO--OOOO******----
------OOOOOOOO----OOOO----
--OOOOOO************------
--------------------------
--------------------------
--------------------------`;
            expect(result).to.eq(expected);

        });

        it("case when some uidsOfClickedState is passed in", () => {
            const uidsOfClickedState = ["01", "11", "21", "31", "41", "51", "61"];
            const timetables = GetTestTimetables1();
            const totalStates = GenerateTotalState(timetables, uidsOfClickedState);
            const result = StringifyTotalState(totalStates);
            const expected = `
-X----OOOO--------OOOO----
-X******OO--OOOO******----
-X----OOOOOOOO----OOOO----
-XOOOOOO************------
-X------------------------
-X------------------------
-X------------------------`;
            expect(result).to.eq(expected);

        });

    });

});

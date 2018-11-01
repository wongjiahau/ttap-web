import {
    expect
} from "chai";
import { Time } from "../../../att/time";
import { TimePeriod } from "../../../att/timePeriod";
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
import { CompressState } from "../../timetable";
import { stat } from "fs";

describe("GenerateTotalState", () => {
    it("case 1", () => {
        const timetables = GetTestTimetables1();
        const totalStates = GenerateTotalState(timetables);
    });

    describe("GetDefinitelyOccupiedState()", () => {
        it("case 1", () => {
            const timetables = GetTestTimetables1();
            const definitelyOccupiedState = GetDefinitelyOccupiedState(timetables.map((x) => CompressState(x.State)));
            let actual = "";
            definitelyOccupiedState.forEach((day) => {
                actual += (DecToBin(day, TimePeriod.GetNumberOfHalfHours()) + "\n").split("").reverse().join("");
            });
            // 1 means definitely occupied
            const expected = `
00000000000000000000
11111100000000111111
00000000000000000000
00000011111111111100
00000000000000000000
00000000000000000000
00000000000000000000`;
            expect(actual).to.eq(expected);
        });

    });

    describe("GetDefinitelyUnoccupiedState()", () => {
        it("case 1", () => {
            const timetables = GetTestTimetables1();
            const definitelyUnoccupiedState = GetDefinitelyUnoccupiedState(timetables.map((x) => CompressState(x.State)));
            let actual = "";
            definitelyUnoccupiedState.forEach((day) => {
                actual += (DecToBin(day, TimePeriod.GetNumberOfHalfHours()) + "\n").split("").reverse().join("");
            });
            // 0 means definitely unoccupied
            const expected = `
00001111000000001111
11111111001111111111
00001111111100001111
11111111111111111100
00000000000000000000
00000000000000000000
00000000000000000000`;
            expect(actual).to.eq(expected);
        });

    });

    describe("GetMaybeOccupiedState()", () => {
        it("case 1", () => {
            const states = GetTestTimetables1().map((x) => CompressState(x.State));
            const definitelyUnoccupiedState = GetDefinitelyUnoccupiedState(states);
            const definitelyOccupiedState = GetDefinitelyOccupiedState(states);
            const maybeOccupiedState = GetMaybeOccupiedState(definitelyOccupiedState, definitelyUnoccupiedState);
            let actual = "";
            maybeOccupiedState.forEach((day) => {
                actual += (DecToBin(day, TimePeriod.GetNumberOfHalfHours()) + "\n").split("").reverse().join("");
            });
            // 1 means maybe occupied or unoccupied
            const expected = `
00001111000000001111
00000011001111000000
00001111111100001111
11111100000000000000
00000000000000000000
00000000000000000000
00000000000000000000`;
            expect(actual).to.eq(expected);
        });
    });

    describe("StringifyTotalState", () => {
        it("case 1", () => {
            const timetables = GetTestTimetables1();
            const totalStates = GenerateTotalState(timetables);
            const result = StringifyTotalState(totalStates);
            const expected = `
----OOOO--------OOOO
******OO--OOOO******
----OOOOOOOO----OOOO
OOOOOO************--
--------------------
--------------------
--------------------`;
            expect(result).to.eq(expected);

        });

        it("case when some uidsOfClickedState is passed in", () => {
            const uidsOfClickedState = ["01", "11", "21", "31", "41", "51", "61"];
            const timetables = GetTestTimetables1();
            const totalStates = GenerateTotalState(timetables, uidsOfClickedState);
            const result = StringifyTotalState(totalStates);
            const expected = `
-X--OOOO--------OOOO
*X****OO--OOOO******
-X--OOOOOOOO----OOOO
OXOOOO************--
-X------------------
-X------------------
-X------------------`;
            expect(result).to.eq(expected);

        });

    });

});

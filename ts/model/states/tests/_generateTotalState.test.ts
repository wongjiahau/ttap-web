import {
    expect
} from "chai";
import {
    DecToBin
} from "../../../helper";
import {
    GetDefinitelyOccupiedState, GetDefinitelyUnoccupiedState, GetMaybeOccupiedState
} from "../generateTotalState";
import {
    GetTestTimetables1
} from "./../../../tests/testDataGenerator";

describe("GenerateTotalState", () => {
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
11111100000000111111000000000000
00000000000000000000000000000000
00000011111111111100000000000000
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
00001111000000001111000000000000
11111111001111111111000000000000
00001111111100001111000000000000
11111111111111111100000000000000
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
00001111000000001111000000000000
00000011001111000000000000000000
00001111111100001111000000000000
11111100000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000
00000000000000000000000000000000`;
            expect(actual).to.eq(expected);
        });
    });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const timePeriod_1 = require("../../../att/timePeriod");
const testDataGenerator_1 = require("../../../tests/testDataGenerator");
const decToBin_1 = require("../../../util/decToBin");
const generateTotalMatrix_1 = require("../generateTotalMatrix");
describe("GenerateTotalMatrix", () => {
    it("case 1", () => {
        const timetables = testDataGenerator_1.GetTestTimetables1();
        const totalMatrixs = generateTotalMatrix_1.GenerateTotalMatrix(timetables);
    });
    describe("GetDefinitelyOccupiedMatrix()", () => {
        it("case 1", () => {
            const timetables = testDataGenerator_1.GetTestTimetables1();
            const definitelyOccupiedMatrix = generateTotalMatrix_1.GetDefinitelyOccupiedMatrix(timetables);
            let actual = "";
            definitelyOccupiedMatrix.forEach((day) => {
                actual += (decToBin_1.DecToBin(day, timePeriod_1.TimePeriod.GetNumberOfHalfHours()) + "\n").split("").reverse().join("");
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
            chai_1.expect(actual).to.eq(expected);
        });
    });
    describe("GetDefinitelyUnoccupiedMatrix()", () => {
        it("case 1", () => {
            const timetables = testDataGenerator_1.GetTestTimetables1();
            const definitelyUnoccupiedMatrix = generateTotalMatrix_1.GetDefinitelyUnoccupiedMatrix(timetables);
            let actual = "";
            definitelyUnoccupiedMatrix.forEach((day) => {
                actual += (decToBin_1.DecToBin(day, timePeriod_1.TimePeriod.GetNumberOfHalfHours()) + "\n").split("").reverse().join("");
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
            chai_1.expect(actual).to.eq(expected);
        });
    });
    describe("GetMaybeOccupiedMatrix()", () => {
        it("case 1", () => {
            const timetables = testDataGenerator_1.GetTestTimetables1();
            const definitelyUnoccupiedMatrix = generateTotalMatrix_1.GetDefinitelyUnoccupiedMatrix(timetables);
            const definitelyOccupiedMatrix = generateTotalMatrix_1.GetDefinitelyOccupiedMatrix(timetables);
            const maybeOccupiedMatrix = generateTotalMatrix_1.GetMaybeOccupiedMatrix(definitelyOccupiedMatrix, definitelyUnoccupiedMatrix);
            let actual = "";
            maybeOccupiedMatrix.forEach((day) => {
                actual += (decToBin_1.DecToBin(day, timePeriod_1.TimePeriod.GetNumberOfHalfHours()) + "\n").split("").reverse().join("");
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
            chai_1.expect(actual).to.eq(expected);
        });
    });
    describe("StringifyTotalMatrix", () => {
        it("case 1", () => {
            const timetables = testDataGenerator_1.GetTestTimetables1();
            const totalMatrixs = generateTotalMatrix_1.GenerateTotalMatrix(timetables);
            const result = generateTotalMatrix_1.StringifyTotalMatrix(totalMatrixs);
            const expected = `
----OOOO--------OOOO
******OO--OOOO******
----OOOOOOOO----OOOO
OOOOOO************--
--------------------
--------------------
--------------------`;
            chai_1.expect(result).to.eq(expected);
        });
        it("case when some uidsOfClickedMatrix is passed in", () => {
            const uidsOfClickedMatrix = ["01", "11", "21", "31", "41", "51", "61"];
            const timetables = testDataGenerator_1.GetTestTimetables1();
            const totalMatrixs = generateTotalMatrix_1.GenerateTotalMatrix(timetables, uidsOfClickedMatrix);
            const result = generateTotalMatrix_1.StringifyTotalMatrix(totalMatrixs);
            const expected = `
-X--OOOO--------OOOO
*X****OO--OOOO******
-X--OOOOOOOO----OOOO
OXOOOO************--
-X------------------
-X------------------
-X------------------`;
            chai_1.expect(result).to.eq(expected);
        });
    });
});
//# sourceMappingURL=_generateTotalMatrix.test.js.map
import { expect } from "chai";
import { Time } from "../../../att/time";
import { TimePeriod } from "../../../att/timePeriod";
import { GetTestTimetables1 } from "../../../tests/testDataGenerator";
import { DecToBin } from "../../../util/decToBin";
import {
  GenerateTotalMatrix,
  GetDefinitelyOccupiedMatrix,
  GetDefinitelyUnoccupiedMatrix,
  GetMaybeOccupiedMatrix,
  StringifyTotalMatrix,
} from "../generateTotalMatrix";

describe("GenerateTotalMatrix", () => {
  it("case 1", () => {
    const timetables = GetTestTimetables1();
    const totalMatrixs = GenerateTotalMatrix(timetables);
  });

  describe("GetDefinitelyOccupiedMatrix()", () => {
    it("case 1", () => {
      const timetables = GetTestTimetables1();
      const definitelyOccupiedMatrix = GetDefinitelyOccupiedMatrix(timetables);
      let actual = "";
      definitelyOccupiedMatrix.forEach((day) => {
        actual += (DecToBin(day, TimePeriod.GetNumberOfHalfHours()) + "\n")
          .split("")
          .reverse()
          .join("");
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

  describe("GetDefinitelyUnoccupiedMatrix()", () => {
    it("case 1", () => {
      const timetables = GetTestTimetables1();
      const definitelyUnoccupiedMatrix =
        GetDefinitelyUnoccupiedMatrix(timetables);
      let actual = "";
      definitelyUnoccupiedMatrix.forEach((day) => {
        actual += (DecToBin(day, TimePeriod.GetNumberOfHalfHours()) + "\n")
          .split("")
          .reverse()
          .join("");
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

  describe("GetMaybeOccupiedMatrix()", () => {
    it("case 1", () => {
      const timetables = GetTestTimetables1();
      const definitelyUnoccupiedMatrix =
        GetDefinitelyUnoccupiedMatrix(timetables);
      const definitelyOccupiedMatrix = GetDefinitelyOccupiedMatrix(timetables);
      const maybeOccupiedMatrix = GetMaybeOccupiedMatrix(
        definitelyOccupiedMatrix,
        definitelyUnoccupiedMatrix
      );
      let actual = "";
      maybeOccupiedMatrix.forEach((day) => {
        actual += (DecToBin(day, TimePeriod.GetNumberOfHalfHours()) + "\n")
          .split("")
          .reverse()
          .join("");
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

  describe("StringifyTotalMatrix", () => {
    it("case 1", () => {
      const timetables = GetTestTimetables1();
      const totalMatrixs = GenerateTotalMatrix(timetables);
      const result = StringifyTotalMatrix(totalMatrixs);
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

    it("case when some uidsOfClickedMatrix is passed in", () => {
      const uidsOfClickedMatrix = ["01", "11", "21", "31", "41", "51", "61"];
      const timetables = GetTestTimetables1();
      const totalMatrixs = GenerateTotalMatrix(timetables, uidsOfClickedMatrix);
      const result = StringifyTotalMatrix(totalMatrixs);
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

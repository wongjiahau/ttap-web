import { expect } from "chai";
import { GetTestTimetables1, GetTinySlotsOf } from "./testDataGenerator";

describe("testDataGenerator", () => {
    describe("GetTestTimetables1 ", () => {
        it("should return 29 timetables", () => {
            const timetables = GetTestTimetables1();
            expect(timetables).to.have.lengthOf(29);
        });
    });

    describe("Name of the group", () => {
        it("case 1", () => {
            const expected = [
                [0, 1032192, 0, 4032, 0, 0, 0],
                [0, 48, 0, 0, 0, 0, 0],
                [0, 192, 0, 0, 0, 0, 0],
                [0, 0, 48, 0, 0, 0, 0],
                [0, 0, 0, 3, 0, 0, 0],
                [0, 0, 0, 12, 0, 0, 0],
                [0, 0, 0, 48, 0, 0, 0]
            ];
            const input1 = GetTinySlotsOf("UEMX3653"); // WWT
            expect(input1.map((x) => x.State)).to.deep.eq(expected);
        });
    });
});

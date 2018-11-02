import { expect } from "chai";
import { TimePeriod } from "../../../att/timePeriod";
import { Filter } from "../filter";
import { GetTestTimetables1 } from "./../../../tests/testDataGenerator";
import { MatrixKind, STCBox } from "./../stcBox";

const box1 = new STCBox(MatrixKind.MaybeOccupied, 0, parseInt("10000", 2), 0); // Monday 10.00 am to 10.30 am
const box2 = new STCBox(MatrixKind.MaybeOccupied, 2, parseInt("10000", 2), 0); // Wednesday 10.00 am to 10.30 am
const timetables = GetTestTimetables1();

describe("Filter()", () => {
    beforeEach(() => {
        TimePeriod.SetMinTo8am();
    });

    it("should throw error if box kind is not MaybeOccupied", () => {
        expect(() => {Filter(timetables, new STCBox(MatrixKind.DefinitelyUnoccupied, 0, 0, 0)); }).to.throw();
        expect(() => {Filter(timetables, new STCBox(MatrixKind.DefinitelyOccupied, 0, 0, 0)); }).to.throw();
        expect(() => {Filter(timetables, new STCBox(MatrixKind.Clicked, 0, 0, 0)); }).to.throw();
        expect(() => {Filter(timetables, new STCBox(MatrixKind.MaybeOccupied, 0, 0, 0)); }).to.not.throw();
    });

    it("should return a tuple : [filtrate, residue]", () => {
        const result = Filter(timetables, box1);
        expect(result.length).to.eq(2);
    });

    it("case 1", () => {
        const [filtrate, residue] = Filter(timetables, box1);
        expect(filtrate.length).to.eq(24);
        expect(residue.length).to.eq(5);
    });

    it("case 2", () => {
        const [filtrate1, residue1] = Filter(timetables, box1);
        const [filtrate2, residue2] = Filter(filtrate1, box2);
        expect(filtrate2.length).to.eq(16);
        expect(residue1.length + residue2.length).to.eq(13);
    });
});

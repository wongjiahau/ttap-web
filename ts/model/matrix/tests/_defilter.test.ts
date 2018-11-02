import {
    expect
} from "chai";
import { TimePeriod } from "../../../att/timePeriod";
import {
    Defilter
} from "../defilter";
import {
    Filter
} from "../filter";
import {
    GetTestTimetables1
} from "./../../../tests/testDataGenerator";
import {
    MatrixKind,
    STCBox
} from "./../stcBox";

const box1 = new STCBox(MatrixKind.MaybeOccupied, 0, parseInt("10000", 2), 0); // Monday 10.00 am to 10.30 am
const box2 = new STCBox(MatrixKind.Clicked,       0, parseInt("10000", 2), 0); // Monday 10.00 am to 10.30 am
const box3 = new STCBox(MatrixKind.MaybeOccupied, 2, parseInt("10000", 2), 0); // Wednesday 10.00 am to 10.30 am
const box4 = new STCBox(MatrixKind.Clicked,       2, parseInt("10000", 2), 0); // Wednesday 10.00 am to 10.30 am
const timetables = GetTestTimetables1();

describe("Defilter()", () => {
    beforeEach(() => {
        TimePeriod.SetMinTo8am();
    });

    it("should throw error if clickedTimeConstraint.length is not 7", () => {
        const clickedTimeConstraint = new Array < number > (8);
        expect(() => {
            Defilter(timetables, clickedTimeConstraint);
        }).to.throw();
    });

    it("should not throw error if clickedTimeConstraint.length is 7", () => {
        const clickedTimeConstraint = new Array(7).map((x) => 0);
        expect(() => {
            Defilter(timetables, clickedTimeConstraint);
        }).to.not.throw();
    });

    it("should return a tuple : [rescuedTimetables, unrescuedTimetables]", () => {
        const result = Defilter(timetables, new Array(7).map((x) => 0));
        expect(result.length).to.eq(2);
    });

    it("case 1", () => {
        const box = new STCBox(MatrixKind.MaybeOccupied, 0, parseInt("1000000", 2), 0); // Monday 10.00 am to 10.30 am
        const [filtrate, residue] = Filter(timetables, box);
        const clickedTimeConstraint = [0, 0, 0, 0, 0, 0, 0];
        expect(residue.length).to.eq(5);
        const [rescuedTimetables, unrescuedTimetables] = Defilter(residue, clickedTimeConstraint);
        expect(rescuedTimetables.length).to.eq(residue.length);
        expect(unrescuedTimetables.length).to.eq(0);
    });

    it("case 2", () => {
        const [filtrate1, residue1] = Filter(timetables, box1);
        const [filtrate2, residue2] = Filter(filtrate1, box3);
        const totalResidue = residue1.concat(residue2);
        expect(totalResidue.length).to.eq(13);
        const clickedTimeConstraint = [parseInt("1000000", 2), 0, 0, 0, 0, 0, 0];
        const [rescuedTimetables, unrescuedTimetables] = Defilter(totalResidue, clickedTimeConstraint);
        expect(rescuedTimetables.length).to.eq(8);
        expect(unrescuedTimetables.length).to.eq(5);
    });

});

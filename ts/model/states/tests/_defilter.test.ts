import {
    expect
} from "chai";
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
    StateKind,
    STCBox
} from "./../stcBox";

const state1 = new STCBox(StateKind.MaybeOccupied, 0, parseInt("1000000", 2), null); // Monday 10.00 am to 10.30 am
const state2 = new STCBox(StateKind.Clicked, 0, parseInt("1000000", 2), null); // Monday 10.00 am to 10.30 am
const state3 = new STCBox(StateKind.MaybeOccupied, 2, parseInt("1000000", 2), null); // Wednesday 10.00 am to 10.30 am
const state4 = new STCBox(StateKind.Clicked, 2, parseInt("1000000", 2), null); // Wednesday 10.00 am to 10.30 am
const timetables = GetTestTimetables1();

describe("Defilter()", () => {
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
        const state = new STCBox(StateKind.MaybeOccupied, 0, parseInt("1000000", 2), null); // Monday 10.00 am to 10.30 am
        const [filtrate, residue] = Filter(timetables, state);
        const clickedTimeConstraint = [0, 0, 0, 0, 0, 0, 0];
        expect(residue.length).to.eq(5);
        const [rescuedTimetables, unrescuedTimetables] = Defilter(residue, clickedTimeConstraint);
        expect(rescuedTimetables.length).to.eq(residue.length);
        expect(unrescuedTimetables.length).to.eq(0);
    });

    it("case 2", () => {
        const [filtrate1, residue1] = Filter(timetables, state1);
        const [filtrate2, residue2] = Filter(filtrate1, state3);
        const totalResidue = residue1.concat(residue2);
        expect(totalResidue.length).to.eq(13);
        const clickedTimeConstraint = [parseInt("1000000", 2), 0, 0, 0, 0, 0, 0];
        const [rescuedTimetables, unrescuedTimetables] = Defilter(totalResidue, clickedTimeConstraint);
        expect(rescuedTimetables.length).to.eq(8);
        expect(unrescuedTimetables.length).to.eq(5);
    });

});

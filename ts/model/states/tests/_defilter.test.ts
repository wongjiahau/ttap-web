import { expect } from "chai";
import { Defilter } from "../defilter";
import { Filter } from "../filter";
import { GetTestTimetables1 } from "./../../../tests/testDataGenerator";
import { State, StateKind } from "./../state";

const state1 = new State(StateKind.MaybeOccupied, 0, 16, null); // Monday 10.00 am to 10.30 am
const state2 = new State(StateKind.Clicked, 0, 16, null); // Monday 10.00 am to 10.30 am
const state3 = new State(StateKind.MaybeOccupied, 2, 16, null); // Wednesday 10.00 am to 10.30 am
const state4 = new State(StateKind.Clicked, 2, 16, null); // Wednesday 10.00 am to 10.30 am
const timetables = GetTestTimetables1();

describe("Defilter()", () => {
    it("should throw error if state kind is not Clicked", () => {
        expect(() => {Defilter(timetables, new State(StateKind.DefinitelyUnoccupied, null, null, null)); }).to.throw();
        expect(() => {Defilter(timetables, new State(StateKind.DefinitelyOccupied, null, null, null)); }).to.throw();
        expect(() => {Defilter(timetables, new State(StateKind.MaybeOccupied, null, null, null)); }).to.throw();
        expect(() => {Defilter(timetables, new State(StateKind.Clicked, null, null, null)); }).to.not.throw();
    });

    it("should return a tuple : [rescuedTimetables, unrescuedTimetables]", () => {
        const result = Defilter(timetables, state2);
        expect(result.length).to.eq(2);
    });

    it("case 1", () => {
        const [filtrate, residue] = Filter(timetables, state1);
        const [rescuedTimetables, unrescuedTimetables] = Defilter(residue, state2);
        expect(rescuedTimetables.length).to.eq(residue.length);
        expect(unrescuedTimetables.length).to.eq(0);
    });

    it("case 2", () => {
        const [filtrate1, residue1] = Filter(timetables, state1);
        const [filtrate2, residue2] = Filter(filtrate1, state3);
        const totalResidue = residue1.concat(residue2);
        expect(totalResidue.length).to.eq(13);
        const [rescuedTimetables, unrescuedTimetables] = Defilter(totalResidue, state2);
        expect(rescuedTimetables.length).to.eq(5);
        expect(unrescuedTimetables.length).to.eq(8);
    });

});

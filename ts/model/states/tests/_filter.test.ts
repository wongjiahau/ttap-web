import { expect } from "chai";
import { Filter } from "../filter";
import { GetTestTimetables1 } from "./../../../tests/testDataGenerator";
import { State, StateKind } from "./../state";

const state = new State(StateKind.MaybeOccupied, 0, 16, null);
const timetables = GetTestTimetables1();

describe("Filter()", () => {
    it("should throw error if state kind is not MaybeOccupied", () => {
        expect(() => {Filter(timetables, new State(StateKind.DefinitelyUnoccupied, null, null, null)); }).to.throw();
        expect(() => {Filter(timetables, new State(StateKind.DefinitelyOccupied, null, null, null)); }).to.throw();
        expect(() => {Filter(timetables, new State(StateKind.Clicked, null, null, null)); }).to.throw();
        expect(() => {Filter(timetables, new State(StateKind.MaybeOccupied, null, null, null)); }).to.not.throw();
    });

    
    it('case 1', () => {
        // TODO: Complete code here
        
    });
    

});

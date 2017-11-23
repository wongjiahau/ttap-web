import {expect} from "chai";
import { GetTestRawSlot1 } from "../../tests/testDataGenerator";
import { TimetableCreatorState, TimetableCreatorStateReducer } from "../reducers/timetableCreatorState";
import {NotifyDataLoaded} from "./../actions/notifyDataLoaded";

describe("notifyDataLoaded action", () => {
    it("'s name should be notify data loaded", () => {
        const action = new NotifyDataLoaded(null);
        expect(action.TypeName())
            .to
            .eq("notify data loaded");
    });

    it("should change IsDataLoaded to true", () => {
        const newState = TimetableCreatorStateReducer(new TimetableCreatorState(), new NotifyDataLoaded(GetTestRawSlot1()).Action());
        expect(newState.IsSlotLoaded)
            .to
            .eq(true);
    });

    it("should set Subject property of SubjectListState", () => {
        const newState = TimetableCreatorStateReducer(new TimetableCreatorState(), new NotifyDataLoaded(GetTestRawSlot1()).Action());
        expect(newState.SubjectListState.Subjects.length).to.eq(18);
    });
});

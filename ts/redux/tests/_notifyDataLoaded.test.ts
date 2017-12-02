import {
    expect
} from "chai";
import {
    GetTestRawSlot1
} from "../../tests/testDataGenerator";
import {
    IMasterState,
    MasterStateReducer,
    NewMasterState
} from "../reducers/masterState";
import {
    NotifyDataLoaded
} from "./../actions/notifyDataLoaded";

describe("notifyDataLoaded action", () => {
    it("'s name should be notify data loaded", () => {
        const action = new NotifyDataLoaded(null);
        expect(action.TypeName())
            .to
            .eq("notify data loaded");
    });

    it("should change IsDataLoaded to true", () => {
        const newState = MasterStateReducer(NewMasterState(),
            new NotifyDataLoaded(GetTestRawSlot1()).Action());
        expect(newState.TimetableCreatorState.IsSlotLoaded).to.eq(true);
    });

    it("should set Subject property of SubjectListState", () => {
        const newState = MasterStateReducer(NewMasterState(),
            new NotifyDataLoaded(GetTestRawSlot1()).Action());
        expect(newState.SubjectListState.Subjects.length).to.eq(18);
    });

    it("should set IsOpen of SubjectListView to true", () => {
        const newState = MasterStateReducer(NewMasterState(),
            new NotifyDataLoaded(GetTestRawSlot1()).Action());
        expect(newState.SubjectListState.IsOpen).to.eq(true);
    });

});

import {expect} from "chai";
import {isEqual} from "lodash";
import { GetTestSubjects1, IndexOf } from "../../tests/testDataGenerator";
import { ToggleSubjectSelection } from "../actions/toggleSubjectSelection";
import { UpdateSubjectListState } from "../actions/updateSubjectListState";
import {ReformTimetablesBasedOnSpecificSlot} from "./../actions/reformTimetablesBasedOnSpecificSlot";
import {ITimetableCreatorState, TimetableCreatorState, TimetableCreatorStateReducer} from "./../reducers/timetableCreatorState";

describe("ReformTimetablesBasedOnSpecificSlot action", () => {
    it("'s typename should be 'removing timetables that contain slot (15)' when passed in true", () => {
        const action = new ReformTimetablesBasedOnSpecificSlot(15, true);
        expect(action.TypeName()).to.eq("removing timetables that contain slot (15)");
    });

    it("'s typename should be 'adding back timetables that contain slot (15)' when passed in false", () => {
        const action = new ReformTimetablesBasedOnSpecificSlot(15, false);
        expect(action.TypeName()).to.eq("adding back timetables that contain slot (15)");
    });

    it("should set property of FiltrateTimetables and ResidueTimetables (1)", () => {
        // Given Ali selected subject HE
        // When Ali deselected a slot of HE with hashId of 0
        // Ali shall see that 1 timetables is removed and 2 timetables is left
        const initialState = new TimetableCreatorState(GetTestSubjects1());
        let newState = TimetableCreatorStateReducer(initialState, new UpdateSubjectListState(new ToggleSubjectSelection(IndexOf.HE)).Action());
        expect(newState.SubjectListState.TimetableListState.FiltrateTimetables).to.have.lengthOf(3);
        const hashIdOfFirstSlotOfHubunganEtnik = 0;
        newState = TimetableCreatorStateReducer(newState,
            new ReformTimetablesBasedOnSpecificSlot(hashIdOfFirstSlotOfHubunganEtnik, true).Action());
        expect(newState.SubjectListState.TimetableListState.FiltrateTimetables).to.have.lengthOf(2);
        expect(newState.SubjectListState.TimetableListState.ResidueTimetables).to.have.lengthOf(1);
    });

    it("should set property of FiltrateTimetables and ResidueTimetables (2)", () => {
        // Given Ali selected subject HE
        // When Ali deselected a slot of HE with hashId of 0
        // Ali shall see that 1 timetables is removed and 2 timetables is left
        // Then when Ali selected back the same slot
        // Ali shall see that there will have 3 timetables again
        const initialState = new TimetableCreatorState(GetTestSubjects1());
        let newState = TimetableCreatorStateReducer(initialState, new UpdateSubjectListState(new ToggleSubjectSelection(IndexOf.HE)).Action());
        expect(newState.SubjectListState.TimetableListState.FiltrateTimetables).to.have.lengthOf(3);
        const hashIdOfFirstSlotOfHubunganEtnik = 0;
        newState = TimetableCreatorStateReducer(newState,
            new ReformTimetablesBasedOnSpecificSlot(hashIdOfFirstSlotOfHubunganEtnik, true).Action());
        newState = TimetableCreatorStateReducer(newState,
            new ReformTimetablesBasedOnSpecificSlot(hashIdOfFirstSlotOfHubunganEtnik, false).Action());
        expect(newState.SubjectListState.TimetableListState.FiltrateTimetables).to.have.lengthOf(3);
        expect(newState.SubjectListState.TimetableListState.ResidueTimetables).to.have.lengthOf(0);
    });

    it("should set property of SlotStates(1)", () => {
        // Given Ali selected subject HE
        // When Ali deselected a slot of HE with hashId of 0
        // He shall see that the checkbox of slot is dechecked
        const initialState = new TimetableCreatorState(GetTestSubjects1());
        let newState = TimetableCreatorStateReducer(initialState, new UpdateSubjectListState(new ToggleSubjectSelection(IndexOf.HE)).Action());
        const hashIdOfFirstSlotOfHubunganEtnik = 0;
        newState = TimetableCreatorStateReducer(newState,
            new ReformTimetablesBasedOnSpecificSlot(hashIdOfFirstSlotOfHubunganEtnik, true).Action());
        expect(newState.SubjectListState.SlotStates[hashIdOfFirstSlotOfHubunganEtnik]).to.eq(false);
    });

    it("should set property of SlotStates(2)", () => {
        // Given Ali selected subject HE
        // When Ali deselected a slot of HE with hashId of 0
        // And then Ali selected back the same slot
        // He shall see that the checkbox of slot is checked
        const initialState = new TimetableCreatorState(GetTestSubjects1());
        let newState = TimetableCreatorStateReducer(initialState, new UpdateSubjectListState(new ToggleSubjectSelection(IndexOf.HE)).Action());
        const hashIdOfFirstSlotOfHubunganEtnik = 0;
        newState = TimetableCreatorStateReducer(newState,
            new ReformTimetablesBasedOnSpecificSlot(hashIdOfFirstSlotOfHubunganEtnik, true).Action());
        newState = TimetableCreatorStateReducer(newState,
            new ReformTimetablesBasedOnSpecificSlot(hashIdOfFirstSlotOfHubunganEtnik, false).Action());
        expect(newState.SubjectListState.SlotStates[hashIdOfFirstSlotOfHubunganEtnik]).to.eq(true);
    });

    it("should set property of SlotStates(3)", () => {
        // Given Ali selected subject HE
        // When Ali deselected a slot of HE with hashId of 0
        // He shall see that related slots is dechecked as well
        // For example, HE's lecture-1 has 2 slots,
        //      so deselecting one of them will result in both being deselected
        const initialState = new TimetableCreatorState(GetTestSubjects1());
        let newState = TimetableCreatorStateReducer(initialState, new UpdateSubjectListState(new ToggleSubjectSelection(IndexOf.HE)).Action());
        const hashIdOfFirstSlotOfHubunganEtnik = 0;
        newState = TimetableCreatorStateReducer(newState,
            new ReformTimetablesBasedOnSpecificSlot(hashIdOfFirstSlotOfHubunganEtnik, true).Action());
        // Note: slot 0 and slot 1 are both HE's Lecture-1
        expect(newState.SubjectListState.SlotStates[0]).to.eq(false);
        expect(newState.SubjectListState.SlotStates[1]).to.eq(false);
    });

    it("should set property of SlotStates(4)", () => {
        // Given Ali selected subject HE
        // When Ali deselected a slot of HE with hashId of 0
        // And when Ali selected back the same slot
        // He shall see that related slots that is deselected just now will be selected again
        const initialState = new TimetableCreatorState(GetTestSubjects1());
        let newState = TimetableCreatorStateReducer(initialState, new UpdateSubjectListState(new ToggleSubjectSelection(IndexOf.HE)).Action());
        const hashIdOfFirstSlotOfHubunganEtnik = 0;
        newState = TimetableCreatorStateReducer(newState,
            new ReformTimetablesBasedOnSpecificSlot(hashIdOfFirstSlotOfHubunganEtnik, true).Action());
        newState = TimetableCreatorStateReducer(newState,
            new ReformTimetablesBasedOnSpecificSlot(hashIdOfFirstSlotOfHubunganEtnik, false).Action());
        // Note: slot 0 and slot 1 are both HE's Lecture-1
        expect(newState.SubjectListState.SlotStates[0]).to.eq(true);
        expect(newState.SubjectListState.SlotStates[1]).to.eq(true);
    });

});

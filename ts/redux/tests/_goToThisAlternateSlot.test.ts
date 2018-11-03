import { expect } from "chai";
import { CreateSlotViewModel } from "../../model/slotViewModel";
import { GetMockInitialState } from "../../tests/testDataGenerator";
import { FindAlternativeSlotsOfCurrentSlots } from "../actions/findAlternativeSlotsOfCurrentSlots";
import { GoToNextTimetable } from "../actions/goToNextTimetable";
import { GoToPrevTimetable } from "../actions/goToPrevTimetable";
import { GoToRandomTimetable } from "../actions/goToRandomTimetable";
import { GoToThisAlternateSlot } from "../actions/goToThisAlternateSlot";
import { ShowAlternateSlot } from "../actions/showAlternateSlot";
import { MasterStateReducer } from "../reducers/masterState";
import { IndexOf } from "./../../tests/testData/heng_2017_apr";
import { ToggleSubjectSelection } from "./../actions/toggleSubjectSelection";

describe("showAlternateSlot action", () => {
    it("should set alternate slots based on clicked slot", () => {
        const initialState = GetMockInitialState("heng_2017_apr");
        const newState0 = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.ASSD));
        const newState1 = MasterStateReducer(newState0, new FindAlternativeSlotsOfCurrentSlots());
        const slotsToBeClicked = newState1.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) =>
                x.SubjectCode === "UEMX4313" &&
                x.Type === "T" &&
                x.Group[0] === "1"
            )[0]; // ASSD T1

        const newState2 = MasterStateReducer(newState1, new ShowAlternateSlot(slotsToBeClicked));
        expect(newState2.TimetableListState.CurrentIndex).to.eq(0);
        const newState3 = MasterStateReducer(newState2, new GoToThisAlternateSlot(newState2.TimetableListState.AlternativeSlots[0].Uid));
        expect(newState3.TimetableListState.CurrentIndex).to.eq(1);
        expect(newState3.TimetableListState.CurrentSubIndex).to.eq(0);
        expect(newState3.SnackbarState.IsOpen).to.eq(false);
        expect(newState3
                .TimetableListState
                .FiltrateTimetables[newState3.TimetableListState.CurrentIndex]
                    .ListOfSlotUids[0]).to.have.lengthOf(3);
    });

});

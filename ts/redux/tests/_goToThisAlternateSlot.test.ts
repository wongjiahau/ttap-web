import { expect } from "chai";
import { CreateSlotViewModel } from "../../model/slotViewModel";
import { GetMockInitialState } from "../../tests/testDataGenerator";
import { GoToNextTimetable } from "../actions/goToNextTimetable";
import { GoToPrevTimetable } from "../actions/goToPrevTimetable";
import { GoToRandomTimetable } from "../actions/goToRandomTimetable";
import { GoToThisAlternateSlot } from "../actions/goToThisAlternateSlot";
import { ShowAlternateSlot } from "../actions/showAlternateSlot";
import { MasterStateReducer } from "../reducers/masterState";
import { HENG_2017_APR, IndexOf } from "./../../tests/testData/heng_2017_apr";
import { ToggleSubjectSelection } from "./../actions/toggleSubjectSelection";

describe("showAlternateSlot action", () => {
    it("should set alternate slots based on clicked slot", () => {
        const initialState = GetMockInitialState("heng_2017_apr");
        const newState0 = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.ASSD));
        const slotsToBeClicked = HENG_2017_APR()
            .filter((x) =>
                x.SubjectCode === "UEMX4313" &&
                x.Type === "T" &&
                x.Group === "1"
            )[0]; // Fluid Mechanic I, Tutorial 3

        const newState1 = MasterStateReducer(newState0, new ShowAlternateSlot(CreateSlotViewModel(slotsToBeClicked)));
        const newState2 = MasterStateReducer(newState1, new GoToThisAlternateSlot(newState1.TimetableListState.AlternateSlots[0].Uid));
        expect(newState2.TimetableListState.CurrentIndex).to.eq(1);
        expect(newState2.SnackbarState.IsOpen).to.eq(false);
    });

});

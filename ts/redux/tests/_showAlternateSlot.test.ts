import { expect } from "chai";
import { CreateSlotViewModel } from "../../model/slotViewModel";
import { GetMockInitialState } from "../../tests/testDataGenerator";
import { GoToNextTimetable } from "../actions/goToNextTimetable";
import { GoToPrevTimetable } from "../actions/goToPrevTimetable";
import { GoToRandomTimetable } from "../actions/goToRandomTimetable";
import { ShowAlternateSlot } from "../actions/showAlternateSlot";
import { MasterStateReducer } from "../reducers/masterState";
import { HENG_2017_APR, IndexOf } from "./../../tests/testData/heng_2017_apr";
import { ToggleSubjectSelection } from "./../actions/toggleSubjectSelection";

describe("showAlternateSlot action", () => {
    it("should set alternate slots based on clicked slot", () => {
        const initialState = GetMockInitialState("heng_2017_apr");
        const newState0 = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.FM2));
        const newState1 = MasterStateReducer(newState0, new ToggleSubjectSelection(IndexOf.FM1));
        const newState2 = MasterStateReducer(newState1, new ToggleSubjectSelection(IndexOf.ASSD));
        const slotsToBeClicked = HENG_2017_APR()
            .filter((x) =>
                x.Type === "T" &&
                x.SubjectCode === "UEME2123" &&
                x.Group === "3"
            )[0]; // Fluid Mechanic I, Tutorial 3

        const newState3 = MasterStateReducer(newState2, new ShowAlternateSlot(CreateSlotViewModel(slotsToBeClicked)));
        expect(newState3.TimetableListState.AlternateSlots).to.have.lengthOf(6);
        expect(newState3.TimetableListState.AlternateSlots.map((x) => x.Group))
            .to.deep.eq([ "9/10", "11/12", "13/14", "15/16", "17/18", "19/20" ]);
            // "5/6" is not here, as it will clash with the current time table
            // so it should not be shown as alternate slots

        // Going to other timetabes will reset the alternate slots
        const newState4 = MasterStateReducer(newState3, new GoToNextTimetable());
        expect(newState4.TimetableListState.AlternateSlots).to.deep.eq([]);

        const newState5 = MasterStateReducer(newState3, new GoToPrevTimetable());
        expect(newState5.TimetableListState.AlternateSlots).to.deep.eq([]);

        const newState6 = MasterStateReducer(newState3, new GoToRandomTimetable());
        expect(newState6.TimetableListState.AlternateSlots).to.deep.eq([]);
    });

});

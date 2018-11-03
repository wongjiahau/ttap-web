import { expect } from "chai";
import { CreateSlotViewModel } from "../../model/slotViewModel";
import { GetMockInitialState } from "../../tests/testDataGenerator";
import { FilterTimetable } from "../actions/filterTimetable";
import { FindAlternativeSlotsOfCurrentSlots } from "../actions/findAlternativeSlotsOfCurrentSlots";
import { GoToNextTimetable } from "../actions/goToNextTimetable";
import { GoToPrevTimetable } from "../actions/goToPrevTimetable";
import { GoToRandomTimetable } from "../actions/goToRandomTimetable";
import { ShowAlternateSlot } from "../actions/showAlternateSlot";
import { MasterStateReducer } from "../reducers/masterState";
import { BoxKind, STCBox } from "./../../model/matrix/stcBox";
import { HENG_2017_APR, IndexOf } from "./../../tests/testData/heng_2017_apr";
import { ToggleSubjectSelection } from "./../actions/toggleSubjectSelection";

describe("showAlternateSlot action", () => {
    it("should set alternate slots based on clicked slot", () => {
        const initialState = GetMockInitialState("heng_2017_apr");
        const newState0 = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.FM2));
        const newState1 = MasterStateReducer(newState0, new ToggleSubjectSelection(IndexOf.FM1));
        let newState2 = MasterStateReducer(newState1, new ToggleSubjectSelection(IndexOf.ASSD));
        newState2 = MasterStateReducer(newState2, new FindAlternativeSlotsOfCurrentSlots());
        const slotsToBeClicked = newState2.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) =>
                x.Type === "T" &&
                x.SubjectCode === "UEME2123" &&
                x.Group[0] === "3"
            )[0]; // Fluid Mechanic I, Tutorial 3

        const newState3 = MasterStateReducer(newState2, new ShowAlternateSlot(slotsToBeClicked));
        if (!newState3.TimetableListState.ShowingAlternateSlotOf) {
            throw new Error();
        }
        expect(newState3.TimetableListState.ShowingAlternateSlotOf.Uid).to.deep.eq(slotsToBeClicked.Uid);
        expect(newState3.TimetableListState.AlternativeSlots).to.have.lengthOf(6);
        expect(newState3.TimetableListState.AlternativeSlots.map((x) => x.Group))
            .to.deep.eq(  [ // ["4"],
                            [ "9" ], // [ "10" ],
                            [ "11"], // [ "12" ],
                            [ "13"], // [ "14" ],
                            [ "15"], // [ "16" ],
                            [ "17"], // [ "18" ],
                            [ "19"], // [ "20" ] ]
                ]);
            // "5/6" is not here, as it will clash with the current time table
            // so it should not be shown as alternate slots

        expect(newState3.TimetableListState.AlternativeSlots.every((x) => x.IsAlternativeSlot));

        // snackbar should also be shown
        expect(newState3.SnackbarState.IsOpen).to.eq(true);

        // Going to other timetabes will reset the alternate slots
        const newState4 = MasterStateReducer(newState3, new GoToNextTimetable());
        expect(newState4.TimetableListState.AlternativeSlots).to.deep.eq([]);

        const newState5 = MasterStateReducer(newState3, new GoToPrevTimetable());
        expect(newState5.TimetableListState.AlternativeSlots).to.deep.eq([]);

        const newState6 = MasterStateReducer(newState3, new GoToRandomTimetable());
        expect(newState6.TimetableListState.AlternativeSlots).to.deep.eq([]);

        // Clicking again will hide the alternate slots
        const newState7 = MasterStateReducer(newState3, new ShowAlternateSlot(slotsToBeClicked));
        expect(newState7.TimetableListState.AlternativeSlots).to.have.lengthOf(0);

        // also hiding snackbar
        expect(newState7.SnackbarState.IsOpen).to.eq(false);

        // case 2
        const slotsToBeClicked2 = newState2.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) =>
                x.Type === "T" &&
                x.SubjectCode === "UEMX4313" &&
                x.Group[0] === "1"
            )[0]; // ASSD, Tutorial 1
        const newState8 = MasterStateReducer(newState3, new ShowAlternateSlot(slotsToBeClicked2));
        expect(newState8.TimetableListState.AlternativeSlots).to.have.lengthOf(1);

    });

    it("should not show alternate slots that is filtered out by set time constraint", () => {
        const initialState = GetMockInitialState("heng_2017_apr");
        const newState0 = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.ASSD));
        const greenBoxToBeClicked = new STCBox(BoxKind.MaybeOccupied, 1, parseInt("10000", 2), 4); // Tuesday 10.30am to 11.00am
        let newState1 = MasterStateReducer(newState0, new FilterTimetable(greenBoxToBeClicked));
        newState1 = MasterStateReducer(newState1, new FindAlternativeSlotsOfCurrentSlots());
        const slotsToBeClicked = newState1.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) =>
                x.SubjectCode === "UEMX4313" &&
                x.Type === "T" &&
                x.Group[0] === "1"
            )[0]; // ASSD I, Tutorial 1

        const newState2 = MasterStateReducer(newState1, new ShowAlternateSlot(slotsToBeClicked));
        expect(newState2.TimetableListState.AlternativeSlots).to.have.lengthOf(0);
    });

});

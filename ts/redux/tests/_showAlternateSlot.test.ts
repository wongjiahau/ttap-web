import { expect } from "chai";
import { CreateSlotViewModel } from "../../model/slotViewModel";
import { GetMockInitialState } from "../../tests/testDataGenerator";
import { FilterTimetable } from "../actions/filterTimetable";
import { FindAlternativeSlotsOfCurrentSlots } from "../actions/findAlternativeSlotsOfCurrentSlots";
import { GoToNextSubTimetable } from "../actions/goToNextSubTimetable";
import { GoToNextTimetable } from "../actions/goToNextTimetable";
import { GoToPreviousSubTimetable } from "../actions/goToPreviousSubTimetable";
import { GoToPrevTimetable } from "../actions/goToPrevTimetable";
import { GoToRandomTimetable } from "../actions/goToRandomTimetable";
import { ShowAlternateSlot } from "../actions/showAlternateSlot";
import { ToggleSetTimeConstraintView } from "../actions/toggleSetTimeConstraintView";
import { MasterStateReducer, MasterStateReducers } from "../reducers/masterState";
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

        const alternativeSlots3 = newState3.TimetableListState.ShowingAlternateSlotOf
            ? newState3.TimetableListState.ShowingAlternateSlotOf.AlternativeSlots
            : []
        expect(alternativeSlots3).to.have.lengthOf(13);
        expect(alternativeSlots3.map((x) => x.slot.Group))
            .to.deep.eq(  [ ["4"],
                            [ "9" ], [ "10" ],
                            [ "11"], [ "12" ],
                            [ "13"], [ "14" ],
                            [ "15"], [ "16" ],
                            [ "17"], [ "18" ],
                            [ "19"], [ "20" ] ]
                );
            // "5/6" is not here, as it will clash with the current time table
            // so it should not be shown as alternate slots

        // snackbar should also be shown
        expect(newState3.SnackbarState.IsOpen).to.eq(true);

        // Clicking again will hide the alternate slots
        const newState4 = MasterStateReducer(newState3, new ShowAlternateSlot(slotsToBeClicked));

        const alternativeSlots4 = newState4.TimetableListState.ShowingAlternateSlotOf
            ? newState4.TimetableListState.ShowingAlternateSlotOf.AlternativeSlots
            : []
        expect(alternativeSlots4).to.have.lengthOf(0);

        // also hiding snackbar
        expect(newState4.SnackbarState.IsOpen).to.eq(false);

        // case 2
        const slotsToBeClicked2 = newState2.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) =>
                x.Type === "T" &&
                x.SubjectCode === "UEMX4313" &&
                x.Group[0] === "1"
            )[0]; // ASSD, Tutorial 1
        const newState5 = MasterStateReducer(newState4, new ShowAlternateSlot(slotsToBeClicked2));

        const alternativeSlots5 = newState5.TimetableListState.ShowingAlternateSlotOf
            ? newState5.TimetableListState.ShowingAlternateSlotOf.AlternativeSlots
            : []
        expect(alternativeSlots5).to.have.lengthOf(2);

    });

    it("should not show alternate slots that is filtered out by set time constraint", () => {

        // Expect without applying set-time-constraint filter, there are three alternative slots for ASSD-T1
        const initialState = GetMockInitialState("heng_2017_apr");
        const state0 = MasterStateReducers(
            initialState,
            [
                new ToggleSubjectSelection(IndexOf.ASSD),
                new FindAlternativeSlotsOfCurrentSlots(),
            ]
        )

        const slotsToBeClicked1 = state0.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) =>
                x.SubjectCode === "UEMX4313" &&
                x.Type === "T" &&
                x.Group[0] === "1"
            )[0]; // ASSD I, Tutorial 1

        const state1 = MasterStateReducer(state0, new ShowAlternateSlot(slotsToBeClicked1));
        const alternativeSlots1 = state1.TimetableListState.ShowingAlternateSlotOf
            ? state1.TimetableListState.ShowingAlternateSlotOf.AlternativeSlots
            : []

        expect(alternativeSlots1).to.have.lengthOf(3)



        // Expect after apply set-time-constraint filter, there is only one alternative slot for ASSD-T1
        const greenBoxToBeClicked = new STCBox(BoxKind.MaybeOccupied, 1, parseInt("10000", 2), 4); // Tuesday 10.30am to 11.00am
        const state2 = MasterStateReducers(state0, [
            new FilterTimetable(greenBoxToBeClicked),
            new FindAlternativeSlotsOfCurrentSlots()
        ])

        const slotsToBeClicked2 = state2.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) =>
                x.SubjectCode === "UEMX4313" &&
                x.Type === "T" &&
                x.Group[0] === "1"
            )[0]; // ASSD I, Tutorial 1

        const newState2 = MasterStateReducer(state2, new ShowAlternateSlot(slotsToBeClicked2));

        const alternativeSlots2 = newState2.TimetableListState.ShowingAlternateSlotOf
            ? newState2.TimetableListState.ShowingAlternateSlotOf.AlternativeSlots
            : []
        expect(alternativeSlots2).to.have.lengthOf(1);


        // Expect the alternative slots is lesser after apply set-time-constraint filter
        expect(
            alternativeSlots1.length > 
            alternativeSlots2.length
        ).to.eq(true)
    });

    it([
        "when showing alternative slots, ShowingAlternateSlotOf should be set to null when:",
        "1. Navigating to other timetables",
        "2. Opening set time constraint view"
    ].join(""), () => {
        const initialState = GetMockInitialState("heng_2017_apr");
        const newState0 = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.FM1));
        const newState1 = MasterStateReducer(newState0, new FindAlternativeSlotsOfCurrentSlots());
        const slotsToBeClicked = newState1.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) =>
                x.Type === "T" &&
                x.SubjectCode === "UEME2123" &&
                x.Group[0] === "3"
            )[0]; // Fluid Mechanic I, Tutorial 3

        const newState2 = MasterStateReducer(newState1, new ShowAlternateSlot(slotsToBeClicked));
        expect(newState2.TimetableListState.ShowingAlternateSlotOf).to.not.eq(null)

        expect(MasterStateReducer(newState2, new GoToNextTimetable()).TimetableListState.ShowingAlternateSlotOf)
            .to.eq(null)

        expect(MasterStateReducer(newState2, new GoToPrevTimetable()).TimetableListState.ShowingAlternateSlotOf)
            .to.eq(null)

        expect(MasterStateReducer(newState2, new GoToRandomTimetable()).TimetableListState.ShowingAlternateSlotOf)
            .to.eq(null)

        expect(MasterStateReducer(newState2, new GoToNextSubTimetable()).TimetableListState.ShowingAlternateSlotOf)
            .to.eq(null)

        expect(MasterStateReducer(newState2, new GoToPreviousSubTimetable()).TimetableListState.ShowingAlternateSlotOf)
            .to.eq(null)

        expect(MasterStateReducer(newState2, new ToggleSetTimeConstraintView(true)).TimetableListState.ShowingAlternateSlotOf)
            .to.eq(null)
    })

    it("should not show the alternative slots of other slot if ShowingAlternateSlotOf is not null", () => {
        const initialState = GetMockInitialState("heng_2017_apr");
        const state1 = MasterStateReducers(initialState, [
            new ToggleSubjectSelection(IndexOf.FM1),
            new FindAlternativeSlotsOfCurrentSlots()
        ]);
        expect(state1.TimetableListState.ShowingAlternateSlotOf).to.eq(null)

        // Show the alternative slots of FM1-T3
        const slotsToBeClicked1 = state1.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) =>
                x.Type === "T" &&
                x.SubjectCode === "UEME2123" &&
                x.Group[0] === "3"
            )[0]; // Fluid Mechanic I, Tutorial 3
        
        const state2 = MasterStateReducer(state1, new ShowAlternateSlot(slotsToBeClicked1));
        expect(state2.TimetableListState.ShowingAlternateSlotOf).not.to.eq(null)

        // Show the alternative slots of FM1-P1
        const slotsToBeClicked2 = state2.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) =>
                x.Type === "P" &&
                x.SubjectCode === "UEME2123" &&
                x.Group[0] === "1"
            )[0]; // Fluid Mechanic I, Practical 1

        const state3 = MasterStateReducer(state2, new ShowAlternateSlot(slotsToBeClicked2));

        // Expect nothing changes, since FM1-T3 is still showing
        // This is to prevent the UI from crashing (related to React Archer)
        // Refer to https://github.com/wongjiahau/ttap-web/issues/193#issuecomment-763494226
        expect(state3).to.deep.eq(state2)
        
    })
});

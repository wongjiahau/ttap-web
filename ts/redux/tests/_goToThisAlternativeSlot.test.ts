import { expect } from "chai";
import { ISlotViewModel } from "../../model/slotViewModel";
import { IndexOf } from "../../tests/testData/heng_2017_apr";
import { GetMockInitialState } from "../../tests/testDataGenerator";
import { FindAlternativeSlotsOfCurrentSlots } from "../actions/findAlternativeSlotsOfCurrentSlots";
import { GoToThisAlternativeSlot } from "../actions/goToThisAlternativeSlot";
import { ShowAlternateSlot } from "../actions/showAlternateSlot";
import { ToggleSubjectSelection } from "../actions/toggleSubjectSelection";
import { MasterStateReducer } from "../reducers/masterState";

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
        const newState3 = MasterStateReducer(newState2, new GoToThisAlternativeSlot(newState2.TimetableListState.AlternativeSlots[0].Uid));
        expect(newState3.TimetableListState.CurrentIndex).to.eq(1);
        expect(newState3.TimetableListState.CurrentSubIndex).to.eq(0);
        expect(newState3.SnackbarState.IsOpen).to.eq(false);
        expect(newState3
                .TimetableListState
                .FiltrateTimetables[newState3.TimetableListState.CurrentIndex]
                    .ListOfSlotUids[0]).to.have.lengthOf(3);
    });

    it("case 2", () => {
        const initialState = GetMockInitialState("heng_2017_apr");
        const newState0 = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.FM1));
        const newState1 = MasterStateReducer(newState0, new ToggleSubjectSelection(IndexOf.FM2));
        const slotsToBeClicked = newState1.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) =>
                x.SubjectCode === "UEME2123" &&
                x.Type === "L" &&
                x.Group[0] === "1"
            ).filter((x) => x.Day === "Mon")[0]; // FM1 L1 of Monday
        const newState2 = MasterStateReducer(newState1, new FindAlternativeSlotsOfCurrentSlots());
        const newState3 = MasterStateReducer(newState2, new ShowAlternateSlot(slotsToBeClicked));

        const newState4 = MasterStateReducer(newState3, new GoToThisAlternativeSlot(
            newState3.TimetableListState.AlternativeSlots[0].Uid)
        );

        const currentSlots = newState4.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) => newState4.TimetableListState.FiltrateTimetables[
                newState4.TimetableListState.CurrentIndex].ListOfSlotUids[0]
                .indexOf(x.Uid) > -1);

        // Note: UEME2123 = Fluid Mechanics 1 ; UEME3112 = Fluid Mechanics 2
        expect(currentSlots.some((x) => x.SubjectCode === "UEME2123" && x.Type === "L" && x.Group[0] === "3")).to.eq(true);
        expect(currentSlots.some((x) => x.SubjectCode === "UEME2123" && x.Type === "T" && x.Group[0] === "3")).to.eq(true);
        expect(currentSlots.some((x) => x.SubjectCode === "UEME2123" && x.Type === "P" && x.Group[0] === "1")).to.eq(true);
        expect(currentSlots.some((x) => x.SubjectCode === "UEME3112" && x.Type === "L" && x.Group[0] === "1")).to.eq(true);
        expect(currentSlots.some((x) => x.SubjectCode === "UEME3112" && x.Type === "T" && x.Group[0] === "1")).to.eq(true);
        expect(currentSlots.some((x) => x.SubjectCode === "UEME3112" && x.Type === "P" && x.Group[0] === "5")).to.eq(true);
    });

});
